import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import { getRenderProfile } from "../utils/renderProfile";

const textureLoader = new THREE.TextureLoader();
const imageUrls = [
  "/images/react2.webp",
  "/images/typescript.webp",
  "/images/node2.webp",
  "/images/express.webp",
  "/images/mongo.webp",
  "/images/mysql.webp",
  "/images/javascript.webp",
  "/images/next2.webp",
];
const textures = imageUrls.map((url) => textureLoader.load(url));

const sphereScales = [0.7, 1, 0.8, 1, 1] as const;
const spheres = [...Array(30)].map(() => ({
  scale: sphereScales[Math.floor(Math.random() * sphereScales.length)] ?? 1,
  seed: Math.random(),
}));

type SphereProps = {
  scale: number;
  seed: number;
  index: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  materials: THREE.MeshPhysicalMaterial[];
  isActive: boolean;
  geometry: THREE.SphereGeometry;
  enableShadows: boolean;
  burstSignal: number;
};

function SphereGeo({
  scale,
  seed,
  index,
  r = THREE.MathUtils.randFloatSpread,
  materials,
  isActive,
  geometry,
  enableShadows,
  burstSignal,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);
  const impulse = useMemo(() => new THREE.Vector3(), []);
  const impulseScale = useMemo(() => new THREE.Vector3(), []);
  const basePosition = useMemo(
    () =>
      [
        r(15),
        r(7) + 1.5 + seed * 2,
        r(9) - 2,
      ] as [number, number, number],
    [r, seed]
  );
  const material = useMemo(
    () => materials[index % materials.length] ?? materials[0],
    [index, materials]
  );

  useEffect(() => {
    if (!api.current || burstSignal === 0) return;

    api.current.applyImpulse(
      {
        x: Math.sin(seed * 20) * 4,
        y: 3 + seed * 4,
        z: Math.cos(seed * 20) * 4,
      },
      true
    );
  }, [burstSignal, seed]);

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return;
    delta = Math.min(0.1, delta);
    impulse
      .copy(api.current.translation())
      .normalize()
      .multiply(
        impulseScale.set(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={basePosition}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow={enableShadows}
        receiveShadow={enableShadows}
        scale={scale}
        geometry={geometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

function TechStage({ enableShadows }: { enableShadows: boolean }) {
  return (
    <RigidBody type="fixed" colliders={false} position={[0, -5.2, -2]}>
      <CuboidCollider args={[8.5, 0.4, 4.2]} />
      <mesh receiveShadow={enableShadows} rotation={[-0.08, 0, 0]}>
        <boxGeometry args={[17, 0.8, 8.4]} />
        <meshStandardMaterial
          color="#05070d"
          metalness={0.25}
          roughness={0.82}
          emissive="#101827"
          emissiveIntensity={0.18}
        />
      </mesh>
    </RigidBody>
  );
}

function StarField() {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(180 * 3);
    for (let i = 0; i < values.length; i += 3) {
      values[i] = THREE.MathUtils.randFloatSpread(34);
      values[i + 1] = THREE.MathUtils.randFloatSpread(18);
      values[i + 2] = THREE.MathUtils.randFloatSpread(18) - 6;
    }
    return values;
  }, []);

  useFrame((_state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.025;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#7dd3fc" size={0.035} transparent opacity={0.42} />
    </points>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      target.set(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [burstSignal, setBurstSignal] = useState(0);
  const renderProfile = useMemo(() => getRenderProfile(), []);
  const sphereGeometry = useMemo(
    () =>
      new THREE.SphereGeometry(
        1,
        renderProfile.techStackSegments,
        renderProfile.techStackSegments
      ),
    [renderProfile.techStackSegments]
  );
  const visibleSpheres = useMemo(
    () => spheres.slice(0, renderProfile.techStackSphereCount),
    [renderProfile.techStackSphereCount]
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(Boolean(entry?.isIntersecting));
      },
      { rootMargin: "200px 0px", threshold: 0.05 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const triggerBurst = (event: KeyboardEvent) => {
      if (!isActive || event.repeat) return;
      setBurstSignal((value) => value + 1);
    };

    window.addEventListener("keydown", triggerBurst);
    return () => window.removeEventListener("keydown", triggerBurst);
  }, [isActive]);

  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, []);

  return (
    <div className="techstack" ref={sectionRef}>
      <div className="techstack-copy">
        <span>Interactive stack</span>
        <h2>Tech Stack</h2>
        <p>hint: press any key</p>
      </div>

      <Canvas
        shadows={renderProfile.enableShadows}
        dpr={renderProfile.techStackDpr}
        frameloop={isActive ? "always" : "demand"}
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 1.4, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <StarField />
        <ambientLight intensity={0.85} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow={renderProfile.enableShadows}
          shadow-mapSize={renderProfile.shadowMapSize}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <TechStage enableShadows={renderProfile.enableShadows} />
          <Pointer isActive={isActive} />
          {visibleSpheres.map((props, i) => (
            <SphereGeo
              key={i}
              {...props}
              index={i}
              materials={materials}
              isActive={isActive}
              geometry={sphereGeometry}
              enableShadows={renderProfile.enableShadows}
              burstSignal={burstSignal}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        {renderProfile.enableAmbientOcclusion && (
          <EffectComposer enableNormalPass={false}>
            <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
};

export default TechStack;

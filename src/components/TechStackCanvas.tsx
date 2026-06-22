import { useRef, useMemo, useState, useEffect, memo, useCallback } from "react";
import * as THREE from "three";
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
import type { RenderProfile } from "../utils/renderProfile";

type SphereConfig = {
  scale: number;
  seed: number;
};

type TechStackCanvasProps = {
  visibleSpheres: SphereConfig[];
  renderProfile: RenderProfile;
  isActive: boolean;
};

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

type SphereProps = SphereConfig & {
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
  geometry: THREE.SphereGeometry;
  enableShadows: boolean;
  burstSignal: number;
};

const SphereGeo = memo(function SphereGeo({
  scale,
  seed,
  material,
  isActive,
  geometry,
  enableShadows,
  burstSignal,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);
  const impulseVec = useRef(new THREE.Vector3());
  const impulseScaleVec = useRef(new THREE.Vector3());

  const basePosition = useMemo((): [number, number, number] => {
    const r = THREE.MathUtils.randFloatSpread;
    return [r(15), r(7) + 1.5 + seed * 2, r(9) - 2];
  }, [seed]);

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
    const clampedDelta = Math.min(0.1, delta);
    impulseVec.current
      .copy(api.current.translation())
      .normalize()
      .multiply(
        impulseScaleVec.current.set(
          -50 * clampedDelta * scale,
          -150 * clampedDelta * scale,
          -50 * clampedDelta * scale
        )
      );
    api.current.applyImpulse(impulseVec.current, true);
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
});

const TechStage = memo(function TechStage({ enableShadows }: { enableShadows: boolean }) {
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
});

const StarField = memo(function StarField() {
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
});

const Pointer = memo(function Pointer({ isActive }: { isActive: boolean }) {
  const ref = useRef<RapierRigidBody>(null);
  const targetVec = useRef(new THREE.Vector3());
  const currentVec = useRef(new THREE.Vector3());

  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) return;
    targetVec.current.set(
      (pointer.x * viewport.width) / 2,
      (pointer.y * viewport.height) / 2,
      0
    );
    currentVec.current.lerp(targetVec.current, 0.2);
    ref.current.setNextKinematicTranslation(currentVec.current);
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
});

function TechStackCanvas({ visibleSpheres, renderProfile, isActive }: TechStackCanvasProps) {
  const [burstSignal, setBurstSignal] = useState(0);
  const [textures, setTextures] = useState<THREE.Texture[] | null>(null);
  const [materials, setMaterials] = useState<THREE.MeshPhysicalMaterial[] | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    const loadedTextures: THREE.Texture[] = [];

    let loaded = 0;
    imageUrls.forEach((url) => {
      loader.load(url, (texture) => {
        loadedTextures.push(texture);
        loaded++;
        if (loaded === imageUrls.length) {
          setTextures(loadedTextures);
        }
      });
    });
  }, []);

  useEffect(() => {
    if (!textures) return;
    const mats = textures.map(
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
    setMaterials(mats);

    return () => {
      mats.forEach((mat) => mat.dispose());
    };
  }, [textures]);

  useEffect(() => {
    const triggerBurst = (event: KeyboardEvent) => {
      if (!isActive || event.repeat) return;
      setBurstSignal((value) => value + 1);
    };

    window.addEventListener("keydown", triggerBurst);
    return () => window.removeEventListener("keydown", triggerBurst);
  }, [isActive]);

  const sphereGeometry = useMemo(
    () =>
      new THREE.SphereGeometry(
        1,
        renderProfile.techStackSegments,
        renderProfile.techStackSegments
      ),
    [renderProfile.techStackSegments]
  );

  const handleCreated = useCallback((state: { gl: THREE.WebGLRenderer }) => {
    state.gl.toneMappingExposure = 1.5;
  }, []);

  if (!materials) {
    return null;
  }

  return (
    <Canvas
      shadows={renderProfile.enableShadows}
      dpr={renderProfile.techStackDpr}
      frameloop={isActive ? "always" : "demand"}
      gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
      camera={{ position: [0, 1.4, 20], fov: 32.5, near: 1, far: 100 }}
      onCreated={handleCreated}
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
        {visibleSpheres.map((props, i) => {
          const mat = materials[i % materials.length];
          if (!mat) return null;
          return (
            <SphereGeo
              key={i}
              {...props}
              material={mat}
              isActive={isActive}
              geometry={sphereGeometry}
              enableShadows={renderProfile.enableShadows}
              burstSignal={burstSignal}
            />
          );
        })}
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
  );
}

export default memo(TechStackCanvas);

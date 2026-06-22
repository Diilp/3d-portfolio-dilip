import { useEffect, useRef, useMemo, useCallback } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/loadingContext";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../utils/progress";
import { getRenderProfile } from "../../utils/renderProfile";

type ScreenLight = THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>;

const LOADING_TIMEOUT = 8000;
const INTRO_DELAY = 2500;
const ACTIVE_SECTIONS = [".landing-section", ".about-section", ".whatIDO"];

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();
  const renderProfile = useMemo(() => getRenderProfile(), []);

  const updateSceneVisibility = useCallback(() => {
    return ACTIVE_SECTIONS.some((selector) => {
      const element = document.querySelector(selector);
      if (!element) return false;
      const bounds = element.getBoundingClientRect();
      return bounds.bottom > -200 && bounds.top < window.innerHeight + 200;
    });
  }, []);

  useEffect(() => {
    const canvasElement = canvasDiv.current;
    if (!canvasElement) return;

    const rect = canvasElement.getBoundingClientRect();
    const container = { width: rect.width, height: rect.height };
    const aspect = container.width / container.height;
    const scene = sceneRef.current;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !renderProfile.isLowPower,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.width, container.height);
    renderer.setPixelRatio(renderProfile.maxDpr);
    renderer.shadowMap.enabled = renderProfile.enableShadows;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    canvasElement.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    let headBone: THREE.Object3D | null = null;
    let screenLight: ScreenLight | null = null;
    let mixer: THREE.AnimationMixer;
    let loadedCharacter: THREE.Object3D | null = null;

    const clock = new THREE.Clock();

    const light = setLighting(scene, renderProfile);
    const progress = setProgress((value) => setLoading(value));
    const { loadCharacter } = setCharacter(renderer, scene, camera, renderProfile);

    let progressResolved = false;
    const loadingFallback = window.setTimeout(() => {
      progressResolved = true;
      progress.clear();
    }, LOADING_TIMEOUT);

    loadCharacter().then((gltf) => {
      if (gltf) {
        const animations = setAnimations(gltf);
        if (hoverDivRef.current) {
          animations.hover(gltf, hoverDivRef.current);
        }
        mixer = animations.mixer;
        const character = gltf.scene;
        loadedCharacter = character;
        scene.add(character);
        headBone = character.getObjectByName("spine006") || null;
        const maybeScreenLight = character.getObjectByName("screenlight");
        screenLight =
          maybeScreenLight instanceof THREE.Mesh
            ? (maybeScreenLight as ScreenLight)
            : null;

        const startCharacterIntro = () => {
          setTimeout(() => {
            light.turnOnLights();
            animations.startIntro();
          }, INTRO_DELAY);
        };

        if (progressResolved) {
          startCharacterIntro();
        } else {
          progress.loaded().then(() => {
            window.clearTimeout(loadingFallback);
            progressResolved = true;
            startCharacterIntro();
          });
        }
      } else {
        window.clearTimeout(loadingFallback);
        progressResolved = true;
        progress.clear();
      }
    });

    let mouse = { x: 0, y: 0 };
    let interpolation = { x: 0.1, y: 0.2 };

    const onMouseMove = (event: MouseEvent) => {
      handleMouseMove(event, (x, y) => (mouse = { x, y }));
    };

    let touchDebounce: ReturnType<typeof setTimeout> | undefined;
    const onTouchStart = (event: TouchEvent) => {
      const element = event.target as HTMLElement;
      touchDebounce = setTimeout(() => {
        element?.addEventListener("touchmove", (e: TouchEvent) =>
          handleTouchMove(e, (x, y) => (mouse = { x, y }))
        );
      }, 200);
    };

    const onTouchEnd = () => {
      handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });
    };

    let animationFrameId = 0;
    let isPageVisible = !document.hidden;
    let isSceneVisible = updateSceneVisibility();

    const onResize = () => {
      if (loadedCharacter) {
        handleResize(renderer, camera, canvasDiv, loadedCharacter);
      }
      isSceneVisible = updateSceneVisibility();
    };

    const onVisibilityChange = () => {
      isPageVisible = !document.hidden;
    };

    const onScroll = () => {
      isSceneVisible = updateSceneVisibility();
    };

    document.addEventListener("mousemove", onMouseMove);
    const landingDiv = document.getElementById("landingDiv");
    if (landingDiv) {
      landingDiv.addEventListener("touchstart", onTouchStart);
      landingDiv.addEventListener("touchend", onTouchEnd);
    }
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isPageVisible || !isSceneVisible) {
        clock.getDelta();
        return;
      }

      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp
        );
        light.setPointLight(screenLight);
      }
      const delta = clock.getDelta();
      if (mixer) {
        mixer.update(delta);
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.clearTimeout(loadingFallback);
      clearTimeout(touchDebounce);
      cancelAnimationFrame(animationFrameId);
      scene.clear();
      renderer.dispose();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (canvasElement.contains(renderer.domElement)) {
        canvasElement.removeChild(renderer.domElement);
      }
      if (landingDiv) {
        landingDiv.removeEventListener("touchstart", onTouchStart);
        landingDiv.removeEventListener("touchend", onTouchEnd);
      }
    };
  }, [setLoading, renderProfile, updateSceneVisibility]);

  return (
    <div className="character-container" aria-hidden="true">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim"></div>
        <div className="character-hover" ref={hoverDivRef}></div>
      </div>
    </div>
  );
};

export default Scene;

import { useRef, useMemo, useState, useEffect, memo, lazy, Suspense } from "react";
import { getRenderProfile } from "../utils/renderProfile";

const TechStackCanvas = lazy(() => import("./TechStackCanvas"));

const sphereScales = [0.7, 1, 0.8, 1, 1] as const;

const sphereConfigs = Array.from({ length: 30 }, () => ({
  scale: sphereScales[Math.floor(Math.random() * sphereScales.length)] ?? 1,
  seed: Math.random(),
}));

const TechStack = memo(function TechStack() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const renderProfile = useMemo(() => getRenderProfile(), []);

  const visibleSpheres = useMemo(
    () => sphereConfigs.slice(0, renderProfile.techStackSphereCount),
    [renderProfile.techStackSphereCount]
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(Boolean(entry?.isIntersecting));
      },
      { rootMargin: "300px 0px", threshold: 0.05 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="techstack" ref={sectionRef}>
      <div className="techstack-copy">
        <span>Interactive stack</span>
        <h2>Tech Stack</h2>
        <p>hint: press any key</p>
      </div>
      {isActive && (
        <Suspense fallback={null}>
          <TechStackCanvas
            visibleSpheres={visibleSpheres}
            renderProfile={renderProfile}
            isActive={isActive}
          />
        </Suspense>
      )}
    </div>
  );
});

export default TechStack;

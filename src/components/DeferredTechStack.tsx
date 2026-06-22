import { lazy, Suspense, useEffect, useRef, useState, memo } from "react";

const TechStack = lazy(() => import("./TechStack"));

const DeferredTechStack = memo(function DeferredTechStack() {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "900px 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={sentinelRef}>
      {shouldLoad ? (
        <Suspense fallback={<div className="techstack" aria-hidden="true" />}>
          <TechStack />
        </Suspense>
      ) : (
        <div className="techstack" aria-hidden="true" />
      )}
    </div>
  );
});

export default DeferredTechStack;

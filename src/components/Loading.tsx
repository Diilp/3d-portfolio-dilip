import { useEffect, useState, memo, useCallback } from "react";
import { useLoading } from "../context/loadingContext";
import Marquee from "react-fast-marquee";
import "./styles/Loading.css";

const Loading = memo(function Loading({ percent }: { percent: number }) {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (percent >= 100 && !loaded) {
      const showWelcomeTimer = window.setTimeout(() => setLoaded(true), 600);
      return () => window.clearTimeout(showWelcomeTimer);
    }
  }, [percent, loaded]);

  useEffect(() => {
    if (!clicked) return;

    let cancelled = false;

    const timeoutId = window.setTimeout(() => {
      if (cancelled) return;
      import("./utils/initialFX")
        .then((module) => {
          if (!cancelled && module.initialFX) {
            module.initialFX();
          }
        })
        .catch((error) => {
          console.error("Initial animation failed:", error);
        });
      setIsLoading(false);
    }, 900);

    const fallbackId = window.setTimeout(() => {
      if (!cancelled) setIsLoading(false);
    }, 2500);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      window.clearTimeout(fallbackId);
    };
  }, [clicked, setIsLoading]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    target.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  const handleClick = useCallback(() => {
    if (!loaded || clicked) return;
    setClicked(true);
  }, [loaded, clicked]);

  return (
    <>
      <header className="loading-header">
        <a href="/" className="loader-title" data-cursor="disable">
          DKY
        </a>
        <div className={`loaderGame ${clicked ? "loader-out" : ""}`} aria-hidden="true">
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </header>
      <div className="loading-screen" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label="Loading portfolio">
        <div className="loading-marquee" aria-hidden="true">
          <Marquee>
            <span> Full Stack Developer</span> <span>Software Engineer</span>
            <span> Full Stack Developer</span> <span>Software Engineer</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked ? "loading-clicked" : ""}`}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded ? "loading-complete" : ""}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{Math.min(percent, 100)}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Loading;

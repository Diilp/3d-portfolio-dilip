import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/loadingContext";

import Marquee from "react-fast-marquee";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (percent >= 100 && !loaded) {
      const showWelcome = window.setTimeout(() => {
        setLoaded(true);
      }, 600);
      const revealSite = window.setTimeout(() => {
        setIsLoaded(true);
      }, 1600);

      return () => {
        window.clearTimeout(showWelcome);
        window.clearTimeout(revealSite);
      };
    }
  }, [percent, loaded]);

  useEffect(() => {
    if (!isLoaded) return;

    let timeoutId: number | undefined;
    let cancelled = false;

    setClicked(true);

    import("./utils/initialFX")
      .then((module) => {
        timeoutId = window.setTimeout(() => {
          if (cancelled) return;

          if (module.initialFX) {
            try {
              module.initialFX();
            } catch (error) {
              console.error("Initial page animation failed:", error);
            }
          }
          setIsLoading(false);
        }, 900);
      })
      .catch((error) => {
        console.error("Failed to load initial page animation:", error);
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    const fallbackId = window.setTimeout(() => {
      if (!cancelled) {
        setIsLoading(false);
      }
    }, 2500);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      window.clearTimeout(fallbackId);
    };
  }, [isLoaded, setIsLoading]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  function handleClick() {
    if (!loaded || clicked) return;
    setClicked(true);

    import("./utils/initialFX")
      .then((module) => {
        if (module.initialFX) {
          module.initialFX();
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load initial page animation:", error);
        setIsLoading(false);
      });
  }

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          DKY
        </a>
        <div className={`loaderGame ${clicked && "loader-out"}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen">
        <div className="loading-marquee">
          <Marquee>
            <span> Full Stack Developer</span> <span>Software Engineer</span>
            <span> Full Stack Developer</span> <span>Software Engineer</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={(e) => handleMouseMove(e)}
          onClick={handleClick}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded && "loading-complete"}`}>
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
};

export default Loading;

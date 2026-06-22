import { memo, useEffect, useState, type PropsWithChildren } from "react";
import About from "./About";
import Achievements from "./Achievements";
import Career from "./Career";
import CodeImpact from "./CodeImpact";
import Contact from "./Contact";
import Cursor from "./Cursor";
import DeferredTechStack from "./DeferredTechStack";
import Landing from "./Landing";
import Navbar from "./Navbar";
import Skills from "./Skills";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";

const DESKTOP_BREAKPOINT = 1024;

const MainContainer = memo(function MainContainer({ children }: PropsWithChildren) {
  const [isDesktopView, setIsDesktopView] = useState(() => window.innerWidth > DESKTOP_BREAKPOINT);

  useEffect(() => {
    let resizeTimer: number | undefined;

    const resizeHandler = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        setSplitText();
        setIsDesktopView(window.innerWidth > DESKTOP_BREAKPOINT);
      }, 150);
    };

    setSplitText();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>(".reveal-on-scroll");
    if (!revealItems.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <div className="reveal-on-scroll">
              <WhatIDo />
            </div>
            <div className="reveal-on-scroll">
              <Career />
            </div>
            <div className="reveal-on-scroll">
              <Work />
            </div>
            <div className="reveal-on-scroll">
              <Skills />
            </div>
            <div className="reveal-on-scroll">
              <Achievements />
            </div>
            <div className="reveal-on-scroll">
              <CodeImpact />
            </div>
            {isDesktopView && <DeferredTechStack />}
            <div className="reveal-on-scroll">
              <Contact />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
});

export default MainContainer;

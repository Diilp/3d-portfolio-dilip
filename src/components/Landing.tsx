import { memo, type PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = memo(function Landing({ children }: PropsWithChildren) {
  return (
    <section className="landing-section" id="landingDiv" aria-label="Hero section">
      <div className="landing-container">
        <div className="landing-intro">
          <h2>Hello! I&apos;m</h2>
          <h1>
            DILIP KUMAR
            <br />
            <span>YADAV</span>
          </h1>
        </div>
        <div className="landing-info">
          <h3>Full-Stack</h3>
          <h2 className="landing-info-h2">
            <div className="landing-h2-1">Angular</div>
            <div className="landing-h2-2">Cloud</div>
          </h2>
          <h2>
            <div className="landing-h2-info">Developer</div>
            <div className="landing-h2-info-1">AI Builder</div>
          </h2>
        </div>
      </div>
      {children}
    </section>
  );
});

export default Landing;

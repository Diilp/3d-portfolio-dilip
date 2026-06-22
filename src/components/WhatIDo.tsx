import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    const containers = [...containerRef.current];
    const clickHandlers = containers.map((container) =>
      container ? () => handleClick(container) : null
    );

    if (ScrollTrigger.isTouch) {
      containers.forEach((container, index) => {
        if (container) {
          container.classList.remove("what-noTouch");
          const handler = clickHandlers[index];
          if (handler) {
            container.addEventListener("click", handler);
          }
        }
      });
    }
    return () => {
      containers.forEach((container, index) => {
        if (container) {
          const handler = clickHandlers[index];
          if (handler) {
            container.removeEventListener("click", handler);
          }
        }
      });
    };
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>AI & AUTOMATION</h3>
              <h4>OCR, LLM APIs, and useful product intelligence</h4>
              <p>
                I build AI-assisted systems that read, analyze, and explain
                information, including OCR-driven food label analysis with Google
                Gemini API workflows.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Google Gemini API</div>
                <div className="what-tags">OCR integration</div>
                <div className="what-tags">FastAPI</div>
                <div className="what-tags">Python</div>
                <div className="what-tags">Health scoring</div>
                <div className="what-tags">Report APIs</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>BUILD & SCALE</h3>
              <h4>Responsive apps, APIs, databases, and deployment</h4>
              <p>
                I ship component-based Angular interfaces, Node.js REST APIs,
                MongoDB data models, authentication flows, and AWS deployments
                that are maintainable from the first release.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Angular</div>
                <div className="what-tags">TypeScript</div>
                <div className="what-tags">Node.js</div>
                <div className="what-tags">Python</div>
                <div className="what-tags">REST APIs</div>
                <div className="what-tags">MongoDB</div>
                <div className="what-tags">AWS EC2</div>
                <div className="what-tags">Elastic Beanstalk</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}

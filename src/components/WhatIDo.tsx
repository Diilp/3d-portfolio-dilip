import { useEffect, useRef, memo, useCallback } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/WhatIDo.css";

const serviceCategories = [
  {
    id: "ai-automation",
    title: "AI & AUTOMATION",
    subtitle: "OCR, LLM APIs, and useful product intelligence",
    description:
      "I build AI-assisted systems that read, analyze, and explain information, including OCR-driven food label analysis with Google Gemini API workflows.",
    tools: ["Google Gemini API", "OCR integration", "FastAPI", "Python", "Health scoring", "Report APIs"],
  },
  {
    id: "build-scale",
    title: "BUILD & SCALE",
    subtitle: "Responsive apps, APIs, databases, and deployment",
    description:
      "I ship component-based Angular interfaces, Node.js REST APIs, MongoDB data models, authentication flows, and AWS deployments that are maintainable from the first release.",
    tools: ["Angular", "TypeScript", "Node.js", "Python", "REST APIs", "MongoDB", "AWS EC2", "Elastic Beanstalk"],
  },
] as const;

const WhatIDo = memo(function WhatIDo() {
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setRef = useCallback((el: HTMLDivElement | null, index: number) => {
    containerRefs.current[index] = el;
  }, []);

  useEffect(() => {
    if (!ScrollTrigger.isTouch) return;

    const containers = [...containerRefs.current];

    const handleClick = (container: HTMLDivElement) => () => {
      container.classList.toggle("what-content-active");
      container.classList.remove("what-sibling");

      if (container.parentElement) {
        Array.from(container.parentElement.children).forEach((sibling) => {
          if (sibling !== container) {
            sibling.classList.remove("what-content-active");
            sibling.classList.toggle("what-sibling");
          }
        });
      }
    };

    const handlers = containers.map((container) =>
      container ? handleClick(container) : null
    );

    containers.forEach((container, index) => {
      if (container) {
        container.classList.remove("what-noTouch");
        const handler = handlers[index];
        if (handler) {
          container.addEventListener("click", handler);
        }
      }
    });

    return () => {
      containers.forEach((container, index) => {
        if (container) {
          const handler = handlers[index];
          if (handler) {
            container.removeEventListener("click", handler);
          }
        }
      });
    };
  }, []);

  return (
    <section className="whatIDO" aria-labelledby="whatido-title">
      <div className="what-box">
        <h2 className="title" id="whatido-title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2" aria-hidden="true">
            <svg width="100%" aria-hidden="true">
              <line x1="0" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
              <line x1="100%" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
            </svg>
          </div>
          {serviceCategories.map((category, index) => (
            <div
              key={category.id}
              className="what-content what-noTouch"
              ref={(el) => setRef(el, index)}
            >
              <div className="what-border1" aria-hidden="true">
                <svg height="100%" aria-hidden="true">
                  <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                  {index === 0 && (
                    <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                  )}
                </svg>
              </div>
              <div className="what-corner" aria-hidden="true"></div>
              <div className="what-content-in">
                <h3>{category.title}</h3>
                <h4>{category.subtitle}</h4>
                <p>{category.description}</p>
                <h5>Skillset & Tools</h5>
                <div className="what-content-flex">
                  {category.tools.map((tool) => (
                    <div className="what-tags" key={tool}>{tool}</div>
                  ))}
                </div>
                <div className="what-arrow" aria-hidden="true"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default WhatIDo;

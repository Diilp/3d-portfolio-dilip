import { useState, useCallback, memo } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import WorkImage from "./WorkImage";
import "./styles/Work.css";

const projects = [
  {
    title: "Smart Food Ingredient Analyzer",
    category: "AI-powered health analysis system",
    tools: "React, FastAPI, OCR, Google Gemini API, Python, report APIs",
    link: "/Dilip_Kumar_Yadav_Resume.pdf",
  },
  {
    title: "Online Quiz Platform",
    category: "Full-stack quiz and role management app",
    tools: "Node.js, MongoDB, JWT, JavaScript, REST APIs, role-based access",
    link: "/Dilip_Kumar_Yadav_Resume.pdf",
  },
  {
    title: "AWS Deployment Project",
    category: "Cloud hosting and deployment workflow",
    tools: "AWS EC2, Elastic Beanstalk, IAM, monitoring, scalable deployment",
    link: "/Dilip_Kumar_Yadav_Resume.pdf",
  },
  {
    title: "DSA Practice Portfolio",
    category: "Algorithmic problem solving",
    tools: "170+ LeetCode problems, arrays, trees, graphs, recursion, DP",
    link: "/Dilip_Kumar_Yadav_Resume.pdf",
  },
] as const;

const Work = memo(function Work() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  }, []);

  return (
    <section className="work-section" id="work" aria-labelledby="work-title">
      <div className="work-container section-container">
        <h2 id="work-title">
          Selected <span>Work</span>
        </h2>

        <div className="carousel-wrapper" role="region" aria-label="Projects carousel">
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
            type="button"
          >
            <MdArrowBack aria-hidden="true" />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
            type="button"
          >
            <MdArrowForward aria-hidden="true" />
          </button>

          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              role="list"
            >
              {projects.map((project, index) => (
                <article className="carousel-slide" key={project.title} role="listitem">
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">{project.category}</p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage
                        title={project.title}
                        category={project.category}
                        tools={project.tools}
                        index={index}
                        link={project.link}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="carousel-dots" role="tablist" aria-label="Project slides">
            {projects.map((project, index) => (
              <button
                key={project.title}
                className={`carousel-dot ${
                  index === currentIndex ? "carousel-dot-active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}: ${project.title}`}
                aria-selected={index === currentIndex}
                role="tab"
                data-cursor="disable"
                type="button"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default Work;

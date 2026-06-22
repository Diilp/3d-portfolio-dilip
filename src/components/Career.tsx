import { memo } from "react";
import "./styles/Career.css";

const experiences = [
  {
    role: "Angular Developer Intern",
    company: "Growthloop Technologies Pvt. Ltd. - Remote",
    year: "2026",
    description:
      "Developing scalable Angular and TypeScript interfaces, reusable UI components, frontend-backend API integrations, and responsive component-based application architecture.",
  },
  {
    role: "AWS Cloud Intern",
    company: "Vaidsys Technologies - Remote",
    year: "2025",
    description:
      "Worked with AWS EC2 and Elastic Beanstalk for cloud deployment and hosting while gaining hands-on experience with IAM, monitoring, scalability, and deployment workflows.",
  },
  {
    role: "Web Development Intern",
    company: "CodSoft - Remote",
    year: "2025",
    description:
      "Developed responsive web pages using HTML, CSS, and JavaScript, improving UI responsiveness and frontend interaction workflows.",
  },
  {
    role: "B.Tech CSE",
    company: "Maharishi Markandeshwar University",
    year: "2023+",
    description:
      "Computer Science Engineering undergraduate with 7.7 CGPA, focused on DSA, DBMS, operating systems, OOPs, full-stack development, and cloud-ready project delivery.",
  },
] as const;

const Career = memo(function Career() {
  return (
    <section className="career-section section-container" id="career" aria-labelledby="career-title">
      <div className="career-container">
        <h2 id="career-title">
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline" aria-hidden="true">
            <div className="career-dot"></div>
          </div>
          {experiences.map((exp) => (
            <article className="career-info-box" key={`${exp.role}-${exp.year}`}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{exp.role}</h4>
                  <h5>{exp.company}</h5>
                </div>
                <h3>{exp.year}</h3>
              </div>
              <p>{exp.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Career;

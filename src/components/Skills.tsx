import { memo, type CSSProperties } from "react";
import "./styles/ProfessionalSections.css";

const skillGroups = [
  {
    label: "Frontend",
    items: ["Angular", "TypeScript", "JavaScript", "HTML", "CSS", "Responsive UI"],
  },
  {
    label: "Backend",
    items: ["Node.js", "REST APIs", "FastAPI", "JWT Auth", "Python", "Java"],
  },
  {
    label: "Data & Cloud",
    items: ["MongoDB", "SQL", "AWS EC2", "Elastic Beanstalk", "Git", "GitHub"],
  },
  {
    label: "AI & Core CS",
    items: ["OCR", "Google Gemini API", "DSA", "DBMS", "OOPs", "Operating Systems"],
  },
] as const;

const orbitSkills = [
  { name: "Angular", domain: "Frontend", score: 82, size: "large", color: "#00e5ff", x: "50%", y: "35%", delay: "-2s" },
  { name: "Node.js", domain: "Backend", score: 76, size: "medium", color: "#5eead4", x: "68%", y: "51%", delay: "-7s" },
  { name: "MongoDB", domain: "Database", score: 72, size: "small", color: "#22c55e", x: "42%", y: "64%", delay: "-11s" },
  { name: "AWS", domain: "Cloud", score: 78, size: "medium", color: "#f59e0b", x: "28%", y: "57%", delay: "-4s" },
  { name: "Gemini API", domain: "AI", score: 74, size: "small", color: "#8b5cf6", x: "75%", y: "39%", delay: "-15s" },
  { name: "REST APIs", domain: "Backend", score: 80, size: "small", color: "#06b6d4", x: "59%", y: "58%", delay: "-18s" },
  { name: "DSA", domain: "Core CS", score: 84, size: "medium", color: "#ec4899", x: "82%", y: "57%", delay: "-9s" },
  { name: "Python", domain: "Programming", score: 70, size: "small", color: "#38bdf8", x: "32%", y: "73%", delay: "-13s" },
] as const;

type OrbitNodeStyle = CSSProperties & {
  "--x": string;
  "--y": string;
  "--delay": string;
  "--nodeColor": string;
};

const Skills = memo(function Skills() {
  return (
    <section className="pro-section section-container" id="skills" aria-labelledby="skills-title">
      <div className="section-kicker">Chapter 02 - Mastery</div>
      <div className="section-heading-row">
        <h2 id="skills-title">
          Technology <span>Orbit</span>
        </h2>
        <p>
          Hover any glowing sphere to inspect proficiency and domain expertise
          across Dilip&apos;s full-stack, cloud, AI, and core CS toolkit.
        </p>
      </div>
      <div className="orbit-panel">
        <div className="orbit-label">Technology Orbit - Interactive</div>
        <div className="orbit-stage" role="img" aria-label="Interactive technology orbit visualization">
          <div className="orbit-ring orbit-ring-one" aria-hidden="true" />
          <div className="orbit-ring orbit-ring-two" aria-hidden="true" />
          <div className="orbit-ring orbit-ring-three" aria-hidden="true" />
          <div className="orbit-axis" aria-hidden="true" />
          {orbitSkills.map((skill) => (
            <button
              className={`orbit-node orbit-node-${skill.size}`}
              style={{
                "--x": skill.x,
                "--y": skill.y,
                "--delay": skill.delay,
                "--nodeColor": skill.color,
              } as OrbitNodeStyle}
              key={skill.name}
              type="button"
              data-cursor="disable"
              aria-label={`${skill.name}: ${skill.score}% proficiency in ${skill.domain}`}
            >
              <span className="orbit-glow" aria-hidden="true" />
              <span className="orbit-score">{skill.score}</span>
              <span className="orbit-name">{skill.name}</span>
              <span className="orbit-domain">{skill.domain}</span>
            </button>
          ))}
          <div className="orbit-card">
            <span>Primary Stack</span>
            <strong>Angular + Node</strong>
            <p>Responsive UI, REST APIs, MongoDB, AWS deployment, and AI API integration.</p>
            <div>
              <b>82</b>
              <small>Proficiency</small>
            </div>
          </div>
        </div>
      </div>
      <div className="skills-grid" role="list">
        {skillGroups.map((group) => (
          <article className="skill-panel" key={group.label} role="listitem">
            <h3>{group.label}</h3>
            <div className="skill-tags">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
});

export default Skills;

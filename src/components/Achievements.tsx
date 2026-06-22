import { memo } from "react";
import "./styles/ProfessionalSections.css";

const metrics = [
  {
    value: "170+",
    label: "LeetCode Problems",
    detail: "Arrays, trees, graphs, recursion, and dynamic programming",
  },
  {
    value: "03",
    label: "Professional Internships",
    detail: "Angular development, AWS cloud, and web development",
  },
  {
    value: "03+",
    label: "Major Projects",
    detail: "AI analysis, quiz platform, and cloud deployment",
  },
  {
    value: "OCI",
    label: "AI Certified",
    detail: "Oracle Cloud Infrastructure AI Foundations Associate",
  },
] as const;

const credentials = [
  "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
  "ServiceNow Certification - In Progress",
] as const;

const Achievements = memo(function Achievements() {
  return (
    <section className="pro-section section-container" id="achievements" aria-labelledby="achievements-title">
      <div className="section-kicker">Proof of Work</div>
      <div className="section-heading-row">
        <h2 id="achievements-title">
          Achievements <span>& credentials</span>
        </h2>
        <p>
          Signals from consistent coding practice, project execution, cloud
          exposure, and AI certification.
        </p>
      </div>

      <div className="metric-grid" role="list">
        {metrics.map((metric) => (
          <article className="metric-card" key={metric.label} role="listitem">
            <strong>{metric.value}</strong>
            <h3>{metric.label}</h3>
            <p>{metric.detail}</p>
          </article>
        ))}
      </div>

      <div className="credential-panel">
        <h3>Certifications & Credentials</h3>
        <div className="credential-list">
          {credentials.map((credential) => (
            <span key={credential}>{credential}</span>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Achievements;

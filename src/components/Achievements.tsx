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
];

const Achievements = () => {
  return (
    <section className="pro-section section-container" id="achievements">
      <div className="section-kicker">Proof of Work</div>
      <div className="section-heading-row">
        <h2>
          Achievements <span>& credentials</span>
        </h2>
        <p>
          Signals from consistent coding practice, project execution, cloud
          exposure, and AI certification.
        </p>
      </div>

      <div className="metric-grid">
        {metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <strong>{metric.value}</strong>
            <h3>{metric.label}</h3>
            <p>{metric.detail}</p>
          </article>
        ))}
      </div>

      <div className="credential-panel">
        <h3>Certifications & Credentials</h3>
        <div className="credential-list">
          <span>Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate</span>
          <span>ServiceNow Certification - In Progress</span>
        </div>
      </div>
    </section>
  );
};

export default Achievements;

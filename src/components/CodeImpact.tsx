import "./styles/ProfessionalSections.css";

const activityCells = [
  1, 2, 3, 2, 4, 3, 1, 0, 3, 4, 2, 1, 3, 4, 2, 1, 0, 2, 3, 3, 4, 1, 3, 4,
  4, 2, 1, 3, 4, 2, 3, 1, 0, 3, 4, 4, 2, 1, 2, 3, 4, 3, 2, 1, 0, 3, 4, 2,
];

const languages = [
  ["TypeScript", "47%"],
  ["JavaScript", "24%"],
  ["Python", "15%"],
  ["Java", "9%"],
  ["SQL", "5%"],
];

const CodeImpact = () => {
  return (
    <section className="pro-section section-container" id="impact">
      <div className="section-kicker">Code & Impact</div>
      <div className="impact-layout">
        <article className="impact-panel impact-wide">
          <div className="impact-topline">
            <div>
              <h3>GitHub Activity</h3>
              <strong>2024 - 2026</strong>
            </div>
            <a href="https://github.com/" target="_blank" rel="noreferrer">
              View Profile
            </a>
          </div>
          <div className="activity-grid" aria-label="Coding activity heatmap">
            {activityCells.map((level, index) => (
              <span data-level={level} key={`${level}-${index}`} />
            ))}
          </div>
          <div className="language-bars">
            <h4>Language Breakdown</h4>
            {languages.map(([language, value]) => (
              <div className="language-row" key={language}>
                <span>{language}</span>
                <div>
                  <i style={{ width: value }} />
                </div>
                <b>{value}</b>
              </div>
            ))}
          </div>
        </article>

        <article className="impact-panel leetcode-panel">
          <h3>LeetCode</h3>
          <strong>170</strong>
          <p>Problems Solved</p>
          <div className="leetcode-breakdown">
            <span>Easy - 78</span>
            <span>Medium - 69</span>
            <span>Hard - 23</span>
          </div>
          <div className="leetcode-stats">
            <div>
              <small>Current Streak</small>
              <b>29 days</b>
            </div>
            <div>
              <small>Core Focus</small>
              <b>DSA</b>
            </div>
          </div>
          <a href="https://leetcode.com/" target="_blank" rel="noreferrer">
            View Full Profile
          </a>
        </article>
      </div>
    </section>
  );
};

export default CodeImpact;

import { memo } from "react";
import "./styles/ProfessionalSections.css";

const activityCells = [
  1, 2, 3, 2, 4, 3, 1, 0, 3, 4, 2, 1, 3, 4, 2, 1, 0, 2, 3, 3, 4, 1, 3, 4,
  4, 2, 1, 3, 4, 2, 3, 1, 0, 3, 4, 4, 2, 1, 2, 3, 4, 3, 2, 1, 0, 3, 4, 2,
] as const;

const languages = [
  { name: "TypeScript", percentage: "47%" },
  { name: "JavaScript", percentage: "24%" },
  { name: "Python", percentage: "15%" },
  { name: "Java", percentage: "9%" },
  { name: "SQL", percentage: "5%" },
] as const;

const leetcodeBreakdown = [
  { difficulty: "Easy", count: 78 },
  { difficulty: "Medium", count: 69 },
  { difficulty: "Hard", count: 23 },
] as const;

const CodeImpact = memo(function CodeImpact() {
  return (
    <section className="pro-section section-container" id="impact" aria-labelledby="impact-title">
      <div className="section-kicker">Code & Impact</div>
      <div className="impact-layout">
        <article className="impact-panel impact-wide">
          <div className="impact-topline">
            <div>
              <h3 id="impact-title">GitHub Activity</h3>
              <strong>2024 - 2026</strong>
            </div>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
          </div>
          <div className="activity-grid" role="img" aria-label="Coding activity heatmap showing contribution levels">
            {activityCells.map((level, index) => (
              <span data-level={level} key={`activity-${index}-${level}`} />
            ))}
          </div>
          <div className="language-bars">
            <h4>Language Breakdown</h4>
            {languages.map(({ name, percentage }) => (
              <div className="language-row" key={name}>
                <span>{name}</span>
                <div>
                  <i style={{ width: percentage }} />
                </div>
                <b>{percentage}</b>
              </div>
            ))}
          </div>
        </article>

        <article className="impact-panel leetcode-panel">
          <h3>LeetCode</h3>
          <strong>170</strong>
          <p>Problems Solved</p>
          <div className="leetcode-breakdown">
            {leetcodeBreakdown.map(({ difficulty, count }) => (
              <span key={difficulty}>{difficulty} - {count}</span>
            ))}
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
          <a href="https://leetcode.com/" target="_blank" rel="noopener noreferrer">
            View Full Profile
          </a>
        </article>
      </div>
    </section>
  );
});

export default CodeImpact;

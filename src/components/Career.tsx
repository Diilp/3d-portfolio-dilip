import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Angular Developer Intern</h4>
                <h5>Growthloop Technologies Pvt. Ltd. - Remote</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Developing scalable Angular and TypeScript interfaces, reusable UI
              components, frontend-backend API integrations, and responsive
              component-based application architecture.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AWS Cloud Intern</h4>
                <h5>Vaidsys Technologies - Remote</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Worked with AWS EC2 and Elastic Beanstalk for cloud deployment and
              hosting while gaining hands-on experience with IAM, monitoring,
              scalability, and deployment workflows.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Web Development Intern</h4>
                <h5>CodSoft - Remote</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Developed responsive web pages using HTML, CSS, and JavaScript,
              improving UI responsiveness and frontend interaction workflows.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech CSE</h4>
                <h5>Maharishi Markandeshwar University</h5>
              </div>
              <h3>2023+</h3>
            </div>
            <p>
              Computer Science Engineering undergraduate with 7.7 CGPA, focused
              on DSA, DBMS, operating systems, OOPs, full-stack development, and
              cloud-ready project delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;

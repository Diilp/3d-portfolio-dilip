import { memo } from "react";
import "./styles/About.css";

const About = memo(function About() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="about-me">
        <h3 className="title" id="about-title">About Me</h3>
        <p className="para">
          I am Dilip Kumar Yadav, a Computer Science undergraduate building
          full-stack products with Angular, Node.js, MongoDB, AWS, and AI APIs.
          I like turning practical problems into responsive interfaces, reliable
          REST APIs, cloud deployments, and useful AI-powered workflows.
        </p>
      </div>
    </section>
  );
});

export default About;

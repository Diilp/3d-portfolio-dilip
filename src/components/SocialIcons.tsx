import { memo } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { TbNotes } from "react-icons/tb";
import { SiLeetcode } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import HoverLinks from "./HoverLinks";
import "./styles/SocialIcons.css";

const SocialIcons = memo(function SocialIcons() {
  return (
    <div className="icons-section">
      <nav className="social-icons" data-cursor="icons" id="social" aria-label="Social media links">
        <span>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a
            href="https://leetcode.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LeetCode profile"
          >
            <SiLeetcode />
          </a>
        </span>
        <span>
          <a href="mailto:yadavdilipkumar533@gmail.com" aria-label="Send email">
            <MdEmail />
          </a>
        </span>
      </nav>
      <a
        className="resume-button"
        href="/Dilip_Kumar_Yadav_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download resume PDF"
      >
        <HoverLinks text="RESUME" />
        <span aria-hidden="true">
          <TbNotes />
        </span>
      </a>
    </div>
  );
});

export default SocialIcons;

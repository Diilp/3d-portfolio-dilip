import { useEffect, memo } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import HoverLinks from "./HoverLinks";
import { setSmoother, smoother } from "./utils/smoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const navLinks = [
  { href: "#about", label: "ABOUT" },
  { href: "#career", label: "EXPERIENCE" },
  { href: "#work", label: "WORK" },
  { href: "#skills", label: "SKILLS" },
  { href: "#achievements", label: "ACHIEVEMENTS" },
  { href: "#contact", label: "CONNECT" },
] as const;

const Navbar = memo(function Navbar() {
  useEffect(() => {
    const smootherInstance = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    setSmoother(smootherInstance);
    smoother.scrollTop(0);
    smoother.paused(true);

    const handleLinkClick = (e: MouseEvent) => {
      if (window.innerWidth <= 1024) return;

      const target = e.currentTarget as HTMLAnchorElement;
      const section = target.getAttribute("data-href");
      if (section) {
        e.preventDefault();
        smoother.scrollTo(section, true, "top top");
      }
    };

    const links = document.querySelectorAll<HTMLAnchorElement>(".header ul a");
    links.forEach((link) => {
      link.addEventListener("click", handleLinkClick);
    });

    const handleResize = () => ScrollSmoother.refresh(true);
    window.addEventListener("resize", handleResize);

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleLinkClick);
      });
      window.removeEventListener("resize", handleResize);
      smootherInstance.kill();
    };
  }, []);

  return (
    <>
      <header className="header" role="banner">
        <a href="/" className="navbar-title" data-cursor="disable" aria-label="Home - Dilip Kumar Yadav">
          <span className="navbar-mark" aria-hidden="true">DKY</span>
          <span className="navbar-name">
            <strong>Dilip Kumar Yadav</strong>
            <small>Full Stack Developer</small>
          </span>
        </a>
        <nav>
          <ul role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a data-href={link.href} href={link.href}>
                  <HoverLinks text={link.label} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="landing-circle1" aria-hidden="true"></div>
      <div className="landing-circle2" aria-hidden="true"></div>
      <div className="nav-fade" aria-hidden="true"></div>
    </>
  );
});

export default Navbar;

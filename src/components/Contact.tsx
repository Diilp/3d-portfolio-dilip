import { memo, useCallback, type FormEvent } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { MdMailOutline, MdPhone, MdSend } from "react-icons/md";
import { SiLeetcode } from "react-icons/si";
import "./styles/Contact.css";

const socialLinks = [
  { href: "https://github.com/", icon: FaGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/", icon: FaLinkedinIn, label: "LinkedIn" },
  { href: "https://leetcode.com/", icon: SiLeetcode, label: "LeetCode" },
] as const;

const Contact = memo(function Contact() {
  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const company = String(formData.get("company") || "");
    const message = String(formData.get("message") || "");
    const subject = encodeURIComponent(`Portfolio enquiry from ${name || "visitor"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nOrganization: ${company}\n\n${message}`
    );
    window.location.href = `mailto:yadavdilipkumar533@gmail.com?subject=${subject}&body=${body}`;
  }, []);

  return (
    <section className="contact-section section-container" id="contact" aria-labelledby="contact-title">
      <div className="contact-container">
        <div className="section-kicker">Final Transmission</div>
        <h3 id="contact-title">Let&apos;s Connect</h3>
        <div className="contact-flex">
          <aside className="contact-box contact-card" aria-label="Contact information">
            <span>Est. 2024 - Digital Workspace</span>
            <h2>
              Let&apos;s build something <span>exceptional.</span>
            </h2>
            <a href="tel:+918431056470" className="contact-line">
              <MdPhone aria-hidden="true" /> +91 84310 56470
            </a>
            <a
              href="mailto:yadavdilipkumar533@gmail.com"
              className="contact-line"
            >
              <MdMailOutline aria-hidden="true" /> yadavdilipkumar533@gmail.com
            </a>
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-line"
                aria-label={`Visit ${label} profile`}
              >
                <Icon aria-hidden="true" /> {label}
              </a>
            ))}
          </aside>

          <form className="contact-form" onSubmit={handleSubmit} aria-label="Contact form">
            <h4>Send a Direct Message</h4>
            <div className="form-grid">
              <label className="visually-hidden" htmlFor="contact-name">Your name</label>
              <input id="contact-name" name="name" placeholder="Your name" required autoComplete="name" />
              <label className="visually-hidden" htmlFor="contact-email">Email address</label>
              <input id="contact-email" name="email" type="email" placeholder="Email address" required autoComplete="email" />
            </div>
            <label className="visually-hidden" htmlFor="contact-company">Organization / company</label>
            <input id="contact-company" name="company" placeholder="Organization / company (optional)" autoComplete="organization" />
            <label className="visually-hidden" htmlFor="contact-message">Your message</label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Tell me about your project or opportunity..."
              rows={7}
              required
            />
            <button type="submit" data-cursor="disable">
              Send Message <MdSend aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
});

export default Contact;

import { FormEvent } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { MdMailOutline, MdPhone, MdSend } from "react-icons/md";
import { SiLeetcode } from "react-icons/si";
import "./styles/Contact.css";

const Contact = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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
  };

  return (
    <section className="contact-section section-container" id="contact">
      <div className="contact-container">
        <div className="section-kicker">Final Transmission</div>
        <h3>Let's Connect</h3>
        <div className="contact-flex">
          <aside className="contact-box contact-card">
            <span>Est. 2024 - Digital Workspace</span>
            <h2>
              Let's build something <span>exceptional.</span>
            </h2>
            <a href="tel:+918431056470" className="contact-line">
              <MdPhone /> +91 84310 56470
            </a>
            <a
              href="mailto:yadavdilipkumar533@gmail.com"
              className="contact-line"
            >
              <MdMailOutline /> yadavdilipkumar533@gmail.com
            </a>
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="contact-line">
              <FaGithub /> GitHub
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="contact-line">
              <FaLinkedinIn /> LinkedIn
            </a>
            <a href="https://leetcode.com/" target="_blank" rel="noreferrer" className="contact-line">
              <SiLeetcode /> LeetCode
            </a>
          </aside>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h4>Send a Direct Message</h4>
            <div className="form-grid">
              <input name="name" placeholder="Your name" required />
              <input name="email" type="email" placeholder="Email address" required />
            </div>
            <input name="company" placeholder="Organization / company (optional)" />
            <textarea
              name="message"
              placeholder="Tell me about your project or opportunity..."
              rows={7}
              required
            />
            <button type="submit" data-cursor="disable">
              Send Message <MdSend />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

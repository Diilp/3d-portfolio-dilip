import { memo } from "react";
import { MdArrowOutward } from "react-icons/md";

interface WorkImageProps {
  title: string;
  category: string;
  tools: string;
  index: number;
  link?: string;
}

const WorkImage = memo(function WorkImage({
  title,
  category,
  tools,
  index,
  link,
}: WorkImageProps) {
  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="disable"
        aria-label={`View ${title} project`}
      >
        {link && (
          <div className="work-link" aria-hidden="true">
            <MdArrowOutward />
          </div>
        )}
        <div className="project-visual">
          <div className="project-visual-grid" aria-hidden="true" />
          <div className="project-visual-orb project-visual-orb-one" aria-hidden="true" />
          <div className="project-visual-orb project-visual-orb-two" aria-hidden="true" />
          <span className="project-visual-index" aria-hidden="true">0{index + 1}</span>
          <div className="project-visual-content">
            <span>Dilip Kumar Yadav</span>
            <h5>{title}</h5>
            <p>{category}</p>
            <small>{tools}</small>
          </div>
        </div>
      </a>
    </div>
  );
});

export default WorkImage;

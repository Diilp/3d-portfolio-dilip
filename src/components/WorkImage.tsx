import { MdArrowOutward } from "react-icons/md";

interface Props {
  title: string;
  category: string;
  tools: string;
  index: number;
  link?: string;
}

const WorkImage = (props: Props) => {
  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link}
        target="_blank"
        rel="noreferrer"
        data-cursor={"disable"}
      >
        {props.link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        <div className="project-visual">
          <div className="project-visual-grid" />
          <div className="project-visual-orb project-visual-orb-one" />
          <div className="project-visual-orb project-visual-orb-two" />
          <span className="project-visual-index">0{props.index + 1}</span>
          <div className="project-visual-content">
            <span>Dilip Kumar Yadav</span>
            <h5>{props.title}</h5>
            <p>{props.category}</p>
            <small>{props.tools}</small>
          </div>
        </div>
      </a>
    </div>
  );
};

export default WorkImage;

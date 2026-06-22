import { memo } from "react";
import "./styles/style.css";

const HoverLinks = memo(function HoverLinks({
  text,
  cursor,
}: {
  text: string;
  cursor?: boolean;
}) {
  return (
    <div className="hover-link" data-cursor={!cursor ? "disable" : undefined}>
      <div className="hover-in" aria-hidden="true">
        {text} <div>{text}</div>
      </div>
    </div>
  );
});

export default HoverLinks;

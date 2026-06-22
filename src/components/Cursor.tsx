import { useEffect, useRef, memo } from "react";
import gsap from "gsap";
import "./styles/Cursor.css";

const Cursor = memo(function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let hover = false;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    const updateCursor = () => {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        gsap.set(cursor, { x: cursorPos.x, y: cursorPos.y });
      }
      animationFrameId = requestAnimationFrame(updateCursor);
    };

    document.addEventListener("mousemove", onMouseMove);
    animationFrameId = requestAnimationFrame(updateCursor);

    const cursorElements = document.querySelectorAll<HTMLElement>("[data-cursor]");

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const dataset = target.dataset["cursor"];

      if (dataset === "icons") {
        cursor.classList.add("cursor-icons");
        gsap.set(cursor, { x: rect.left, y: rect.top });
        cursor.style.setProperty("--cursorH", `${rect.height}px`);
        hover = true;
      }
      if (dataset === "disable") {
        cursor.classList.add("cursor-disable");
      }
    };

    const handleMouseOut = () => {
      cursor.classList.remove("cursor-disable", "cursor-icons");
      hover = false;
    };

    cursorElements.forEach((elem) => {
      elem.addEventListener("mouseover", handleMouseOver);
      elem.addEventListener("mouseout", handleMouseOut);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
      cursorElements.forEach((elem) => {
        elem.removeEventListener("mouseover", handleMouseOver);
        elem.removeEventListener("mouseout", handleMouseOut);
      });
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef} aria-hidden="true"></div>;
});

export default Cursor;

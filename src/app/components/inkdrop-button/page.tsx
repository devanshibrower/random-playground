"use client";
import { useEffect, useRef, useState } from "react";

export default function InkDropButton() {
  //function
  const [status, setStatus] = useState("idle");
  const buttonRef = useRef(null);
  const [clickPosition, setClickPosition] = useState({
    x: 0,
    y: 0,
  });

  //useeffect - for timers and side effects after state changes
  useEffect(() => {
    if (status === "filling") {
      const timer = setTimeout(() => {
        setStatus("filled");
      }, 1000);
      return () => clearTimeout(timer);
    } else if (status === "filled") {
      const timer = setTimeout(() => {
        setStatus("idle");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [status]);

  //click handler - where e exists
  const handleclick = (e) => {
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    console.log("clicked at: ", x, y);
    setClickPosition({ x, y });
    setStatus("filling");
  };

  return (
    <div
      className="flex items-center min-h-screen
        justify-center"
    >
      <button
        ref={buttonRef}
        onClick={handleclick}
        className="flex justify-center items-center
          bg-transparent rounded-full border border-zinc-300 dark:border-zinc-800
          w-24 h-10 text-sm font-medium text-zinc-900 dark:text-zinc-100
          cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900 relative
          overflow-hidden"
      >
        <span
          className={` absolute w-4 h-4 rounded-full
            bg-zinc-900 dark:bg-zinc-100 z-0 transition-transform
            duration-600 ease-in-out
            ${status === "filling" ? "scale-[15]" : "scale-0"}
            `}
          style={{
            left: clickPosition.x - 8,
            top: clickPosition.y - 8,
          }}
        ></span>

        <span className={`relative z-10 ${status !== "idle" ? "text-white dark:text-zinc-900" : ""}`}>
          {status === "idle" && "Click Me"}
          {(status === "filling" || status === "filled") &&
            "Clicked!"}
        </span>
      </button>
    </div>
  );
}

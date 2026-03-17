"use client";
import {
  AnimatePresence,
  easeInOut,
  motion,
} from "framer-motion";
import { useState, useEffect } from "react";

export const Checkmark = () => (
  <svg
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const ClipboardIcon = () => (
  <svg
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="9" y="2" width="6" height="4" rx="1" />
    <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2" />
  </svg>
);

export const buttonAnimation = {
  transition: {
    duration: 0.15,
    ease: easeInOut,
  },
  initial: { opacity: 0, filter: "blur(4px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  exit: {
    opacity: 0,
    filter: "blur(4px)",
    transition: {
      duration: 0.15,
      ease: easeInOut,
    },
  },
};

export default function IconButton() {
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (status === "copied") {
      const timeout = setTimeout(() => {
        setStatus("idle");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [status]);

  return (
    <div className="items-center min-h-screen justify-center flex">
      <button
        aria-label={status === "idle" ? "Copy" : "Copied"}
        title={status === "idle" ? "Copy" : "Copied"}
        disabled={status !== "idle"}
        onClick={() => setStatus("copied")}
        className=" 
            justify-center
            items-center
            flex
            border border-zinc-300 dark:border-zinc-800
            bg-transparent
           p-3
            rounded-xl
            text-sm font-medium text-zinc-900 dark:text-zinc-100
            hover:bg-zinc-100 dark:hover:bg-zinc-900
            disabled:pointer-events-none disabled:bg-zinc-100 dark:disabled:bg-zinc-900 disabled:opacity-80
            cursor-pointer
            active:scale-[0.95]
            "
      >
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.span key={"idle"} {...buttonAnimation}>
              <ClipboardIcon />
            </motion.span>
          )}
          {status === "copied" && (
            <motion.span
              key={"copied"}
              {...buttonAnimation}
            >
              <Checkmark />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}

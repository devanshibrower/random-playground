"use client";

import {
  AnimatePresence,
  easeOut,
  motion,
} from "framer-motion";
import { useEffect, useState } from "react";

export const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);
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
const buttonAnimation = {
  transition: {
    duration: 0.15,
    ease: easeOut,
  },
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.15,
      ease: easeOut,
    },
  },
};

export default function Button() {
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (status === "loading") {
      const timer = setTimeout(() => {
        setStatus("success");
      }, 1500);
      return () => clearTimeout(timer);
    }
    if (status === "success") {
      const timer = setTimeout(() => {
        setStatus("idle");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="justify-center flex items-center min-h-screen">
      <button
        disabled={status !== "idle"}
        onClick={() => setStatus("loading")}
        className=" 
            justify-center
            flex
            border border-zinc-300 dark:border-zinc-800
            bg-transparent
            w-36
            py-2
            gap-2
            rounded-xl
            text-sm font-medium text-zinc-900 dark:text-zinc-100
            hover:bg-zinc-100 dark:hover:bg-zinc-900
            disabled:pointer-events-none disabled:bg-zinc-100 dark:disabled:bg-zinc-900 disabled:opacity-80
            cursor-pointer
            active:scale-[0.97]
            transition-all duration-150 ease-out
            "
      >
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.span key={"idle"} {...buttonAnimation}>
              Submit
            </motion.span>
          )}
          {status === "loading" && (
            <motion.span
              key={"loading"}
              {...buttonAnimation}
              className="flex items-center gap-2"
            >
              <Spinner /> Submitting...
            </motion.span>
          )}
          {status === "success" && (
            <motion.span
              key={"success"}
              {...buttonAnimation}
              className="flex items-center gap-2"
            >
              <Checkmark /> Submitted!
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}

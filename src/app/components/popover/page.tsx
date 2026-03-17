"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function FeedbackPopover() {
  const [state, setState] = useState("idle");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (state === "loading") {
      const timer = setTimeout(() => {
        setState("submitted");
      }, 1500);
      return () => clearTimeout(timer);
    } else if (state === "submitted") {
      const timer = setTimeout(() => {
        setState("idle");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const buttonStyles =
    "relative flex h-10 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900";
  const actionButton =
    "relative flex h-10 w-24 bg-blue-600 cursor-pointer items-center justify-center overflow-hidden rounded-full text-sm font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-900";

  return (
    <div
      className="flex min-h-screen items-center
        justify-center"
    >
      <AnimatePresence>
        {state === "idle" && (
          <motion.button
            onClick={() => setState("expanded")}
            className={buttonStyles}
            layoutId="feedback"
          >
            Feedback
          </motion.button>
        )}
        {state !== "idle" && (
          <motion.div
            layoutId="feedback"
            className="flex w-120 flex-col items-end gap-3
              rounded-lg border border-zinc-300 dark:border-zinc-800
              bg-transparent p-3"
          >
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Your feedback..."
              className="w-full outline-none ring-0
                shadow-none border-none resize-none
                bg-transparent [&:focus]:outline-none
                [&:focus]:ring-0 [&:focus]:shadow-none"
              id="feedback-form"
            ></textarea>
            {state === "expanded" && (
              <button
                disabled={feedback === ""}
                onClick={() => {
                  if (feedback !== "") {
                    setState("loading");
                  }
                }}
                className={actionButton}
              >
                Submit
              </button>
            )}
            {state === "loading" && (
              <button
                disabled={feedback === ""}
                onClick={() => {
                  if (feedback !== "") {
                    setState("loading");
                  }
                }}
                className={actionButton}
              >
                Loading
              </button>
            )}
          </motion.div>
        )}
        {state === "loading" && (
          <button className={buttonStyles}>
            Loading...
          </button>
        )}
        {state === "submitted" && (
          <button className={buttonStyles}>
            Submitted
          </button>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ToggleWithMotion() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div
      className="flex h-screen items-center justify-center"
    >
      <motion.div
        role="switch"
        tabIndex={0}
        aria-checked={isOn}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOn(!isOn);
          }
        }}
        onClick={() => setIsOn(!isOn)}
        className={` w-12 h-7 rounded-full cursor-pointer
          p-0.5 transition-colors duration-200 ease-in-out
          flex items-center focus-visible:outline-2
          focus-visible:outline-offset-2
          focus-visible:outline-blue-500 ${
            isOn
              ? "bg-green-500 justify-end"
              : "bg-gray-500 justify-start"
          } `}
      >
        <motion.div
          layout
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 35,
          }}
          className="w-6 h-6 bg-white dark:bg-zinc-200 rounded-full"
        ></motion.div>
      </motion.div>
    </div>
  );
}

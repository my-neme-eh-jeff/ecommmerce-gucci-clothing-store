"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface BoxRevealProps {
  children: JSX.Element;
  width?: "fit-content" | "full";
  boxColor?: string;
  duration?: number;
  delay: number;
}

export const BoxReveal = ({
  children,
  width = "fit-content",
  boxColor,
  delay,
  duration,
}: BoxRevealProps) => {
  const mainControls = useAnimation();
  const slideControls = useAnimation();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      slideControls.start("visible");
      mainControls.start("visible");
    } else {
      slideControls.start("hidden");
      mainControls.start("hidden");
    }
  }, [isInView, mainControls, slideControls]);

  return (
    <div
      ref={ref}
      className={`relative ${width === "fit-content" ? "w-auto" : "w-full"} overflow-hidden`}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: duration ? duration : 0.5, delay: delay }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{
          duration: duration ? duration : 0.5,
          ease: "easeIn",
          delay: delay,
        }}
        className={`absolute bottom-1 left-0 right-0 top-1 z-20 bg-[#111236]`}
      />
    </div>
  );
};

export default BoxReveal;

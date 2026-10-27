"use client";
// Adapted from React Bits BlurText by David Haz.
// Source: e12c22192ac7b4b452c5e2feb9b586d74765d696, see THIRD-PARTY-NOTICES.md.
// Uses this project's existing Framer Motion runtime and a restrained, once-only word reveal.
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export function BlurText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.2 });
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <span ref={ref} className={"blur-text " + className}>
      <span className="sr-only">{text}</span>
      {words.map((word, index) => (
        <motion.span
          className="blur-word"
          aria-hidden="true"
          key={index}
          initial={reduce ? false : { filter: "blur(4px)", opacity: 0, y: 12 }}
          animate={
            reduce || visible
              ? { filter: "blur(0px)", opacity: 1, y: 0 }
              : undefined
          }
          transition={{
            duration: reduce ? 0 : 0.6,
            delay: reduce ? 0 : delay + index * 0.065,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
          {index < words.length - 1 ? "\u00a0" : ""}
        </motion.span>
      ))}
    </span>
  );
}

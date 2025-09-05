"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: React.ReactElement; // must be a single element
  delay?: number;
  y?: number;
  duration?: number;
};

export default function Reveal({
  children,
  delay = 0,
  y = 80,
  duration = 1.4,
}: RevealProps) {
  const el = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!el.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          ease: "power3.out",
          delay,
          scrollTrigger: {
            trigger: el.current,
            start: "top 85%",
            toggleActions: "restart none none reset",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, y, duration]);

  // ✅ clone element + safely cast ref
  return React.cloneElement(children, { ref: el } as any);
}

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const isDesktop = window.matchMedia("(pointer: fine)").matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!isDesktop || prefersReduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    let ringX = 0;
    let ringY = 0;

    const onMove = (e) => {
      gsap.set(dot, { x: e.clientX, y: e.clientY });
      ringX = e.clientX;
      ringY = e.clientY;
    };

    const ticker = gsap.ticker.add(() => {
      const currentX = gsap.getProperty(ring, "x") || 0;
      const currentY = gsap.getProperty(ring, "y") || 0;
      gsap.set(ring, {
        x: currentX + (ringX - currentX) * 0.18,
        y: currentY + (ringY - currentY) * 0.18,
      });
    });

    const growTargets = "a, button, [data-cursor-grow]";
    const onEnter = () => gsap.to(ring, { scale: 2.2, duration: 0.3, opacity: 0.5 });
    const onLeave = () => gsap.to(ring, { scale: 1, duration: 0.3, opacity: 1 });

    document.querySelectorAll(growTargets).forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      gsap.ticker.remove(ticker);
      document.querySelectorAll(growTargets).forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <div className="hidden lg:block">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-emerald-400 pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-emerald-500/50 pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}

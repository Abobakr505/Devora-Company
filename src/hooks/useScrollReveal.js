import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveals children of the ref container with a stagger as it enters the viewport.
 * Pass a selector for the items to animate (defaults to direct children with [data-reveal]).
 */
export function useScrollReveal(selector = "[data-reveal]", options = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const targets = el.querySelectorAll(selector);
    if (!targets.length) return;

    if (prefersReduced) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: options.y ?? 32 },
        {
          opacity: 1,
          y: 0,
          duration: options.duration ?? 0.9,
          ease: "power3.out",
          stagger: options.stagger ?? 0.1,
          scrollTrigger: {
            trigger: el,
            start: options.start ?? "top 78%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [selector, options.y, options.duration, options.stagger, options.start]);

  return containerRef;
}

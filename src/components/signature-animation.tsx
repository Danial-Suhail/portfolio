"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

export type SignatureAnimationProps = {
  /** Per-path draw duration (seconds), matches cursive-cool default ~0.35 */
  duration?: number;
  className?: string;
};

type PathSeg = {
  d: string;
  strokeWidth: string;
  transform?: string | null;
};

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function parseSignatureSvg(svgText: string): { viewBox: string; paths: PathSeg[] } {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, "image/svg+xml");
  const svgRoot = doc.documentElement;
  const viewBox = svgRoot.getAttribute("viewBox") ?? "0 0 100 100";
  const paths = Array.from(svgRoot.querySelectorAll("path")).map((p) => ({
    d: p.getAttribute("d") ?? "",
    strokeWidth: p.getAttribute("stroke-width") ?? "1",
    transform: p.getAttribute("transform"),
  }));
  return { viewBox, paths };
}

export function SignatureAnimation({
  duration = 0.35,
  className = "",
}: SignatureAnimationProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [parsed, setParsed] = useState<{ viewBox: string; paths: PathSeg[] } | null>(
    null
  );
  const [drawReady, setDrawReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/signature-danial.svg");
        const text = await res.text();
        if (cancelled) return;
        setParsed(parseSignatureSvg(text));
      } catch {
        if (!cancelled) setParsed(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useLayoutEffect(() => {
    if (!parsed?.paths.length || !svgRef.current) return;

    let cancelled = false;
    const paths = svgRef.current.querySelectorAll("path");
    if (reducedMotion) {
      paths.forEach((p) => {
        p.style.strokeDasharray = "none";
        p.style.strokeDashoffset = "0";
      });
      setDrawReady(true);
      return;
    }

    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      if (cancelled) return;
      paths.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      });
      raf2 = requestAnimationFrame(() => {
        if (!cancelled) setDrawReady(true);
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [parsed, reducedMotion]);

  if (!parsed?.paths.length) {
    return null;
  }

  return (
    <div className={`sig-container flex w-full items-center justify-center ${className}`}>
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={parsed.viewBox}
        className="sig-svg h-auto w-full text-pink-500"
        style={{ "--sig-dur": `${duration}s` } as React.CSSProperties}
        aria-hidden
      >
        {parsed.paths.map((path, index) => (
          <path
            key={index}
            d={path.d}
            strokeWidth={path.strokeWidth}
            transform={path.transform ?? undefined}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={
              drawReady
                ? "sig-path-draw sig-path-draw--active"
                : "sig-path-draw"
            }
            style={
              {
                "--sig-delay": `${index * duration * 0.04}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </svg>
    </div>
  );
}

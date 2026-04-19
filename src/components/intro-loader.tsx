"use client";

import { useEffect, useState } from "react";
import { SignatureAnimation } from "./signature-animation";

const SHOW_MS = 1500;
const FADE_MS = 600;

type Phase = "loading" | "exiting" | "gone";

export function IntroLoader() {
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    const t = window.setTimeout(() => setPhase("exiting"), SHOW_MS);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "exiting") return;
    const t = window.setTimeout(() => setPhase("gone"), FADE_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase === "gone") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  if (phase === "gone") {
    return null;
  }

  return (
    <div
      className={`intro-loader fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-background text-foreground transition-opacity ease-out ${
        phase === "exiting" ? "opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
      aria-hidden
    >
      <div className="intro-loader-content w-[55%] max-w-md md:w-[22%]">
        <SignatureAnimation duration={0.35} />
      </div>
    </div>
  );
}

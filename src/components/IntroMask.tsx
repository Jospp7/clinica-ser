import { useEffect, useRef, useState } from "react";

const HERO_IMG = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80";
const SESSION_KEY = "ser_intro_done";

interface Props { onComplete: () => void; }

const IntroMask = ({ onComplete }: Props) => {
  const [phase, setPhase] = useState<"enter" | "pause" | "expand" | "fadeout" | "done">("enter");
  const groupRef = useRef<SVGGElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onComplete();
      return;
    }
    const t1 = setTimeout(() => setPhase("pause"), 600);
    const t2 = setTimeout(() => setPhase("expand"), 1000);
    const t3 = setTimeout(() => setPhase("fadeout"), 1800);
    const t4 = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      onComplete();
    }, 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  let groupTransform = "scale(0.05)";
  let groupTransition = "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";

  if (phase === "pause") groupTransform = "scale(1)";
  else if (phase === "expand" || phase === "fadeout" || phase === "done") {
    groupTransform = "scale(12)";
    groupTransition = "transform 0.8s ease-in";
  }

  const [mounted, setMounted] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setMounted(true)); }, []);
  if (mounted && (phase === "enter")) groupTransform = "scale(1)";

  const isFading = phase === "fadeout" || phase === "done";

  return (
    <div aria-hidden="true" role="presentation" style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none" }}>
      <svg style={{ position: "absolute", width: 0, height: 0 }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="logo-mask" clipPathUnits="objectBoundingBox">
            <g ref={groupRef} style={{ transformOrigin: "50% 50%", transform: groupTransform, transition: groupTransition }}>
              <rect x="0" y="0" width="1" height="1" />
            </g>
          </clipPath>
        </defs>
      </svg>
      <div style={{ position: "absolute", inset: 0, zIndex: 1, overflow: "hidden" }}>
        <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <defs>
            <clipPath id="text-clip">
              <g style={{ transformOrigin: "960px 540px", transform: groupTransform, transition: groupTransition }}>
                <text x="960" y="580" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontSize="280" fontWeight="700">ser</text>
              </g>
            </clipPath>
          </defs>
          <image href={HERO_IMG} x="0" y="0" width="1920" height="1080" preserveAspectRatio="xMidYMid slice" clipPath="url(#text-clip)" style={{ transform: phase !== "enter" ? "scale(1.05)" : "scale(1)", transformOrigin: "center", transition: "transform 1.5s ease" }} />
        </svg>
      </div>
      <div ref={overlayRef} style={{ position: "absolute", inset: 0, zIndex: 2, backgroundColor: "#FFFFFF", opacity: isFading ? 0 : 1, transition: isFading ? "opacity 0.5s ease" : "none" }}>
        <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <defs>
            <mask id="inverse-mask">
              <rect x="0" y="0" width="1920" height="1080" fill="white" />
              <g style={{ transformOrigin: "960px 540px", transform: groupTransform, transition: groupTransition }}>
                <text x="960" y="580" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontSize="280" fontWeight="700" fill="black">ser</text>
              </g>
            </mask>
          </defs>
          <rect x="0" y="0" width="1920" height="1080" fill="white" mask="url(#inverse-mask)" />
        </svg>
      </div>
    </div>
  );
};

export default IntroMask;

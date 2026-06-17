"use client";
import React, { useEffect, useRef, useState, memo } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

type ImageConfig = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  depth: number;
  delay: number;
  rotate: number;
  width: string;
};

const DESKTOP_CONFIG: ImageConfig[] = [
  { bottom: "-30vh", left: "-8vw",  depth: 0.3,  delay: 0.2,  rotate: -12,  width: "clamp(550px, 60vw, 950px)" },
  { bottom: "0vh",   right: "-5vw", depth: 0.45, delay: 0.35, rotate: 12, width: "clamp(500px, 50vw, 900px)" },
];

const TABLET_CONFIG: ImageConfig[] = [
  { bottom: "-10vh", left: "-10vw",  depth: 0.3,  delay: 0.2,  rotate: 0,  width: "clamp(400px, 82vw, 580px)" },
  { top: "1vh",   right: "-25vw", depth: 0.45, delay: 0.35, rotate: 0, width: "clamp(360px, 82vw, 540px)" },
];

const MOBILE_CONFIG: ImageConfig[] = [
  { bottom: "-15vh",  left: "-40vw",  depth: 0.3,  delay: 0.2,  rotate: -12, width: "120vw" },
  { top: "-20vh",  right: "-30vw", depth: 0.45, delay: 0.35, rotate: 12, width: "90vw" },
];

const SPRING_CONFIG = { damping: 25, stiffness: 120 };

export interface ParallaxHeroImagesProps {
  images: string[];
  className?: string;
  imageClassName?: string;
}

type ScreenSize = "mobile" | "tablet" | "desktop";

export const ParallaxHeroImages = ({ images, className, imageClassName }: ParallaxHeroImagesProps) => {
  const [screenSize, setScreenSize] = useState<ScreenSize>("desktop");
  const hasAnimated = useRef(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, SPRING_CONFIG);
  const smoothY = useSpring(mouseY, SPRING_CONFIG);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      if (w < 768) setScreenSize("mobile");
      else if (w < 1024) setScreenSize("tablet");
      else setScreenSize("desktop");
    };
    check();
    hasAnimated.current = true;
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const config =
    screenSize === "mobile" ? MOBILE_CONFIG :
    screenSize === "tablet" ? TABLET_CONFIG :
    DESKTOP_CONFIG;

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {images.slice(0, config.length).map((src, i) => (
        <ParallaxImage
          key={i}
          src={src}
          config={config[i]}
          imageClassName={imageClassName}
          smoothX={smoothX}
          smoothY={smoothY}
          skipAnimation={hasAnimated.current}
        />
      ))}
    </div>
  );
};

const ParallaxImage = memo(function ParallaxImage({
  src, config, imageClassName, smoothX, smoothY, skipAnimation,
}: {
  src: string;
  config: ImageConfig;
  imageClassName?: string;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  skipAnimation?: boolean;
}) {
  const maxOffset = 40;
  const tx = useTransform(smoothX, [-1, 1], [-maxOffset * config.depth, maxOffset * config.depth]);
  const ty = useTransform(smoothY, [-1, 1], [-maxOffset * config.depth, maxOffset * config.depth]);

  return (
    <motion.div
      className="absolute"
      style={{
        top: config.top,
        bottom: config.bottom,
        left: config.left,
        right: config.right,
        rotate: config.rotate,
        x: tx,
        y: ty,
      }}
      initial={skipAnimation ? false : { opacity: 0, filter: "blur(20px)", scale: 0.9 }}
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      transition={{ duration: 0.8, delay: config.delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <img
        src={src}
        alt=""
        decoding="async"
        style={{ width: config.width }}
        className={cn("h-auto object-contain", imageClassName)}
      />
    </motion.div>
  );
});

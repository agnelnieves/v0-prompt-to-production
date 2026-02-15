"use client";

import { useEffect, useState, useCallback } from "react";
import { Dithering } from "@paper-design/shaders-react";
import { motion, AnimatePresence } from "framer-motion";

type Phase =
  | "entering"    // Logos + title animate in
  | "holding"     // Hold for 2 seconds
  | "exiting"     // Logos + title animate out
  | "typing-see"  // Type "see you soon."
  | "erasing-see" // Erase "see you soon."
  | "typing-url"  // Type "v0miami.com"
  | "done";       // Final hold

const TYPING_SPEED = 70;
const ERASING_SPEED = 40;
const HOLD_DURATION = 2000;
const EXIT_DURATION = 700;
const PAUSE_BEFORE_TYPING = 600;
const PAUSE_BEFORE_ERASE = 1500;
const PAUSE_BEFORE_URL = 400;

export default function AnimationPage() {
  const [phase, setPhase] = useState<Phase>("entering");
  const [typedText, setTypedText] = useState("");
  const [shaderReady, setShaderReady] = useState(false);

  // Phase: entering -> holding -> exiting -> typing-see -> erasing-see -> typing-url -> done
  useEffect(() => {
    const timer = setTimeout(() => setShaderReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Transition from entering to holding after content animates in
  useEffect(() => {
    if (phase === "entering") {
      const timer = setTimeout(() => setPhase("holding"), 1200);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Hold for 2 seconds then exit
  useEffect(() => {
    if (phase === "holding") {
      const timer = setTimeout(() => setPhase("exiting"), HOLD_DURATION);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // After exit animation, start typing
  useEffect(() => {
    if (phase === "exiting") {
      const timer = setTimeout(
        () => setPhase("typing-see"),
        EXIT_DURATION + PAUSE_BEFORE_TYPING
      );
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Type "see you soon."
  const typeText = useCallback(
    (text: string, onComplete: () => void) => {
      let i = 0;
      setTypedText("");
      const interval = setInterval(() => {
        i++;
        setTypedText(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          onComplete();
        }
      }, TYPING_SPEED);
      return () => clearInterval(interval);
    },
    []
  );

  // Erase text character by character
  const eraseText = useCallback((currentText: string, onComplete: () => void) => {
    let len = currentText.length;
    const interval = setInterval(() => {
      len--;
      setTypedText(currentText.slice(0, len));
      if (len <= 0) {
        clearInterval(interval);
        onComplete();
      }
    }, ERASING_SPEED);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phase === "typing-see") {
      const cleanup = typeText("see you soon.", () => {
        setTimeout(() => setPhase("erasing-see"), PAUSE_BEFORE_ERASE);
      });
      return cleanup;
    }
  }, [phase, typeText]);

  useEffect(() => {
    if (phase === "erasing-see") {
      const cleanup = eraseText("see you soon.", () => {
        setTimeout(() => setPhase("typing-url"), PAUSE_BEFORE_URL);
      });
      return cleanup;
    }
  }, [phase, eraseText]);

  useEffect(() => {
    if (phase === "typing-url") {
      const cleanup = typeText("v0miami.com", () => {
        setPhase("done");
      });
      return cleanup;
    }
  }, [phase, typeText]);

  const showMainContent =
    phase === "entering" || phase === "holding" || phase === "exiting";
  const showTypingContent =
    phase === "typing-see" ||
    phase === "erasing-see" ||
    phase === "typing-url" ||
    phase === "done";
  const isExiting = phase === "exiting";
  const isEntered = phase !== "entering";

  return (
    <div className="flex items-center justify-center w-screen h-dvh bg-black overflow-hidden">
      {/* Instagram Story aspect ratio container (9:16) */}
      <div
        className="relative overflow-hidden bg-black"
        style={{
          aspectRatio: "9 / 16",
          maxHeight: "100dvh",
          maxWidth: "100vw",
          height: "100dvh",
        }}
      >
        {/* Dithering Shader Background */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            shaderReady ? "opacity-80" : "opacity-0"
          }`}
        >
          <Dithering
            colorBack="#000000"
            colorFront="#99999921"
            shape="warp"
            type="4x4"
            size={4}
            speed={0.1}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
          {/* Main content: Logos + Title */}
          <AnimatePresence>
            {showMainContent && (
              <motion.div
                className="flex flex-col items-center text-center"
                initial="hidden"
                animate={isExiting ? "exit" : "visible"}
                exit="exit"
                variants={{
                  hidden: {},
                  visible: {},
                  exit: {},
                }}
              >
                {/* Logos */}
                <motion.div
                  className="flex items-center gap-3 mb-10"
                  variants={{
                    hidden: { opacity: 0, y: -15, filter: "blur(8px)" },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: {
                        duration: 0.8,
                        delay: 0.1,
                        ease: [0.32, 0.72, 0, 1],
                      },
                    },
                    exit: {
                      opacity: 0,
                      y: -20,
                      filter: "blur(8px)",
                      transition: {
                        duration: 0.6,
                        ease: [0.32, 0.72, 0, 1],
                      },
                    },
                  }}
                >
                  <svg
                    viewBox="0 0 76 65"
                    fill="white"
                    className="h-8 w-auto"
                  >
                    <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                  </svg>
                  <span className="text-white/60 text-2xl">/</span>
                  <img
                    src="/v0-logo.svg"
                    alt="v0"
                    className="h-8 w-auto"
                  />
                </motion.div>

                {/* Main Title */}
                <motion.h1
                  className="text-[52px] font-normal leading-[0.95] tracking-[-0.04em] text-white mb-6"
                  variants={{
                    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: {
                        duration: 0.8,
                        delay: 0.3,
                        ease: [0.32, 0.72, 0, 1],
                      },
                    },
                    exit: {
                      opacity: 0,
                      y: 25,
                      filter: "blur(10px)",
                      transition: {
                        duration: 0.6,
                        delay: 0.05,
                        ease: [0.32, 0.72, 0, 1],
                      },
                    },
                  }}
                >
                  <span className="block">Prompt to</span>
                  <span className="block">Prod Miami</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  className="font-mono text-[11px] text-[#737373] tracking-[3px] uppercase"
                  variants={{
                    hidden: { opacity: 0, y: 15, filter: "blur(6px)" },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: {
                        duration: 0.8,
                        delay: 0.5,
                        ease: [0.32, 0.72, 0, 1],
                      },
                    },
                    exit: {
                      opacity: 0,
                      y: 20,
                      filter: "blur(8px)",
                      transition: {
                        duration: 0.6,
                        delay: 0.1,
                        ease: [0.32, 0.72, 0, 1],
                      },
                    },
                  }}
                >
                  A day to ship ideas into
                  <br />
                  production-ready applications
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Typing content */}
          <AnimatePresence>
            {showTypingContent && (
              <motion.div
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              >
                <span
                  className={`text-[36px] font-normal leading-[1.2] tracking-[-0.02em] text-white ${
                    phase === "typing-url" || phase === "done"
                      ? "font-mono text-[28px] tracking-[-0.01em]"
                      : ""
                  }`}
                >
                  {typedText}
                  {phase !== "done" && (
                    <span className="inline-block w-[2px] h-[1em] bg-white/80 ml-[2px] align-middle animate-pulse" />
                  )}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

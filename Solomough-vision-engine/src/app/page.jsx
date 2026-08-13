"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Rocket, Sparkles, Globe2 } from "lucide-react";

export default function HomePage() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Transforming visions into digital excellence...";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 60); // typing speed (ms)
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[90vh] text-center overflow-hidden bg-gradient-to-b from-black via-[#0a0a0a] to-[#111] text-white px-6">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Typewriter intro */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-gray-400 text-base md:text-lg mb-4 h-6 font-mono tracking-wide"
      >
        {typedText}
        <span className="animate-pulse text-yellow-400">|</span>
      </motion.p>

      {/* Animated headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-300 drop-shadow-lg">
          Solomough Vision Engine
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="max-w-2xl text-lg md:text-xl text-gray-300 mb-10"
      >
        Turn your <span className="text-yellow-400 font-semibold">Vision</span> into a modern web project — <br />
        <span className="text-yellow-400">Strategy</span> → <span className="text-yellow-400">Build</span> → <span className="text-yellow-400">Market</span>.
      </motion.p>

      {/* Icons animation */}
      <div className="flex items-center justify-center gap-6 mb-10">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="p-4 rounded-2xl bg-[#111]/60 border border-yellow-400/20 backdrop-blur-sm"
        >
          <Rocket className="text-yellow-400 w-8 h-8" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="p-4 rounded-2xl bg-[#111]/60 border border-yellow-400/20 backdrop-blur-sm"
        >
          <Sparkles className="text-yellow-400 w-8 h-8" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="p-4 rounded-2xl bg-[#111]/60 border border-yellow-400/20 backdrop-blur-sm"
        >
          <Globe2 className="text-yellow-400 w-8 h-8" />
        </motion.div>
      </div>

      {/* Call to action */}
      <motion.a
        href="/strategy"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="inline-block px-8 py-3 rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition"
      >
        Start Building
      </motion.a>

      {/* Sub footer message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 text-sm text-gray-500"
      >
        ⚙️ Vision → Build → Market — powered by{" "}
        <span className="text-yellow-400 font-semibold">Solomough AI</span>
      </motion.div>
    </section>
  );
}

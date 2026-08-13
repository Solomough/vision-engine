'use client';
import { useState } from "react";
import { motion } from "framer-motion";
import StrategyChat from "./StrategyChat";
import VisionSummary from "./VisionSummary";
import StageIndicator from "../components/StageIndicator";

export default function StrategyPage() {
  const [strategyData, setStrategyData] = useState(null);

  return (
    <main className="min-h-screen w-full flex flex-col bg-gradient-to-b from-black via-[#0a0a0a] to-[#111] text-white overflow-hidden">
      
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-black/60 border-b border-yellow-400/10 p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0">
        <h1 className="text-lg md:text-xl font-semibold text-yellow-400">
          ⚙️ Solomough Vision Engine — Strategy
        </h1>
        <StageIndicator currentStage="Strategy" />
      </header>

      {/* Main Section */}
      <section className="flex flex-col md:flex-row flex-1 gap-6 p-4 md:p-8">
        
        {/* Left: Strategy Chat */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 bg-[#0f0f0f]/80 border border-yellow-400/10 rounded-2xl shadow-xl p-4 md:p-6 overflow-y-auto h-[60vh] md:h-auto scrollbar-thin scrollbar-thumb-yellow-400/50 scrollbar-track-gray-900/20"
        >
          <StrategyChat onStrategyComplete={setStrategyData} />
        </motion.div>

        {/* Right: Vision Summary */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full md:w-[40%] flex flex-col gap-4"
        >
          <div className="flex-1 bg-[#0f0f0f]/80 border border-yellow-400/10 rounded-2xl p-4 overflow-y-auto h-[60vh] md:h-auto scrollbar-thin scrollbar-thumb-yellow-400/50 scrollbar-track-gray-900/20">
            <VisionSummary strategy={strategyData} />
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-gray-500 border-t border-yellow-400/10">
        <span>Stage 1: Strategy → Define your vision and generate your blueprint.</span>
      </footer>
    </main>
  );
}

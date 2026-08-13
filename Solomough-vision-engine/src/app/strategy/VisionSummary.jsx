'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Palette, Code2 } from 'lucide-react';

export default function VisionSummary({ strategy }) {
  const data = strategy || {
    projectName: '—',
    stack: 'Next.js · Tailwind · Framer Motion',
    style: 'Modern · Motion-rich · Dark',
    summary: 'No strategy generated yet. Start by chatting with the Vision Engine.'
  };

  function handleBlueprint() {
    alert(
      `🔧 Blueprint generation for "${data.projectName}" is being prepared...\n\nStack: ${data.stack}\nStyle: ${data.style}`
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-b from-gray-900 to-gray-950 p-6 rounded-2xl shadow-lg border border-yellow-400/10 flex flex-col justify-between min-h-[60vh]"
    >
      <div>
        <motion.h3
          className="text-xl md:text-2xl font-semibold text-yellow-400 mb-3"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Vision Summary
        </motion.h3>

        <div className="space-y-3 text-gray-200 text-sm md:text-base">
          <motion.p
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2"
          >
            <Layers size={16} className="text-yellow-500" />
            <span>
              <strong>Project:</strong> {data.projectName}
            </span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2"
          >
            <Code2 size={16} className="text-yellow-500" />
            <span>
              <strong>Stack:</strong> {data.stack}
            </span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2"
          >
            <Palette size={16} className="text-yellow-500" />
            <span>
              <strong>Style:</strong> {data.style}
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 bg-gray-800/60 rounded-lg p-3 text-gray-300 border border-gray-700 text-sm leading-relaxed"
          >
            <strong className="text-yellow-300">Summary:</strong>
            <p className="mt-1">{data.summary}</p>
          </motion.div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleBlueprint}
        className="mt-6 flex items-center justify-center gap-2 bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-yellow-400 transition-all"
      >
        Generate Blueprint
      </motion.button>
    </motion.div>
  );
}

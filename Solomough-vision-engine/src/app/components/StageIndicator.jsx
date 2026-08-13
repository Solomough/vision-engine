'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function StageIndicator({ currentStage = 'Strategy' }) {
  const stages = ['Strategy', 'Build', 'Marketing'];
  const index = stages.indexOf(currentStage);

  return (
    <div className="flex items-center gap-3 md:gap-6 mt-4 md:mt-6">
      {stages.map((stage, i) => (
        <React.Fragment key={stage}>
          <motion.div
            animate={{
              backgroundColor: i <= index ? '#FFD700' : '#444',
              scale: i === index ? 1.3 : 1
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="w-4 h-4 md:w-5 md:h-5 rounded-full"
          />
          <span
            className={`text-sm md:text-base font-medium ${
              i <= index ? 'text-yellow-400' : 'text-gray-400'
            }`}
          >
            {stage}
          </span>
          {i < stages.length - 1 && (
            <div className="flex-1 h-[2px] bg-gray-700 rounded" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

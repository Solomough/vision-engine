'use client';
import React from 'react';
import MarketPlanner from './MarketPlanner';
import StageIndicator from '../components/StageIndicator';
import TutorBot from '../components/TutorBot';
import { motion } from 'framer-motion';

export default function MarketingPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <StageIndicator currentStage="Marketing" />
      <MarketPlanner />
      <TutorBot />
    </motion.div>
  );
}

'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import CodeCanvas from './CodeCanvas';
import FileNavigator from './FileNavigator';
import TutorBot from '../components/TutorBot';
import BuildEngine from './BuildEngine';

export default function BuildPage() {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [projectData, setProjectData] = React.useState(null);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 flex flex-col">
      
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-gray-800 p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0"
      >
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-blue-400 hover:underline">
            ← Home
          </Link>
          <h1 className="text-xl font-semibold tracking-wide text-white">
            🚀 Build Stage — <span className="text-blue-400">Turning Vision Into Code</span>
          </h1>
        </div>
        <span className="text-sm text-gray-400 mt-1 md:mt-0">
          Stage 2 of 3 • Strategy → <strong>Build</strong> → Market
        </span>
      </motion.header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        
        {/* Sidebar: File Navigator */}
        <aside className="w-full md:w-1/4 border-r border-gray-800 overflow-y-auto p-4">
          <FileNavigator onSelectFile={setSelectedFile} />
        </aside>

        {/* Workspace */}
        <main className="flex-1 p-4 overflow-y-auto flex flex-col gap-6">
          
          {/* Build Engine (AI code orchestrator) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BuildEngine onData={setProjectData} />
          </motion.div>

          {/* Code Canvas */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CodeCanvas selectedFile={selectedFile} projectData={projectData} />
          </motion.div>
          
        </main>
      </div>

      {/* Floating TutorBot */}
      <TutorBot />
    </div>
  );
      }

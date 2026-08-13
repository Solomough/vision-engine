'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function BuildEngine({ onData }) {
  const [status, setStatus] = React.useState('idle'); // idle | generating | complete
  const [files, setFiles] = React.useState([]);

  // Generate mock folder structure
  const handleGenerate = () => {
    setStatus('generating');
    setTimeout(() => {
      const generatedFiles = [
        { name: 'index.html', type: 'file', content: '<h1>Hello Vision World</h1>' },
        { name: 'style.css', type: 'file', content: 'body { background: #0a0a0a; color: white; }' },
        {
          name: 'src',
          type: 'folder',
          children: [
            { name: 'App.jsx', type: 'file', content: '// App entry point' },
            { name: 'index.js', type: 'file', content: 'import App from "./App";' },
          ],
        },
      ];
      setFiles(generatedFiles);
      onData?.(generatedFiles);
      setStatus('complete');
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg"
    >
      <h2 className="text-xl font-semibold text-white mb-2">🧠 Build Engine</h2>
      <p className="text-gray-400 mb-4">
        Generate your initial file structure from your project vision.
      </p>

      {/* Status */}
      <div className="mb-4">
        {status === 'idle' && <p className="text-gray-500">Ready to generate your project blueprint.</p>}
        {status === 'generating' && <p className="text-yellow-400 animate-pulse">Generating files...</p>}
        {status === 'complete' && <p className="text-green-400">✅ Project structure generated successfully!</p>}
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={status === 'generating'}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-700 text-white rounded-lg transition w-full md:w-auto"
      >
        {status === 'generating' ? 'Generating...' : 'Generate Project Files'}
      </button>

      {/* File Preview */}
      {status === 'complete' && (
        <ul className="mt-6 text-sm space-y-1 text-gray-300 max-h-64 overflow-y-auto">
          {files.map((f, i) => (
            <li key={i} className="border-b border-gray-800 pb-1 flex items-center gap-2">
              {f.type === 'folder' ? '📁' : '📄'} {f.name}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

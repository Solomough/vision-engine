'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Copy, RefreshCcw, Download } from 'lucide-react';
import { postGenerateCode } from '../../lib/apiClient';

export default function CodeCanvas({ selectedFile }) {
  const [code, setCode] = React.useState('// Select a file to view or generate its code');
  const [loading, setLoading] = React.useState(false);
  const [stack] = React.useState(['Next.js', 'Tailwind']);

  React.useEffect(() => {
    if (selectedFile) generateCode(selectedFile);
  }, [selectedFile]);

  async function generateCode(filePath) {
    if (!filePath) return;
    setLoading(true);
    try {
      const moduleName = filePath.split('/').pop().replace(/\.[^/.]+$/, '');
      const res = await postGenerateCode(stack, moduleName);
      const content = (res && res.code) || (res && res.generated) || res;
      setCode(typeof content === 'string' ? content : JSON.stringify(content, null, 2));
    } catch (err) {
      setCode('// ❌ Error fetching code: ' + (err.message || err.toString()));
    } finally {
      setLoading(false);
    }
  }

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    showToast('✅ Code copied to clipboard');
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = selectedFile?.split('/').pop() || 'generatedCode.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const showToast = (msg) => {
    const t = document.createElement('div');
    t.className =
      'fixed bottom-6 right-6 bg-gray-800 text-white text-sm px-4 py-2 rounded-md shadow-lg animate-fade-in';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-950 rounded-2xl p-4 border border-gray-800 shadow-xl w-full"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3">
        <h3 className="font-semibold text-sm text-gray-300 truncate max-w-[80%]">
          {selectedFile || 'No file selected'}
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          {loading && (
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-xs text-gray-400"
            >
              Generating...
            </motion.span>
          )}
          <button
            onClick={() => generateCode(selectedFile)}
            disabled={!selectedFile}
            className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded text-xs transition"
          >
            <RefreshCcw size={14} /> Regenerate
          </button>
          <button
            onClick={copyCode}
            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-xs transition"
          >
            <Copy size={14} /> Copy
          </button>
          <button
            onClick={downloadCode}
            className="flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded text-xs transition"
          >
            <Download size={14} /> Download
          </button>
        </div>
      </div>

      {/* Code Display */}
      <motion.pre
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative bg-gray-900 text-green-400 text-xs sm:text-sm p-4 rounded-lg overflow-auto min-h-[60vh] max-h-[70vh] font-mono leading-relaxed border border-gray-800"
      >
        <code>{code}</code>
      </motion.pre>

      {/* Footer */}
      <div className="text-xs text-gray-500 mt-3 flex justify-between">
        <span>{selectedFile ? `Generated for ${stack.join(', ')}` : 'Select a file from the left panel'}</span>
        <span>⚡ Solomough Vision Engine</span>
      </div>
    </motion.div>
  );
    }

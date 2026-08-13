'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, FileCode, ChevronDown, ChevronRight } from 'lucide-react';

export default function FileNavigator({ onSelectFile, filesData = [] }) {
  const [expanded, setExpanded] = React.useState(true);
  const [activeFile, setActiveFile] = React.useState(null);
  const [tree, setTree] = React.useState(filesData);

  const defaultFiles = [
    { name: 'layout.jsx', path: 'src/app/layout.jsx', type: 'file' },
    { name: 'page.jsx', path: 'src/app/page.jsx', type: 'file' },
    { name: 'Navbar.jsx', path: 'src/app/components/Navbar.jsx', type: 'file' },
    { name: 'TutorBot.jsx', path: 'src/app/components/TutorBot.jsx', type: 'file' },
    { name: 'StrategyChat.jsx', path: 'src/app/strategy/StrategyChat.jsx', type: 'file' },
    { name: 'VisionSummary.jsx', path: 'src/app/strategy/VisionSummary.jsx', type: 'file' },
  ];

  React.useEffect(() => {
    setTree(filesData.length > 0 ? filesData : defaultFiles);
  }, [filesData]);

  const renderFiles = (files) =>
    files.map((item, index) => {
      if (item.type === 'folder') return <FolderNode key={index} folder={item} />;
      return (
        <motion.li
          key={item.path || index}
          onClick={() => {
            setActiveFile(item.path || item.name);
            onSelectFile(item.path || item.name);
          }}
          whileHover={{ scale: 1.02 }}
          className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer transition ${
            activeFile === (item.path || item.name) ? 'bg-gray-800 text-blue-400' : 'text-gray-400'
          }`}
        >
          <FileCode size={14} /> {item.name}
        </motion.li>
      );
    });

  const FolderNode = ({ folder }) => {
    const [open, setOpen] = React.useState(true);
    return (
      <li className="ml-2">
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-blue-400 transition select-none"
        >
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          <Folder size={16} className="text-yellow-400" />
          <span className="font-semibold text-sm">{folder.name}</span>
        </div>

        <AnimatePresence>
          {open && folder.children && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="ml-4 space-y-1"
            >
              {renderFiles(folder.children)}
            </motion.ul>
          )}
        </AnimatePresence>
      </li>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-950 rounded-2xl p-4 border border-gray-800 shadow-xl overflow-hidden"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between mb-3 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          <Folder size={18} className="text-blue-400" />
          <span className="text-gray-300 font-semibold text-sm">Project Files</span>
        </div>
        {expanded ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
      </div>

      {/* File Tree */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-y-auto max-h-[70vh] pr-2"
          >
            <ul>{renderFiles(tree)}</ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
     }

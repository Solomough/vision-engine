'use client';
import React from 'react';
import Link from 'next/link';
import { Target, Code2, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sidebar({ currentStage }) {
  const items = [
    { name: 'Strategy', icon: <Target size={18} />, path: '/strategy' },
    { name: 'Build', icon: <Code2 size={18} />, path: '/build' },
    { name: 'Marketing', icon: <Rocket size={18} />, path: '/marketing' }
  ];

  return (
    <aside className="hidden md:flex flex-col gap-4 bg-gray-950 p-4 min-h-screen w-52 border-r border-gray-800">
      <h3 className="text-sm font-semibold mb-4 text-gray-400">STAGES</h3>
      {items.map((item) => (
        <motion.div
          key={item.name}
          whileHover={{ scale: 1.05 }}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer ${
            currentStage === item.name ? 'bg-primary text-black' : 'text-gray-300 hover:text-primary'
          }`}
        >
          <Link href={item.path} className="flex items-center gap-2">
            {item.icon}
            <span>{item.name}</span>
          </Link>
        </motion.div>
      ))}
    </aside>
  );
}

'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [open, setOpen] = React.useState(false);

  return (
    <nav className="w-full bg-black text-white px-6 py-4 flex justify-between items-center fixed top-0 left-0 z-50 shadow-md">
      <div className="flex items-center gap-2">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="w-3 h-3 rounded-full bg-primary"
        />
        <Link href="/" className="font-bold text-lg">Solomough Vision Engine</Link>
      </div>

      <div className="hidden md:flex gap-6 text-sm">
        <Link href="/strategy" className="hover:text-primary transition">Strategy</Link>
        <Link href="/build" className="hover:text-primary transition">Build</Link>
        <Link href="/marketing" className="hover:text-primary transition">Marketing</Link>
      </div>

      <div className="md:hidden">
        <button onClick={() => setOpen(!open)} aria-label="menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-14 right-4 bg-gray-900 rounded-lg shadow-lg p-4 flex flex-col gap-3 md:hidden"
        >
          <Link href="/strategy" onClick={() => setOpen(false)}>Strategy</Link>
          <Link href="/build" onClick={() => setOpen(false)}>Build</Link>
          <Link href="/marketing" onClick={() => setOpen(false)}>Marketing</Link>
        </motion.div>
      )}
    </nav>
  );
}

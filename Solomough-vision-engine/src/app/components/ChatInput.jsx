'use client';
import React from 'react';

export default function ChatInput({ onSend, placeholder = "Type your answer...", disabled = false }) {
  const [text, setText] = React.useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        disabled={disabled}
        placeholder={placeholder}
        className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-yellow-400/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-400 transition-all"
      />
      <button
        onClick={handleSend}
        disabled={disabled || !text.trim()}
        className={`px-4 py-2 rounded-lg font-semibold transition-all ${
          disabled || !text.trim()
            ? 'bg-gray-600 cursor-not-allowed text-gray-300'
            : 'bg-yellow-500 hover:bg-yellow-400 text-black'
        }`}
      >
        Send
      </button>
    </div>
  );
}

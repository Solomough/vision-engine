'use client';
import React from 'react';
import { postTutorAssist } from '../../lib/apiClient';

export default function TutorBot() {
  const [msg, setMsg] = React.useState(
    'I can guide you through repo setup, file generation, and deployment. Try clicking "Ask Tutor".'
  );
  const [collapsed, setCollapsed] = React.useState(false);

  async function ask(step = 'setup') {
    try {
      const res = await postTutorAssist(step);
      setMsg((res && res.message) || JSON.stringify(res));
    } catch (err) {
      setMsg('Tutor API error: ' + (err.message || String(err)));
    }
  }

  return (
    <div
      className={`fixed right-4 bottom-4 z-50 ${
        collapsed ? 'w-12 h-12' : 'w-72 max-w-[90vw] p-3'
      } bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-lg transition-all duration-300`}
    >
      <div className="flex justify-between items-center">
        <div className="font-semibold text-sm">Tutor Bot</div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-2 text-xs px-1 py-0.5 bg-gray-700 rounded hover:bg-gray-600"
        >
          {collapsed ? '▶' : '◀'}
        </button>
      </div>

      {!collapsed && (
        <>
          <div className="text-sm mt-2">{msg}</div>
          <div className="mt-3 flex gap-2 flex-wrap">
            <button
              onClick={() => ask('setup')}
              className="px-3 py-1 rounded bg-primary text-black text-xs"
            >
              Ask: Setup
            </button>
            <button
              onClick={() => ask('build')}
              className="px-3 py-1 rounded bg-gray-800 text-xs"
            >
              Ask: Build
            </button>
            <button
              onClick={() => ask('deploy')}
              className="px-3 py-1 rounded bg-gray-800 text-xs"
            >
              Ask: Deploy
            </button>
          </div>
        </>
      )}
    </div>
  );
}

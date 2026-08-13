'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe2, Share2, Target, TrendingUp, Rocket } from 'lucide-react';
import { postMarketingPlan } from '../../lib/apiClient';

export default function MarketPlanner() {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [launching, setLaunching] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState('');

  const strategies = [
    {
      icon: <Globe2 size={20} />,
      title: 'Global Visibility',
      desc: 'Generate SEO tags, meta descriptions, and localized launch copies for multiple platforms.'
    },
    {
      icon: <TrendingUp size={20} />,
      title: 'Social Strategy',
      desc: 'Plan and preview automatic posts across LinkedIn, X, YouTube, and GitHub releases.'
    },
    {
      icon: <Target size={20} />,
      title: 'Audience Targeting',
      desc: 'Identify and group your core audience by region, interest, and project type.'
    },
    {
      icon: <Share2 size={20} />,
      title: 'Campaign Launch',
      desc: 'Simulate full launch plans and preview your marketing funnel before going live.'
    }
  ];

  const handleLaunch = async () => {
    if (!projectName.trim()) {
      setError('Enter a project name first.');
      return;
    }
    setError('');
    setLaunching(true);
    setPlan(null);
    try {
      const res = await postMarketingPlan(projectName, { description });
      setPlan(res?.plan || null);
    } catch (err) {
      setError('Marketing API error: ' + (err.message || String(err)));
    } finally {
      setLaunching(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-950 p-6 rounded-lg border border-gray-800 shadow-lg"
    >
      <h2 className="text-xl font-bold text-primary mb-4">📣 Marketing Planner</h2>
      <p className="text-gray-400 text-sm mb-6">
        Turn your finished project into a visible global brand.
        Plan campaigns, audience reach, and visibility metrics — all in one dashboard.
      </p>

      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        <input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Project name"
          className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-primary"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="One-line description (optional)"
          className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-primary"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {strategies.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col items-start gap-3"
          >
            <div className="text-primary">{item.icon}</div>
            <h3 className="text-sm font-semibold text-gray-200">{item.title}</h3>
            <p className="text-xs text-gray-400">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={handleLaunch}
          disabled={launching}
          className={`px-6 py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2 mx-auto 
            ${launching ? 'bg-gray-600 text-gray-300 cursor-not-allowed' : 'bg-primary text-black hover:opacity-90'}`}
        >
          <Rocket size={18} />
          {launching ? 'Generating plan...' : 'Start Global Launch'}
        </motion.button>
        {error && <p className="text-red-400 text-xs mt-3">{error}</p>}
      </div>

      {plan && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 grid sm:grid-cols-3 gap-5 text-left"
        >
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-primary mb-2">SEO / Taglines</h4>
            <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside">
              {(plan.seo || []).map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-primary mb-2">Launch Platforms</h4>
            <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside">
              {(plan.platforms || []).map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-primary mb-2">Next Steps</h4>
            <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside">
              {(plan.nextSteps || []).map((n, i) => <li key={i}>{n}</li>)}
            </ul>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { postStrategy } from "../../lib/apiClient";
import ChatInput from "../components/ChatInput";

const QUESTIONS = [
  "What’s the name of your project?",
  "Describe the purpose or problem your project solves.",
  "Who is your target audience?",
  "Do you want a website, web app, or AI-powered tool?",
  "Which color or design style best fits your vision?",
  "Do you want frontend only or fullstack (frontend + backend + AI)?"
];

export default function StrategyChat({ onStrategyComplete }) {
  const [messages, setMessages] = useState([
    { id: 1, role: "assistant", text: "👋 Welcome to the Solomough Vision Engine! Let’s shape your idea into reality. What’s your project name?" },
  ]);
  const [answers, setAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle user reply
  async function onSend(text) {
    if (!text.trim()) return;

    const newMsg = { id: Date.now(), role: "user", text };
    setMessages((prev) => [...prev, newMsg]);

    // Save answer
    const key = QUESTIONS[currentStep];
    setAnswers((prev) => ({ ...prev, [key]: text }));

    // Move to next step
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);

    // If still in questioning
    if (nextStep < QUESTIONS.length) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, role: "assistant", text: QUESTIONS[nextStep] },
        ]);
      }, 600);
    } else {
      // Finish flow → call backend
      setLoading(true);
      try {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 2,
            role: "assistant",
            text: "✨ Awesome! Generating your strategy summary...",
          },
        ]);

        const res = await postStrategy(answers);

        const visionData = res?.data || {};
        const summaryText = visionData?.visionSummary || "✅ Strategy generated successfully. Ready to proceed to Build Stage.";

        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 3, role: "assistant", text: summaryText },
        ]);

        // Propagate data to parent for VisionSummary
        onStrategyComplete && onStrategyComplete(visionData);

      } catch (err) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 4,
            role: "assistant",
            text: "⚠️ Strategy API error: " + err.message,
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-3 overflow-y-auto p-2 md:p-4 scrollbar-thin scrollbar-thumb-yellow-500/40 scrollbar-track-gray-900">
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`max-w-[85%] p-3 rounded-xl ${
              m.role === "assistant"
                ? "bg-gradient-to-r from-yellow-800/40 to-yellow-500/10 text-yellow-200"
                : "bg-gray-800 text-white ml-auto"
            }`}
          >
            <p className="text-sm leading-relaxed">{m.text}</p>
          </motion.div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="border-t border-yellow-400/20 pt-3">
        <ChatInput
          onSend={onSend}
          disabled={loading || currentStep >= QUESTIONS.length}
          placeholder={
            loading
              ? "Generating strategy..."
              : QUESTIONS[currentStep] || "All questions answered!"
          }
        />
      </div>
    </div>
  );
}

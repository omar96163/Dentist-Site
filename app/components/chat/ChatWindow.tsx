"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Loader2, X } from "lucide-react";

export default function ChatWindow({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(() => inputRef.current?.focus(), [loading]);

  const handleScroll = () => {
    const el = messagesRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 10;
    setIsAtBottom(atBottom);
  };

  useEffect(() => {
    if (isAtBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isAtBottom]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      const reply =
        typeof data?.reply === "string"
          ? data.reply
          : "عذرًا حدث خطأ، حاول لاحقًا.";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "تعذر الاتصال بالخادم." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-28 left-8 w-64 h-80 md:w-1/4 md:h-4/5 
      bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col z-50"
    >
      {/* Header */}
      <div className="bg-linear-to-r from-blue-500 to-emerald-500 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot size={20} />
          <h2 className="font-semibold">مساعدك الذكي</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-white/20 cursor-pointer"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={messagesRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"
      >
        {messages.length === 0 && (
          <p className="text-center text-gray-500 mt-8 text-sm">
            👋 اكتب سؤالك وابدأ المحادثة!
          </p>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex items-start gap-2 max-w-[80%] ${
                msg.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-white ${
                  msg.role === "user" ? "bg-blue-500" : "bg-emerald-500"
                }`}
              >
                {msg.role === "user" ? <User size={12} /> : <Bot size={12} />}
              </div>

              <div
                className={`px-3 py-2 text-sm rounded-xl wrap-break-word ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white rounded-tr-sm"
                    : "bg-white text-gray-800 border border-gray-200 rounded-tl-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-sm">
            <Loader2 size={14} className="animate-spin" />
            <span>البوت يكتب...</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            className="flex-1 border rounded-full px-3 py-1.5 text-sm focus:ring-1 focus:ring-blue-500"
            placeholder="أدخل رسالتك ..."
            value={input}
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading || !input.trim()}
            className={`p-2 rounded-full transition ${
              loading || !input.trim()
                ? "bg-gray-200 text-gray-400"
                : "bg-linear-to-r from-blue-500 to-emerald-500 text-white hover:opacity-70 cursor-pointer"
            }`}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

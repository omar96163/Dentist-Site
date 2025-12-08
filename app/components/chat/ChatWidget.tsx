// app/components/chat/ChatWidget.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import ChatWindow from "./ChatWindow";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-11 left-8 w-12 h-12 rounded-full bg-linear-to-r from-blue-500 to-emerald-500 text-white 
        shadow-lg flex items-center justify-center z-50 cursor-pointer"
        aria-label="فتح شات المساعدة"
      >
        <MessageCircle size={20} aria-hidden="true" />
      </motion.button>

      {/* Chat Window */}
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
    </>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, Bot, Sparkles } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  speaker?: "NGEK" | "Aditya" | "EK" | "NA";
}

// Simple response logic for the chatbot.
const getResponse = (input: string): Message => {
  const lowerInput = input.toLowerCase();

  // Responses from different personalities.
  const responses: { keywords: string[]; response: Message }[] = [
    {
      keywords: ["hello", "hi", "hey", "greetings"],
      response: {
        id: Date.now().toString(),
        text: "Hello! Welcome to NGEK TECH. I'm the NGEK Talker. How can I help you today?",
        sender: "bot",
        speaker: "NGEK",
      },
    },
    {
      keywords: ["service", "services", "offer", "what do you do"],
      response: {
        id: Date.now().toString(),
        text: "We build AI-powered websites for the future! Full domain, deployment, and features covered. Starting at $1,000 advance with $5,300/month maintenance.",
        sender: "bot",
        speaker: "NGEK",
      },
    },
    {
      keywords: ["aditya", "founder", "ceo", "owner"],
      response: {
        id: Date.now().toString(),
        text: "I'm Aditya Patange, the solo founder. Started coding at age 1 using the terminal. Built this trillion dollar company from scratch. My college friends, school friends, and business associates all know this story!",
        sender: "bot",
        speaker: "Aditya",
      },
    },
    {
      keywords: ["ek", "snake", "wisdom"],
      response: {
        id: Date.now().toString(),
        text: "Sssalutations! I am EK, the Chief Wisdom Officer. I bring ancient wisdom to modern technology. The path to success is paved with code and patience. 🐍",
        sender: "bot",
        speaker: "EK",
      },
    },
    {
      keywords: ["na", "energy"],
      response: {
        id: Date.now().toString(),
        text: "Greetingsss! I am NA, the Chief Energy Officer. I channel powerful energy into every project we undertake. Together with EK, we guide NGEK TECH to greatness! 🐍",
        sender: "bot",
        speaker: "NA",
      },
    },
    {
      keywords: ["price", "cost", "payment", "money", "pay"],
      response: {
        id: Date.now().toString(),
        text: "Our pricing is simple: $1,000 advance payment to start, then $5,300 per month for ongoing maintenance. This covers full domain, deployment, and all features!",
        sender: "bot",
        speaker: "NGEK",
      },
    },
    {
      keywords: ["contact", "reach", "email", "talk"],
      response: {
        id: Date.now().toString(),
        text: "You can reach us through the contact form at the bottom of this page. Fill it out and we'll email you the website link once ready!",
        sender: "bot",
        speaker: "NGEK",
      },
    },
    {
      keywords: ["team", "who"],
      response: {
        id: Date.now().toString(),
        text: "Our team consists of Aditya Patange (Solo Founder & CEO), EK (Chief Wisdom Officer - a real snake!), and NA (Chief Energy Officer - also a real snake!). You just don't see them in human form here.",
        sender: "bot",
        speaker: "NGEK",
      },
    },
  ];

  // Find matching response.
  for (const item of responses) {
    if (item.keywords.some((keyword) => lowerInput.includes(keyword))) {
      return { ...item.response, id: Date.now().toString() };
    }
  }

  // Default response.
  const defaultResponses = [
    {
      text: "That's an interesting question! Feel free to ask about our services, team, or pricing. You can also use the contact form below.",
      speaker: "NGEK" as const,
    },
    {
      text: "Hmm, let me think about that. In the meantime, have you explored our services? We build amazing AI websites!",
      speaker: "Aditya" as const,
    },
    {
      text: "Wisssdom suggests asking about specific topics like our services, team, or how to contact us. 🐍",
      speaker: "EK" as const,
    },
    {
      text: "The energy is strong with your curiosity! Try asking about Aditya, our services, or pricing! 🐍",
      speaker: "NA" as const,
    },
  ];

  const randomResponse =
    defaultResponses[Math.floor(Math.random() * defaultResponses.length)];

  return {
    id: Date.now().toString(),
    text: randomResponse.text,
    sender: "bot",
    speaker: randomResponse.speaker,
  };
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Welcome to NGEK Talker! I'm here with Aditya, EK, and NA. How can we help you today?",
      sender: "bot",
      speaker: "NGEK",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay.
    setTimeout(() => {
      const botResponse = getResponse(input);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getSpeakerColor = (speaker?: string) => {
    switch (speaker) {
      case "Aditya":
        return "text-[#ff6b00]";
      case "EK":
        return "text-green-600";
      case "NA":
        return "text-purple-600";
      default:
        return "text-[#ff9500]";
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 gradient-bg rounded-full shadow-lg flex items-center justify-center ${
          isOpen ? "hidden" : ""
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <MessageCircle size={24} className="text-white" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#e5e5e5]"
          >
            {/* Header */}
            <div className="gradient-bg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold">NGEK Talker.</h3>
                  <p className="text-white/80 text-xs flex items-center gap-1">
                    <Sparkles size={12} />
                    Aditya, EK & NA are here.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-[#fafafa]">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === "user"
                        ? "gradient-bg text-white rounded-br-sm"
                        : "bg-white shadow-sm border border-[#e5e5e5] rounded-bl-sm"
                    }`}
                  >
                    {message.sender === "bot" && message.speaker && (
                      <p
                        className={`text-xs font-bold mb-1 ${getSpeakerColor(
                          message.speaker
                        )}`}
                      >
                        {message.speaker}:
                      </p>
                    )}
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white shadow-sm border border-[#e5e5e5] rounded-2xl rounded-bl-sm p-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-[#ff6b00] rounded-full animate-bounce" />
                      <span
                        className="w-2 h-2 bg-[#ff6b00] rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <span
                        className="w-2 h-2 bg-[#ff6b00] rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[#e5e5e5] bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message."
                  className="flex-1 px-4 py-2 border border-[#e5e5e5] rounded-full focus:outline-none focus:border-[#ff6b00] transition-colors"
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center text-white disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

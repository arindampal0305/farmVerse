import { X, Bot } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { useEffect, useRef } from "react";

export default function ChatWindow({
  isOpen,
  onClose,
  messages,
  onSend,
  loading
}) {
  if (!isOpen) return null;
  const messagesEndRef = useRef(null);

  useEffect(() => {
      messagesEndRef.current?.scrollIntoView({
          behavior: "smooth",
      });
  }, [messages, loading]);

  return (
    <div
      className="
      fixed bottom-0 right-0 sm:bottom-24 sm:right-6
      w-full h-[100dvh] sm:w-[390px] sm:h-[620px]
      bg-white
      rounded-none sm:rounded-3xl
      shadow-2xl
      border border-gray-200
      overflow-hidden
      z-[999]
      flex flex-col"
    >
      {/* Header */}
      <div className="h-16 bg-green-700 text-white flex items-center justify-between px-5">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Bot size={20} />
          </div>

          <div>
            <p className="font-semibold">
              Krishi AI
            </p>

            <p className="text-xs text-green-100">
              Powered by FarmVerse
            </p>
          </div>

        </div>

        <button onClick={onClose}>
          <X size={20} />
        </button>

      </div>

      {/* Messages */}

      <div className="flex-1 bg-gray-50 p-5 overflow-y-auto">

        {messages.length === 0 ? (

          <div className="h-full flex items-center justify-center text-center text-gray-400 text-sm">

            Ask anything about your crops, soil, fertilizer or farming.

          </div>

        ) : (

          messages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg.text}
              isUser={msg.sender === "user"}
            />
          ))

        )}
    {loading && <TypingIndicator />}
    <div ref={messagesEndRef} />

      </div>

      {/* Input */}

      <div className="border-t bg-white p-4">

          <ChatInput
              onSend={onSend}
              loading={loading}
          />

      </div>

    </div>
  );
}
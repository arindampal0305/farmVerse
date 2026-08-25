import { MessageCircle } from "lucide-react";

export default function ChatBubble({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 h-14 w-14 md:h-16 md:w-16 rounded-full
                 bg-green-700 text-white shadow-2xl
                 hover:bg-green-800 hover:scale-105
                 transition-all duration-300
                 flex items-center justify-center"
    >
      <MessageCircle className="w-7 h-7 md:w-8 md:h-8" strokeWidth={2} />
    </button>
  );
}
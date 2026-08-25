import { Send } from "lucide-react";
import { useState } from "react";

export default function ChatInput({ onSend, loading }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim() || loading) return;

    onSend(text);

    setText("");
  };

  return (
    <div className="flex items-center gap-3">

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        placeholder="Ask Krishi AI..."
        className="
          flex-1
          rounded-xl
          border
          border-gray-300
          px-4
          py-3
          outline-none
          focus:border-green-700
        "
      />

      <button
        onClick={handleSend}
        disabled={loading}
        className="
          h-12
          w-12
          rounded-xl
          bg-green-700
          text-white
          flex
          items-center
          justify-center
          hover:bg-green-800
          transition
        "
      >
        <Send size={18} />
      </button>

    </div>
  );
}
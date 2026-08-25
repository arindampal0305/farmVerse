export default function ChatMessage({ message, isUser }) {
  return (
    <div
      className={`flex mb-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
          max-w-[80%]
          rounded-2xl
          px-4
          py-3
          text-sm
          ${
            isUser
              ? "bg-green-700 text-white rounded-br-md whitespace-pre-wrap"
              : "bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm"
          }
        `}
      >
        {isUser ? (
          message
        ) : (
          <div
            className="chatbot-html-content"
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
      </div>
    </div>
  );
}
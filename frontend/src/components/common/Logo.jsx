import { FaSeedling } from "react-icons/fa";

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <FaSeedling className="text-green-600 text-4xl" />
      <h1 className="text-3xl font-bold text-green-700">
        FarmVerse
      </h1>
    </div>
  );
}

export default Logo;
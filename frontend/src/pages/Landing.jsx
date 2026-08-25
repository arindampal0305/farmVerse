import { useNavigate } from "react-router-dom";
import {
  Sprout,
  CloudSun,
  Brain,
  BarChart3,
  ArrowRight,
  Bot,
  Check
} from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-4 md:px-10 py-4 md:py-6">
        <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
          <Sprout className="text-green-600 w-6 h-6 md:w-8 md:h-8" />
          <h1 className="text-xl md:text-3xl font-bold text-green-700">
            FarmVerse
          </h1>
        </div>

        <div className="flex gap-2 md:gap-4 shrink-0">
          <button
            onClick={() => navigate("/login")}
            className="px-3 md:px-6 py-1.5 md:py-2 rounded-lg border border-green-600 text-green-700 hover:bg-green-50 transition text-sm md:text-base font-medium"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-3 md:px-6 py-1.5 md:py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition text-sm md:text-base font-medium"
          >
            Register
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-24 grid lg:grid-cols-2 gap-12 md:gap-16 items-center">

        <div>

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
            Smart Agriculture Platform
          </span>

          <h1 className="mt-6 md:mt-8 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">

            Revolutionizing

            <span className="text-green-600">
              {" "}Modern Farming
            </span>

          </h1>

          <p className="mt-6 md:mt-8 text-lg md:text-xl text-gray-600 leading-relaxed md:leading-9">

            FarmVerse helps farmers manage crops, monitor farms,
            receive AI recommendations, weather insights,
            and analytics, all from one intelligent dashboard.

          </p>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-5">

            <button
              onClick={() => navigate("/register")}
              className="w-full sm:w-auto justify-center bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl flex items-center gap-3 text-lg shadow-lg"
            >
              Get Started

              <ArrowRight size={22} />
            </button>

            <button
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full sm:w-auto justify-center border-2 border-green-600 text-green-700 px-8 py-4 rounded-xl hover:bg-green-50 transition-all font-semibold"
            >
              Learn More
            </button>

          </div>

        </div>

        <div className="flex justify-center">

          <img
            src="/hero.jpg"
            alt="Vector computerized smart farming illustration"
            className="rounded-3xl shadow-2xl border-4 border-white max-h-[500px] w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
          />

        </div>

      </section>

      {/* Highlight Banner */}
      <section className="bg-gradient-to-r from-green-800 to-emerald-950 text-white py-12 px-5 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          <div>
            <h3 className="text-2xl font-bold text-yellow-400">Advanced Tech</h3>
            <p className="mt-2 text-green-100 text-sm font-medium">Comprehensive Crop Health</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-yellow-400">Live Pricing</h3>
            <p className="mt-2 text-green-100 text-sm font-medium">Multiple Live Commodities</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-yellow-400">Live Weather</h3>
            <p className="mt-2 text-green-100 text-sm font-medium">Real-time Forecasts and Insights</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-yellow-400">Krishi AI</h3>
            <p className="mt-2 text-green-100 text-sm font-medium">24/7 Farming Guidance</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto py-16 md:py-24 px-5 md:px-10">

        <h2 className="text-3xl md:text-5xl font-bold text-center">
          Everything You Need
        </h2>

        <p className="text-center mt-4 text-gray-500 text-lg">
          Powerful tools designed for smart farming.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          <FeatureCard
            icon={<Sprout size={38} />}
            title="Crop Management"
            text="Track every crop with complete lifecycle management."
          />

          <FeatureCard
            icon={<CloudSun size={38} />}
            title="Weather"
            text="Live weather forecasts with farming insights."
          />

          <FeatureCard
            icon={<Brain size={38} />}
            title="AI Recommendation"
            text="Smart crop suggestions powered by AI."
          />

          <FeatureCard
            icon={<BarChart3 size={38} />}
            title="Analytics"
            text="Visualize production and monitor farm performance."
          />

        </div>

      </section>

      {/* Mandi Preview Section */}
      <section className="bg-green-50/50 border-t border-b border-green-100/50 py-16 md:py-24 px-5 md:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="space-y-6">
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm">
              Live Market Tracking
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
              Dynamic Mandi Price Tracker
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed md:leading-8">
              Maximize your farm's revenue with our keyless, client-side Mandi Price Tracker. Access real-time price ranges (Min/Max), average market rates (Modal prices), and weekly price fluctuations mapped directly to your local wholesale markets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border flex-1">
                <span className="text-xs text-gray-400 font-bold uppercase">Food Grains (Mandi Avg)</span>
                <p className="text-2xl font-bold text-gray-800 mt-1">₹2,300 <span className="text-xs font-normal text-gray-500">/ Quintal</span></p>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-2 inline-block">+1.2% Today</span>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border flex-1">
                <span className="text-xs text-gray-400 font-bold uppercase">Fresh Produce (Mandi Avg)</span>
                <p className="text-2xl font-bold text-gray-800 mt-1">₹2,300 <span className="text-xs font-normal text-gray-500">/ Quintal</span></p>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-2 inline-block">+3.5% Today</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              Live Mandi Price Analysis
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b">
                <div>
                  <h4 className="font-bold text-gray-700 text-sm">State Market A</h4>
                  <p className="text-xs text-gray-400">Commodity: Fresh Produce</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">₹1,800 - ₹2,800</p>
                  <p className="text-xs text-gray-400">per Quintal</p>
                </div>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <div>
                  <h4 className="font-bold text-gray-700 text-sm">State Market B</h4>
                  <p className="text-xs text-gray-400">Commodity: Food Grains</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">₹2,150 - ₹2,450</p>
                  <p className="text-xs text-gray-400">per Quintal</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-gray-700 text-sm">State Market C</h4>
                  <p className="text-xs text-gray-400">Commodity: Tubers and Roots</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">₹1,200 - ₹1,800</p>
                  <p className="text-xs text-gray-400">per Quintal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Krishi AI Chatbot Section */}
      <section className="max-w-7xl mx-auto py-16 md:py-24 px-5 md:px-10 grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 order-2 lg:order-1">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm">Krishi AI</h3>
                <p className="text-[10px] text-green-600 font-semibold">Online - Farming Expert</p>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-4 max-h-[300px] overflow-y-auto pr-2">
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl rounded-tl-none max-w-[85%] text-xs leading-relaxed">
                Hello. I am Krishi AI, your personalized agriculture assistant. How can I help you today?
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-green-600 text-white p-3 rounded-2xl rounded-tr-none max-w-[85%] text-xs leading-relaxed">
                My leaves have yellow spots and are curling. What should I do?
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl rounded-tl-none max-w-[85%] text-xs leading-relaxed">
                Yellow spots with curling leaves could indicate blight or a nutritional deficiency. I recommend checking soil moisture levels and applying an organic fungicide. Let me know your current soil type so I can recommend a fertilizer.
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <input type="text" placeholder="Ask Krishi AI something..." disabled className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex-1 text-xs outline-none text-gray-400" />
            <button disabled className="bg-green-600 text-white px-4 py-3 rounded-xl text-xs font-semibold hover:bg-green-700 transition">Send</button>
          </div>
        </div>

        <div className="space-y-6 order-1 lg:order-2">
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm inline-block">
              AI Assistant
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
              Meet Krishi AI
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed md:leading-8">
            Get instant solutions to your agricultural challenges with our built-in farming assistant. Krishi AI is customized to analyze your farm parameters and provide accurate recommendations for crop diseases, cultivation methods, and soil enrichment.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center">
                <Check size={14} className="text-green-600" />
              </div>
              <p className="text-gray-700 font-semibold text-sm">Instant disease diagnostics and solutions</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center">
                <Check size={14} className="text-green-600" />
              </div>
              <p className="text-gray-700 font-semibold text-sm">Personalized crop planning advice</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center">
                <Check size={14} className="text-green-600" />
              </div>
              <p className="text-gray-700 font-semibold text-sm">Available twenty four seven right inside your dashboard</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-gray-400 py-16 px-5 md:px-10 border-t border-slate-900 mt-16 md:mt-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">FarmVerse</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Empowering farmers with smart insights, dynamic market data, local weather forecasts, and artificial intelligence diagnostics.
            </p>
          </div>

          {/* Privacy & Terms */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Data Privacy and Terms</h3>
            <p className="text-xs leading-relaxed text-gray-400 text-justify">
              We prioritize your privacy. All registered farm profiles, crop logs, and locations are encrypted and processed solely to serve live market rates, localized recommendations, and crop planning guidance. We never sell your data to third parties. By registering, you agree to allow secure local analytics.
            </p>
          </div>

          {/* Developers */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Development Team</h3>
            <ul className="text-sm space-y-2 text-gray-400">
              <li>Ananya C.Y. (Frontend | UI/UX)</li>
              <li>Arindam Pal (Backend | UI/UX)</li>
              <li>Arfa Banu (Database Admin)</li>
              <li>Bhagyesh Patil (Backend)</li>
              <li>Shaik Kousar Bee (AI | Documentation)</li>
            </ul>
          </div>

          {/* Guidance */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Guidance & Mentorship</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Under the Guidance and mentorship of : <br />
              <span className="text-white font-semibold">Mr. Vinay Prashant</span>
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-900 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-medium gap-4">
          <p>Version 2.0.0</p>
          <p>Copyright &copy; 2026 FarmVerse. All rights reserved. Team A: Infosys Springboard.</p>
        </div>
      </footer>

    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 hover:-translate-y-2 hover:shadow-2xl transition duration-300">

      <div className="text-green-600">
        {icon}
      </div>

      <h3 className="mt-6 text-2xl font-bold">
        {title}
      </h3>

      <p className="mt-3 text-gray-600 leading-7">
        {text}
      </p>

    </div>
  );
}
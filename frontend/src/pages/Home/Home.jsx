import Navbar from "../../components/layout/Navbar";
import { useNavigate } from "react-router-dom";

import {
  FaArrowRight,
  FaRobot,
  FaCloudSun,
  FaTint,
  FaChartLine,
  FaSeedling,
  FaCheckCircle,
} from "react-icons/fa";

function Home() {

  const navigate = useNavigate();

  return (
    <>

      <Navbar />

      <main className="bg-slate-50">

        {/* Hero Section */}

        <section className="relative min-h-screen flex items-center justify-center pt-16">
          <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop" alt="Farm" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-slate-900/90"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>

          <div className="relative max-w-7xl mx-auto px-8 flex flex-col items-center text-center z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <span className="bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-300 font-semibold px-6 py-2.5 rounded-full shadow-lg flex items-center gap-2">
              <FaRobot className="animate-pulse" /> AI Powered Precision Agriculture
            </span>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mt-8 leading-tight tracking-tight drop-shadow-2xl">
              Smart Farming
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-teal-300">
                Made Intelligent
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mt-8 max-w-3xl leading-relaxed font-light drop-shadow-md">
              FarmVerse helps farmers monitor crops, predict weather, manage irrigation and make better farming decisions using advanced <span className="font-semibold text-white">Artificial Intelligence</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 mt-12 w-full justify-center">
              <button onClick={() => navigate("/register")} className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold px-10 py-5 rounded-2xl shadow-xl shadow-emerald-600/40 transition-all hover:-translate-y-1 flex items-center justify-center gap-3 text-lg" >
                Get Started Free
                <FaArrowRight />
              </button>

              <button onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })} className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-bold px-10 py-5 rounded-2xl hover:bg-white hover:text-green-900 transition-all text-lg shadow-xl" >
                Explore Features
              </button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="bg-slate-50 relative py-32 px-8 overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-300/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-300/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm bg-emerald-100 px-4 py-1.5 rounded-full">Features</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mt-6 tracking-tight">
                Everything Needed for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Smart Farming</span>
              </h2>
              <p className="text-gray-500 mt-6 text-xl leading-relaxed">
                Discover a suite of powerful tools designed to increase productivity and reduce environmental impact.
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-20"> {/* Feature Cards */} {[ { icon: FaRobot, color: "emerald", title: "AI Recommendation", desc: "Smart crop suggestions using Artificial Intelligence based on soil, weather and historical farm data." }, { icon: FaCloudSun, color: "amber", title: "Weather Forecast", desc: "Real-time weather updates including rainfall, humidity, wind speed and temperature." }, { icon: FaTint, color: "blue", title: "Smart Irrigation", desc: "Optimize irrigation schedules using AI to save water and improve crop productivity." }, { icon: FaChartLine, color: "purple", title: "Analytics", desc: "Interactive dashboards with crop reports, yield prediction and farm performance." }, { icon: FaSeedling, color: "green", title: "Sustainable Farming", desc: "Eco-friendly precision farming with better resource utilization and reduced wastage." }, { icon: FaArrowRight, color: "red", title: "Future Ready", desc: "Built for Artificial Intelligence, IoT devices and next-generation smart agriculture solutions." } ].map((feature, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-10 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 group">
                  <div className={`w-16 h-16 rounded-2xl bg-${feature.color}-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                    <feature.icon className={`text-3xl text-${feature.color}-600`} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-gray-500 leading-relaxed text-lg font-light">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics */}

        {/* Statistics */}
        <section className="relative bg-slate-900 py-32 px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-teal-900/40 to-slate-900 z-0"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center text-white mb-20 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Trusted by Modern Farmers</h2>
              <p className="mt-6 text-xl text-emerald-100/70 font-light">Making agriculture smarter and more sustainable every single day.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"> {[ { value: "500+", label: "Farmers" }, { value: "2500+", label: "Acres Managed" }, { value: "98%", label: "AI Accuracy" }, { value: "24/7", label: "Monitoring" } ].map((stat, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center text-white hover:bg-white/10 transition-colors">
                  <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-teal-200">
                    {stat.value}
                  </h1>
                  <p className="mt-4 text-xl font-medium tracking-wide text-gray-300">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-white py-32 px-8">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            {/* Image */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-400 to-teal-300 rounded-[2.5rem] blur-xl opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <img src="https://images.unsplash.com/photo-1592982537447-6f23f7380cf7?q=80&w=2070&auto=format&fit=crop" alt="Farmer using tablet" className="relative rounded-3xl shadow-2xl object-cover h-[600px] w-full" />
            </div>

            {/* Content */}
            <div>
              <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm bg-emerald-50 px-4 py-1.5 rounded-full">Platform</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mt-6 tracking-tight leading-tight">
                Empowering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Future</span> of Agriculture
              </h2>
              
              <p className="text-gray-600 mt-8 text-xl leading-relaxed font-light">
                FarmVerse combines Artificial Intelligence, weather forecasting, smart irrigation, farm analytics and precision agriculture into one powerful platform helping farmers increase productivity while reducing cost.
              </p>

              <div className="space-y-4 mt-10"> {[ "AI-Based Crop Recommendation Engine", "Real-Time Localized Weather Updates", "Smart Irrigation & Moisture Monitoring", "Interactive Business Analytics Dashboard" ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <FaCheckCircle className="text-emerald-600" />
                    </div>
                    <span className="font-semibold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call To Action */}
        <section className="bg-slate-50 py-32 px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 opacity-10"></div>
          
          <div className="max-w-5xl mx-auto relative z-10 bg-white rounded-[3rem] shadow-2xl p-16 md:p-24 text-center border border-white/50 backdrop-blur-sm overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
              Ready to Transform Farming?
            </h2>
            <p className="text-gray-500 text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
              Join thousands of farmers using FarmVerse to increase crop productivity with AI-powered precision agriculture today.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
              <button onClick={() => navigate("/register")} className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold px-10 py-5 rounded-2xl shadow-xl shadow-emerald-500/30 transition-all hover:-translate-y-1 text-lg" >
                Create Free Account
              </button>
              <button onClick={() => navigate("/login")} className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-10 py-5 rounded-2xl transition-all text-lg" >
                Sign In to Dashboard
              </button>
            </div>
          </div>
        </section>

      </main>

    </>

  );

}

export default Home;
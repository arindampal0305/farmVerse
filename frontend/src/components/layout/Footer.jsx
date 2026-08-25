import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaSeedling,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white">

      <div className="max-w-7xl mx-auto px-8 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Company */}

          <div>

            <div className="flex items-center gap-3">

              <div className="bg-green-600 p-3 rounded-xl">

                <FaSeedling className="text-2xl" />

              </div>

              <div>

                <h2 className="text-3xl font-bold">
                  FarmVerse
                </h2>

                <p className="text-gray-400 text-sm">
                  Precision Agriculture Platform
                </p>

              </div>

            </div>

            <p className="text-gray-400 mt-6 leading-8">

              FarmVerse empowers farmers with Artificial
              Intelligence, smart irrigation, weather
              forecasting, crop analytics and precision
              agriculture technologies.

            </p>

            <div className="flex gap-4 mt-8">

              <a href="#" className="w-11 h-11 rounded-full bg-green-600 flex items-center justify-center hover:bg-green-700 transition" >
                <FaFacebookF />
              </a>

              <a href="#" className="w-11 h-11 rounded-full bg-green-600 flex items-center justify-center hover:bg-green-700 transition" >
                <FaTwitter />
              </a>

              <a href="#" className="w-11 h-11 rounded-full bg-green-600 flex items-center justify-center hover:bg-green-700 transition" >
                <FaInstagram />
              </a>

              <a href="#" className="w-11 h-11 rounded-full bg-green-600 flex items-center justify-center hover:bg-green-700 transition" >
                <FaLinkedinIn />
              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-2xl font-semibold mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4 text-gray-400">

              <li className="hover:text-green-400 cursor-pointer transition">
                Home
              </li>

              <li className="hover:text-green-400 cursor-pointer transition">
                Dashboard
              </li>

              <li className="hover:text-green-400 cursor-pointer transition">
                Weather
              </li>

              <li className="hover:text-green-400 cursor-pointer transition">
                Analytics
              </li>

              <li className="hover:text-green-400 cursor-pointer transition">
                AI Recommendation
              </li>

            </ul>

          </div>

          {/* Services */}

          <div>

            <h3 className="text-2xl font-semibold mb-6">
              Services
            </h3>

            <ul className="space-y-4 text-gray-400">

              <li className="hover:text-green-400 cursor-pointer transition">
                Crop Monitoring
              </li>

              <li className="hover:text-green-400 cursor-pointer transition">
                Weather Forecast
              </li>

              <li className="hover:text-green-400 cursor-pointer transition">
                Smart Irrigation
              </li>

              <li className="hover:text-green-400 cursor-pointer transition">
                AI Prediction
              </li>

              <li className="hover:text-green-400 cursor-pointer transition">
                Farm Analytics
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-2xl font-semibold mb-6">
              Contact
            </h3>

            <div className="space-y-5 text-gray-400">

              <div className="flex gap-3">

                <FaMapMarkerAlt className="mt-1 text-green-500" />

                <span>
                  Bengaluru, Karnataka, India
                </span>

              </div>

              <div className="flex gap-3">

                <FaEnvelope className="mt-1 text-green-500" />

                <span>
                  support@farmverse.com
                </span>

              </div>

              <div className="flex gap-3">

                <FaPhone className="mt-1 text-green-500" />

                <span>
                  +91 9876543210
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-slate-700 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-500">

            © 2026 FarmVerse. All Rights Reserved.

          </p>

          <div className="flex gap-8 mt-5 md:mt-0 text-gray-500">

            <a href="#" className="hover:text-green-400 transition" >
              Privacy Policy
            </a>

            <a href="#" className="hover:text-green-400 transition" >
              Terms of Service
            </a>

            <a href="#" className="hover:text-green-400 transition" >
              Support
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
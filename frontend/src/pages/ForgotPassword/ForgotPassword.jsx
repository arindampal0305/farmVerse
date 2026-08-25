import { useState } from "react"; import { Link, useNavigate } from "react-router-dom"; import axios from "axios"; function ForgotPassword() { const navigate = useNavigate(); const [email, setEmail] = useState(""); const [otp, setOtp] = useState(""); const [newPassword, setNewPassword] = useState(""); const [confirmPassword, setConfirmPassword] = useState(""); const [otpSent, setOtpSent] = useState(false); const [loading, setLoading] = useState(false); const [message, setMessage] = useState(""); const sendOtp = async (e) => { e.preventDefault(); if (!email.trim()) { setMessage("Please enter your registered email."); return; } setLoading(true); setMessage(""); try { const res = await axios.post( "http://localhost:8080/api/auth/forgot-password", { email } ); setOtpSent(true); setMessage(res.data || "OTP sent successfully."); } catch (err) { setMessage(err.response?.data || "Failed to send OTP."); } finally { setLoading(false); } }; const resetPassword = async (e) => { e.preventDefault(); if (!otp.trim()) { setMessage("Please enter the OTP."); return; } if (!newPassword.trim()) { setMessage("Please enter a new password."); return; } if (newPassword !== confirmPassword) { setMessage("Passwords do not match."); return; } setLoading(true); setMessage(""); try { const res = await axios.post( "http://localhost:8080/api/auth/reset-password", { email, otp, newPassword, } ); setMessage(res.data || "Password reset successful!"); setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data || "Password reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-green-50 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">

        <h1 className="text-4xl font-bold text-green-700 text-center mb-3">
          Forgot Password
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Reset your password using the OTP sent to your registered email.
        </p>

        {!otpSent ? (
          <form onSubmit={sendOtp} className="space-y-5">

            <input type="email" placeholder="Registered Email" className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition" >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>

          </form>
        ) : (
          <form onSubmit={resetPassword} className="space-y-5">

            <input type="email" className="w-full border rounded-xl p-4 bg-gray-100" value={email} readOnly />

            <input type="text" placeholder="Enter OTP" className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500" value={otp} onChange={(e) => setOtp(e.target.value)} required />

            <input type="password" placeholder="New Password" className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />

            <input type="password" placeholder="Confirm New Password" className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

            <button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition" >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

          </form>
        )}

        {message && (
          <div className={`mt-6 p-4 rounded-xl text-center font-medium ${ message.toLowerCase().includes("success") ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700" }`} >
            {message}
          </div>
        )}

        <div className="text-center mt-8">
          <Link to="/login" className="text-green-700 hover:underline font-semibold" >
            ← Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;
import { useSearchParams, useNavigate } from "react-router-dom"; import { useState } from "react"; import axios from "axios"; function ResetPassword() { const [searchParams] = useSearchParams(); const token = searchParams.get("token"); const navigate = useNavigate(); const [password, setPassword] = useState(""); const [message, setMessage] = useState(""); const handleSubmit = async (e)=>{

        e.preventDefault();

        try{

            await axios.post(
                "http://localhost:8080/api/auth/reset-password",
                {
                    token,
                    newPassword:password
                }
            );

            alert("Password changed successfully.");

            navigate("/login");

        }catch(err){

            setMessage(
                err.response?.data || "Reset failed."
            );

        }

    };

    return(

        <div className="min-h-screen flex items-center justify-center bg-green-50">

            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

                <h2 className="text-3xl font-bold mb-6">
                    Reset Password
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5" >

                    <input type="password" placeholder="New Password" className="w-full border rounded-xl p-3" value={password} onChange={(e)=>setPassword(e.target.value)} />

                    <button className="w-full bg-green-600 text-white py-3 rounded-xl" >
                        Reset Password
                    </button>

                </form>

                {message &&
                    <p className="mt-5 text-red-600">
                        {message}
                    </p>
                }

            </div>

        </div>

    );

}

export default ResetPassword;
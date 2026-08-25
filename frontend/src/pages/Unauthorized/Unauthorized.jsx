import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">

      <h1 className="text-6xl font-bold text-red-600">
        403
      </h1>

      <h2 className="text-2xl font-semibold mt-4">
        Access Denied
      </h2>

      <p className="text-gray-600 mt-2 text-center">
        You don't have permission to access this page.
      </p>

      <Link to="/login" className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl" >
        Back to Login
      </Link>

    </div>
  );
}

export default Unauthorized;
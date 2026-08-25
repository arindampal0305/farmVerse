import { Navigate, useLocation } from "react-router-dom"; import { isAuthenticated, getCurrentUser, } from "../../services/auth"; function ProtectedRoute({ children, allowedRoles }) { const location = useLocation(); console.log("Current Route:", location.pathname); console.log("Authenticated:", isAuthenticated()); console.log("User:", getCurrentUser()); if (!isAuthenticated()) { console.log("Redirect -> Login");
    return <Navigate to="/login" replace />;
  }

  const user = getCurrentUser();

  if (!user) {
    console.log("User Missing");
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    console.log("Unauthorized Role:", user.role);
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;
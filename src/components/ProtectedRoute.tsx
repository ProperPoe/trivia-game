
import { Navigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div>Loading...</div>; // Show a loader while checking authentication status
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/" />; // Redirect to home if not authenticated
  }

  return <>{children}</>; // Render the protected content if authenticated
};

export default ProtectedRoute;

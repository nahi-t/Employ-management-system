import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'



export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

 
  if (loading) return <div>Loading...</div>;

  // Redirect if not authenticated
  if (!user) {navigate('/login');}

  return children; 
}

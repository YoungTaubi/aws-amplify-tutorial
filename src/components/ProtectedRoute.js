import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth';

export function ProtectedRoute({ children }) {

  const { isLoggedIn, isLoading } = useContext(AuthContext)
  if (isLoading) return <p>Is loading...</p>
  return isLoggedIn ? children : <Navigate to='/login' replace />
}

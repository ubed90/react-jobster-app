import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../Store'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

interface ProtectedRouteProps {
  children: React.ReactElement
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.user)

  if (!user) {
    toast.error('Please Login First')
    return <Navigate to="/landing" />
  }

  return children
}

export default ProtectedRoute

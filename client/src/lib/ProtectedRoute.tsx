'use client'

import { useAppSelector } from '@/redux/store'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useEffect, useState } from 'react'

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
  redirectTo?: string;
}

function ProtectedRoute({ 
  children, 
  fallback = <div>Loading...</div>,
  redirectTo = '/' 
}: ProtectedRouteProps) {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Small delay to prevent flash during initial load
    const checkAuth = () => {
      if (!isAuthenticated) {
        router.push(redirectTo)
      } else {
        setIsChecking(false)
      }
    }

    // Use a small timeout to handle initial render
    const timeoutId = setTimeout(checkAuth, 100)

    return () => clearTimeout(timeoutId)
  }, [isAuthenticated, router, redirectTo])

  // Don't render children while checking or if not authenticated
  if (isChecking || !isAuthenticated) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

export default ProtectedRoute
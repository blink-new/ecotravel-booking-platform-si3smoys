import React, { useState, useEffect, ReactNode } from 'react'
import { blink } from '../blink/client'
import { User } from '../types'
import { AuthContext, AuthContextType } from './auth-context'

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  })

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setAuthState({
        user: state.user ? {
          id: state.user.id,
          email: state.user.email,
          displayName: state.user.displayName || state.user.email,
          role: (state.user.role as 'customer' | 'consultant' | 'admin') || 'customer',
          avatar: state.user.avatar,
          createdAt: state.user.createdAt || new Date().toISOString(),
          updatedAt: state.user.updatedAt || new Date().toISOString()
        } : null,
        isLoading: state.isLoading,
        isAuthenticated: state.isAuthenticated
      })
    })

    return unsubscribe
  }, [])

  const login = (redirectUrl?: string) => {
    blink.auth.login(redirectUrl)
  }

  const logout = (redirectUrl?: string) => {
    blink.auth.logout(redirectUrl)
  }

  const updateProfile = async (data: Partial<User>) => {
    try {
      await blink.auth.updateMe(data)
      // The auth state will be updated automatically via onAuthStateChanged
    } catch (error) {
      console.error('Failed to update profile:', error)
      throw error
    }
  }

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
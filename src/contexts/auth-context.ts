import { createContext } from 'react'
import { User } from '../types'

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface AuthContextType extends AuthState {
  login: (redirectUrl?: string) => void
  logout: (redirectUrl?: string) => void
  updateProfile: (data: Partial<User>) => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
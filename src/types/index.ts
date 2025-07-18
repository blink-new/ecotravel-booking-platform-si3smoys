// User Types
export interface User {
  id: string
  email: string
  displayName?: string
  role: 'customer' | 'consultant' | 'admin'
  avatar?: string
  createdAt: string
  updatedAt: string
}

// Trip Types
export interface Trip {
  id: string
  userId: string
  title: string
  destination: string
  startDate: string
  endDate: string
  status: 'draft' | 'requested' | 'quoted' | 'booked' | 'completed' | 'cancelled'
  budget: number
  travelers: number
  preferences: TripPreferences
  createdAt: string
  updatedAt: string
}

export interface TripPreferences {
  tripType: string[]
  accommodationLevel: 'budget' | 'mid-range' | 'luxury'
  activities: string[]
  transportation: string[]
  specialRequests?: string
}

// Message Types
export interface Message {
  id: string
  tripId: string
  senderId: string
  senderName: string
  senderRole: 'customer' | 'consultant'
  content: string
  attachments?: MessageAttachment[]
  timestamp: string
  readBy: string[]
}

export interface MessageAttachment {
  id: string
  name: string
  url: string
  type: string
  size: number
}

// Itinerary Types
export interface Itinerary {
  id: string
  tripId: string
  title: string
  description: string
  days: ItineraryDay[]
  totalCost: number
  createdAt: string
  updatedAt: string
}

export interface ItineraryDay {
  day: number
  date: string
  location: string
  accommodation?: Accommodation
  activities: Activity[]
  meals: Meal[]
  transportation?: Transportation
}

export interface Accommodation {
  name: string
  type: string
  rating: number
  description: string
  images: string[]
  amenities: string[]
  cost: number
}

export interface Activity {
  name: string
  description: string
  duration: string
  cost: number
  images: string[]
  included: boolean
}

export interface Meal {
  type: 'breakfast' | 'lunch' | 'dinner'
  venue: string
  description: string
  cost: number
  included: boolean
}

export interface Transportation {
  type: string
  from: string
  to: string
  duration: string
  cost: number
  description: string
}

// Payment Types
export interface Payment {
  id: string
  tripId: string
  userId: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  method: string
  transactionId?: string
  createdAt: string
  updatedAt: string
}

// Destination Types
export interface Destination {
  id: string
  name: string
  country: string
  region: string
  description: string
  highlights: string[]
  bestTime: string
  images: string[]
  activities: string[]
  averageCost: number
  coordinates: {
    lat: number
    lng: number
  }
}

// Analytics Types
export interface AnalyticsData {
  totalTrips: number
  totalRevenue: number
  conversionRate: number
  averageBookingValue: number
  popularDestinations: { name: string; count: number }[]
  monthlyBookings: { month: string; bookings: number; revenue: number }[]
  customerSatisfaction: number
}

// Form Types
export interface TripRequestForm {
  destination: string
  startDate: string
  endDate: string
  flexibleDates: boolean
  travelers: {
    adults: number
    children: number
  }
  budget: {
    min: number
    max: number
    currency: string
  }
  preferences: TripPreferences
  additionalInfo: string
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  type: 'trip_update' | 'message' | 'payment' | 'system'
  title: string
  message: string
  read: boolean
  actionUrl?: string
  createdAt: string
}
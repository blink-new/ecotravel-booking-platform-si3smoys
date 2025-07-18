import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Progress } from '../components/ui/progress'
import { 
  Plus, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Star,
  ArrowRight,
  Plane,
  Camera,
  Heart,
  Settings,
  Bell,
  TrendingUp,
  Globe,
  CheckCircle,
  AlertCircle,
  DollarSign
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { blink } from '../blink/client'

interface TripRequest {
  id: string
  title: string
  destination_countries: string
  start_date: string | null
  end_date: string | null
  status: string
  traveler_count_adults: number
  traveler_count_children: number
  budget_max: number | null
  created_at: string
  updated_at: string
}

interface Booking {
  id: string
  booking_reference: string
  total_amount: number
  currency: string
  payment_status: string
  booking_status: string
  created_at: string
}

const CustomerDashboard = () => {
  const { user } = useAuth()
  const [tripRequests, setTripRequests] = useState<TripRequest[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalTrips: 0,
    activeTrips: 0,
    completedTrips: 0,
    totalSpent: 0
  })

  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true)
      
      // Load trip requests
      const tripsData = await blink.db.tripRequests.list({
        where: { userId: user!.id },
        orderBy: { createdAt: 'desc' },
        limit: 10
      })
      setTripRequests(tripsData)

      // Load bookings
      const bookingsData = await blink.db.bookings.list({
        where: { userId: user!.id },
        orderBy: { createdAt: 'desc' },
        limit: 5
      })
      setBookings(bookingsData)

      // Calculate stats
      const activeTrips = tripsData.filter(trip => 
        ['submitted', 'in_review', 'quoted', 'accepted'].includes(trip.status)
      ).length
      
      const completedTrips = tripsData.filter(trip => 
        trip.status === 'completed'
      ).length

      const totalSpent = bookingsData
        .filter(booking => booking.payment_status === 'paid')
        .reduce((sum, booking) => sum + booking.total_amount, 0)

      setStats({
        totalTrips: tripsData.length,
        activeTrips,
        completedTrips,
        totalSpent
      })

    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (user?.id) {
      loadDashboardData()
    }
  }, [user, loadDashboardData])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-700'
      case 'submitted': return 'bg-blue-100 text-blue-700'
      case 'in_review': return 'bg-yellow-100 text-yellow-700'
      case 'quoted': return 'bg-purple-100 text-purple-700'
      case 'accepted': return 'bg-green-100 text-green-700'
      case 'booked': return 'bg-emerald-100 text-emerald-700'
      case 'completed': return 'bg-gray-100 text-gray-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <Clock className="h-4 w-4" />
      case 'submitted': return <ArrowRight className="h-4 w-4" />
      case 'in_review': return <AlertCircle className="h-4 w-4" />
      case 'quoted': return <DollarSign className="h-4 w-4" />
      case 'accepted': return <CheckCircle className="h-4 w-4" />
      case 'booked': return <Plane className="h-4 w-4" />
      case 'completed': return <Star className="h-4 w-4" />
      case 'cancelled': return <AlertCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const parseDestinations = (destinationsJson: string) => {
    try {
      const destinations = JSON.parse(destinationsJson)
      return Array.isArray(destinations) ? destinations.join(', ') : destinationsJson
    } catch {
      return destinationsJson
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 h-96 bg-gray-200 rounded-2xl"></div>
              <div className="h-96 bg-gray-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Avatar className="h-16 w-16 ring-4 ring-blue-100">
              <AvatarImage src={user?.profileImageUrl} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-lg font-semibold">
                {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.displayName || 'Traveler'}!
              </h1>
              <p className="text-gray-600">Ready for your next African adventure?</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="hover-lift">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm" className="hover-lift">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 mb-1">Total Trips</p>
                  <p className="text-3xl font-bold text-blue-900">{stats.totalTrips}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Globe className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100 hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 mb-1">Active Trips</p>
                  <p className="text-3xl font-bold text-green-900">{stats.activeTrips}</p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100 hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 mb-1">Completed</p>
                  <p className="text-3xl font-bold text-purple-900">{stats.completedTrips}</p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-50 to-orange-100 hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600 mb-1">Total Spent</p>
                  <p className="text-3xl font-bold text-orange-900">{formatCurrency(stats.totalSpent)}</p>
                </div>
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trip Requests */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-gray-900">Your Trip Requests</CardTitle>
                  <Link to="/trips/new">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover-shimmer">
                      <Plus className="h-4 w-4 mr-2" />
                      New Trip Request
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {tripRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Plane className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No trips yet</h3>
                    <p className="text-gray-600 mb-6">Start planning your first African adventure!</p>
                    <Link to="/trips/new">
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Plan Your First Trip
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {tripRequests.map((trip) => (
                      <div key={trip.id} className="border border-gray-200 rounded-2xl p-6 hover:border-blue-300 transition-all duration-300 hover:shadow-md">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{trip.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {parseDestinations(trip.destination_countries)}
                              </div>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                {trip.traveler_count_adults + trip.traveler_count_children} travelers
                              </div>
                              {trip.start_date && (
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {formatDate(trip.start_date)}
                                </div>
                              )}
                            </div>
                          </div>
                          <Badge className={`${getStatusColor(trip.status)} flex items-center space-x-1`}>
                            {getStatusIcon(trip.status)}
                            <span className="capitalize">{trip.status.replace('_', ' ')}</span>
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            Created {formatDate(trip.created_at)}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" className="hover-lift">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Chat
                            </Button>
                            <Button variant="outline" size="sm" className="hover-lift">
                              View Details
                              <ArrowRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Recent Activity */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link to="/trips/new" className="block">
                  <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12 hover-shimmer">
                    <Plus className="h-5 w-5 mr-3" />
                    Request New Trip
                  </Button>
                </Link>
                
                <Button variant="outline" className="w-full justify-start h-12 hover-lift">
                  <MessageCircle className="h-5 w-5 mr-3" />
                  View Messages
                </Button>
                
                <Button variant="outline" className="w-full justify-start h-12 hover-lift">
                  <Calendar className="h-5 w-5 mr-3" />
                  My Bookings
                </Button>
                
                <Button variant="outline" className="w-full justify-start h-12 hover-lift">
                  <Camera className="h-5 w-5 mr-3" />
                  Trip Gallery
                </Button>
              </CardContent>
            </Card>

            {/* Recent Bookings */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Heart className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600 text-sm">No bookings yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">#{booking.booking_reference}</span>
                          <Badge className={booking.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                            {booking.payment_status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          {formatCurrency(booking.total_amount, booking.currency)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatDate(booking.created_at)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerDashboard
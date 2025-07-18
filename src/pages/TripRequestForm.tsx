import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Calendar } from '../components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover'
import { Checkbox } from '../components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group'
import { Slider } from '../components/ui/slider'
import { Progress } from '../components/ui/progress'
import { 
  ArrowLeft,
  ArrowRight,
  Calendar as CalendarIcon,
  MapPin,
  Users,
  DollarSign,
  Heart,
  Mountain,
  Camera,
  Utensils,
  Car,
  Plane,
  Hotel,
  Compass,
  Star,
  CheckCircle,
  Save,
  Send,
  Globe,
  TreePine,
  Waves,
  Sun,
  Binoculars,
  Coffee
} from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '../lib/utils'
import { useAuth } from '../hooks/useAuth'
import { blink } from '../blink/client'

interface Destination {
  id: string
  name: string
  country: string
  description: string
  image_url: string
  highlights: string[]
  popular_activities: string[]
}

interface ActivityType {
  id: string
  name: string
  category: string
  icon: string
  description: string
}

interface FormData {
  title: string
  destination_countries: string[]
  start_date: Date | null
  end_date: Date | null
  flexible_dates: boolean
  traveler_count_adults: number
  traveler_count_children: number
  trip_type: string
  accommodation_level: string
  budget_min: number
  budget_max: number
  activity_preferences: string[]
  transportation_preferences: string
  special_requests: string
}

const TripRequestForm = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [activityTypes, setActivityTypes] = useState<ActivityType[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    title: '',
    destination_countries: [],
    start_date: null,
    end_date: null,
    flexible_dates: false,
    traveler_count_adults: 2,
    traveler_count_children: 0,
    trip_type: '',
    accommodation_level: '',
    budget_min: 1000,
    budget_max: 5000,
    activity_preferences: [],
    transportation_preferences: '',
    special_requests: ''
  })

  const totalSteps = 6
  const progress = (currentStep / totalSteps) * 100

  useEffect(() => {
    loadReferenceData()
  }, [])

  const loadReferenceData = async () => {
    try {
      setLoading(true)
      
      // Load destinations
      const destinationsData = await blink.db.destinations.list({
        where: { isFeatured: "1" },
        orderBy: { name: 'asc' }
      })
      setDestinations(destinationsData)

      // Load activity types
      const activitiesData = await blink.db.activityTypes.list({
        orderBy: { category: 'asc' }
      })
      setActivityTypes(activitiesData)

    } catch (error) {
      console.error('Error loading reference data:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const saveDraft = async () => {
    if (!user?.id) return

    try {
      setSaving(true)
      
      const tripData = {
        id: `trip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId: user.id,
        title: formData.title || `Trip to ${formData.destination_countries.join(', ')}`,
        destinationCountries: JSON.stringify(formData.destination_countries),
        startDate: formData.start_date?.toISOString().split('T')[0] || null,
        endDate: formData.end_date?.toISOString().split('T')[0] || null,
        flexibleDates: formData.flexible_dates ? "1" : "0",
        travelerCountAdults: formData.traveler_count_adults,
        travelerCountChildren: formData.traveler_count_children,
        tripType: formData.trip_type,
        accommodationLevel: formData.accommodation_level,
        budgetMin: formData.budget_min,
        budgetMax: formData.budget_max,
        activityPreferences: JSON.stringify(formData.activity_preferences),
        transportationPreferences: formData.transportation_preferences,
        specialRequests: formData.special_requests,
        status: 'draft'
      }

      await blink.db.tripRequests.create(tripData)
      
      // Show success message and redirect
      navigate('/dashboard')
    } catch (error) {
      console.error('Error saving draft:', error)
    } finally {
      setSaving(false)
    }
  }

  const submitRequest = async () => {
    if (!user?.id) return

    try {
      setSaving(true)
      
      const tripData = {
        id: `trip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId: user.id,
        title: formData.title || `Trip to ${formData.destination_countries.join(', ')}`,
        destinationCountries: JSON.stringify(formData.destination_countries),
        startDate: formData.start_date?.toISOString().split('T')[0] || null,
        endDate: formData.end_date?.toISOString().split('T')[0] || null,
        flexibleDates: formData.flexible_dates ? "1" : "0",
        travelerCountAdults: formData.traveler_count_adults,
        travelerCountChildren: formData.traveler_count_children,
        tripType: formData.trip_type,
        accommodationLevel: formData.accommodation_level,
        budgetMin: formData.budget_min,
        budgetMax: formData.budget_max,
        activityPreferences: JSON.stringify(formData.activity_preferences),
        transportationPreferences: formData.transportation_preferences,
        specialRequests: formData.special_requests,
        status: 'submitted'
      }

      await blink.db.tripRequests.create(tripData)
      
      // Show success message and redirect
      navigate('/dashboard')
    } catch (error) {
      console.error('Error submitting request:', error)
    } finally {
      setSaving(false)
    }
  }

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      binoculars: Binoculars,
      truck: Car,
      hiking: Mountain,
      users: Users,
      camera: Camera,
      circle: Sun,
      wine: Coffee,
      mountain: Mountain,
      waves: Waves,
      bird: TreePine
    }
    return icons[iconName] || Compass
  }

  const tripTypes = [
    { id: 'safari', name: 'Safari Adventure', icon: Binoculars, description: 'Wildlife viewing and game drives' },
    { id: 'cultural', name: 'Cultural Experience', icon: Users, description: 'Local communities and traditions' },
    { id: 'adventure', name: 'Adventure & Hiking', icon: Mountain, description: 'Trekking and outdoor activities' },
    { id: 'luxury', name: 'Luxury Escape', icon: Star, description: 'Premium accommodations and services' },
    { id: 'family', name: 'Family Friendly', icon: Heart, description: 'Perfect for traveling with children' },
    { id: 'photography', name: 'Photography Tour', icon: Camera, description: 'Specialized for photographers' }
  ]

  const accommodationLevels = [
    { id: 'budget', name: 'Budget', description: 'Comfortable and affordable', price: '$50-150/night' },
    { id: 'mid-range', name: 'Mid-Range', description: 'Good comfort and amenities', price: '$150-400/night' },
    { id: 'luxury', name: 'Luxury', description: 'Premium accommodations', price: '$400-1000/night' },
    { id: 'ultra-luxury', name: 'Ultra Luxury', description: 'Exclusive and exceptional', price: '$1000+/night' }
  ]

  const transportationOptions = [
    { id: 'road', name: 'Road Transfer', icon: Car, description: 'Comfortable road transportation' },
    { id: 'air', name: 'Domestic Flights', icon: Plane, description: 'Quick air transfers between destinations' },
    { id: 'mixed', name: 'Mixed Transport', icon: Compass, description: 'Combination of road and air travel' }
  ]

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Destinations</h2>
              <p className="text-gray-600 text-lg">Select the African countries you'd like to explore</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {destinations.map((destination) => {
                const isSelected = formData.destination_countries.includes(destination.country)
                return (
                  <Card 
                    key={destination.id} 
                    className={cn(
                      "cursor-pointer transition-all duration-300 hover:shadow-xl border-2",
                      isSelected 
                        ? "border-blue-500 bg-blue-50 shadow-lg" 
                        : "border-gray-200 hover:border-blue-300"
                    )}
                    onClick={() => {
                      const countries = isSelected
                        ? formData.destination_countries.filter(c => c !== destination.country)
                        : [...formData.destination_countries, destination.country]
                      updateFormData({ destination_countries: countries })
                    }}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={destination.image_url} 
                        alt={destination.name}
                        className="w-full h-48 object-cover"
                      />
                      {isSelected && (
                        <div className="absolute top-4 right-4">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{destination.name}</h3>
                      <p className="text-gray-600 mb-4">{destination.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {JSON.parse(destination.highlights).slice(0, 3).map((highlight: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Travel Dates</h2>
              <p className="text-gray-600 text-lg">When would you like to travel?</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="flexible"
                  checked={formData.flexible_dates}
                  onCheckedChange={(checked) => updateFormData({ flexible_dates: checked as boolean })}
                />
                <Label htmlFor="flexible" className="text-sm font-medium">
                  I have flexible travel dates
                </Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Departure Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal h-12",
                          !formData.start_date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.start_date ? format(formData.start_date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.start_date || undefined}
                        onSelect={(date) => updateFormData({ start_date: date || null })}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Return Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal h-12",
                          !formData.end_date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.end_date ? format(formData.end_date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.end_date || undefined}
                        onSelect={(date) => updateFormData({ end_date: date || null })}
                        disabled={(date) => date < (formData.start_date || new Date())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Adults</Label>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateFormData({ 
                        traveler_count_adults: Math.max(1, formData.traveler_count_adults - 1) 
                      })}
                      disabled={formData.traveler_count_adults <= 1}
                    >
                      -
                    </Button>
                    <span className="text-2xl font-semibold w-12 text-center">
                      {formData.traveler_count_adults}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateFormData({ 
                        traveler_count_adults: formData.traveler_count_adults + 1 
                      })}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Children</Label>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateFormData({ 
                        traveler_count_children: Math.max(0, formData.traveler_count_children - 1) 
                      })}
                      disabled={formData.traveler_count_children <= 0}
                    >
                      -
                    </Button>
                    <span className="text-2xl font-semibold w-12 text-center">
                      {formData.traveler_count_children}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateFormData({ 
                        traveler_count_children: formData.traveler_count_children + 1 
                      })}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Trip Style</h2>
              <p className="text-gray-600 text-lg">What type of experience are you looking for?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tripTypes.map((type) => {
                const IconComponent = type.icon
                const isSelected = formData.trip_type === type.id
                return (
                  <Card 
                    key={type.id}
                    className={cn(
                      "cursor-pointer transition-all duration-300 hover:shadow-xl border-2 text-center",
                      isSelected 
                        ? "border-blue-500 bg-blue-50 shadow-lg" 
                        : "border-gray-200 hover:border-blue-300"
                    )}
                    onClick={() => updateFormData({ trip_type: type.id })}
                  >
                    <CardContent className="p-8">
                      <div className={cn(
                        "w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center",
                        isSelected ? "bg-blue-500" : "bg-gray-100"
                      )}>
                        <IconComponent className={cn(
                          "h-8 w-8",
                          isSelected ? "text-white" : "text-gray-600"
                        )} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{type.name}</h3>
                      <p className="text-gray-600 text-sm">{type.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Accommodation Level</h2>
              <p className="text-gray-600 text-lg">Choose your preferred accommodation standard</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {accommodationLevels.map((level) => {
                const isSelected = formData.accommodation_level === level.id
                return (
                  <Card 
                    key={level.id}
                    className={cn(
                      "cursor-pointer transition-all duration-300 hover:shadow-lg border-2",
                      isSelected 
                        ? "border-blue-500 bg-blue-50 shadow-lg" 
                        : "border-gray-200 hover:border-blue-300"
                    )}
                    onClick={() => updateFormData({ accommodation_level: level.id })}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center",
                            isSelected ? "bg-blue-500" : "bg-gray-100"
                          )}>
                            <Hotel className={cn(
                              "h-6 w-6",
                              isSelected ? "text-white" : "text-gray-600"
                            )} />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{level.name}</h3>
                            <p className="text-gray-600">{level.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-gray-900">{level.price}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Budget & Preferences</h2>
              <p className="text-gray-600 text-lg">Help us tailor your perfect trip</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-8">
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Budget Range (USD per person)</Label>
                <div className="px-4">
                  <Slider
                    value={[formData.budget_min, formData.budget_max]}
                    onValueChange={([min, max]) => updateFormData({ budget_min: min, budget_max: max })}
                    max={15000}
                    min={500}
                    step={250}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>${formData.budget_min.toLocaleString()}</span>
                    <span>${formData.budget_max.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-semibold">Transportation Preference</Label>
                <RadioGroup 
                  value={formData.transportation_preferences} 
                  onValueChange={(value) => updateFormData({ transportation_preferences: value })}
                >
                  {transportationOptions.map((option) => {
                    const IconComponent = option.icon
                    return (
                      <div key={option.id} className="flex items-center space-x-3 p-4 border rounded-xl hover:bg-gray-50">
                        <RadioGroupItem value={option.id} id={option.id} />
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <IconComponent className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <Label htmlFor={option.id} className="font-medium cursor-pointer">
                              {option.name}
                            </Label>
                            <p className="text-sm text-gray-600">{option.description}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-semibold">Activity Preferences</Label>
                <div className="grid grid-cols-2 gap-4">
                  {activityTypes.map((activity) => {
                    const IconComponent = getIconComponent(activity.icon)
                    const isSelected = formData.activity_preferences.includes(activity.id)
                    return (
                      <div 
                        key={activity.id}
                        className={cn(
                          "flex items-center space-x-3 p-4 border rounded-xl cursor-pointer transition-all",
                          isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"
                        )}
                        onClick={() => {
                          const activities = isSelected
                            ? formData.activity_preferences.filter(a => a !== activity.id)
                            : [...formData.activity_preferences, activity.id]
                          updateFormData({ activity_preferences: activities })
                        }}
                      >
                        <Checkbox 
                          checked={isSelected}
                          onChange={() => {}}
                        />
                        <div className="flex items-center space-x-2 flex-1">
                          <IconComponent className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium">{activity.name}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Final Details</h2>
              <p className="text-gray-600 text-lg">Add any special requests or requirements</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Trip Title (Optional)</Label>
                <Input
                  id="title"
                  placeholder="Give your trip a memorable name"
                  value={formData.title}
                  onChange={(e) => updateFormData({ title: e.target.value })}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="special-requests">Special Requests</Label>
                <Textarea
                  id="special-requests"
                  placeholder="Tell us about any dietary restrictions, accessibility needs, special occasions, or other requirements..."
                  value={formData.special_requests}
                  onChange={(e) => updateFormData({ special_requests: e.target.value })}
                  rows={6}
                  className="resize-none"
                />
              </div>

              {/* Trip Summary */}
              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-900">Trip Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-blue-800">Destinations:</span>
                      <p className="text-blue-700">{formData.destination_countries.join(', ') || 'Not selected'}</p>
                    </div>
                    <div>
                      <span className="font-medium text-blue-800">Travelers:</span>
                      <p className="text-blue-700">
                        {formData.traveler_count_adults} adults
                        {formData.traveler_count_children > 0 && `, ${formData.traveler_count_children} children`}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-blue-800">Trip Type:</span>
                      <p className="text-blue-700 capitalize">{formData.trip_type.replace('-', ' ') || 'Not selected'}</p>
                    </div>
                    <div>
                      <span className="font-medium text-blue-800">Accommodation:</span>
                      <p className="text-blue-700 capitalize">{formData.accommodation_level.replace('-', ' ') || 'Not selected'}</p>
                    </div>
                    <div>
                      <span className="font-medium text-blue-800">Budget:</span>
                      <p className="text-blue-700">${formData.budget_min.toLocaleString()} - ${formData.budget_max.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="font-medium text-blue-800">Dates:</span>
                      <p className="text-blue-700">
                        {formData.start_date && formData.end_date 
                          ? `${format(formData.start_date, 'MMM d')} - ${format(formData.end_date, 'MMM d, yyyy')}`
                          : formData.flexible_dates ? 'Flexible dates' : 'Not selected'
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
            <div className="h-64 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Plan Your African Adventure</h1>
          <p className="text-gray-600 text-lg">Let's create your perfect tailor-made journey</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm font-medium text-gray-600">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Content */}
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={saveDraft}
              disabled={saving}
              className="flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>{saving ? 'Saving...' : 'Save Draft'}</span>
            </Button>

            {currentStep === totalSteps ? (
              <Button
                onClick={submitRequest}
                disabled={saving}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>{saving ? 'Submitting...' : 'Submit Request'}</span>
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center space-x-2"
              >
                <span>Next</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripRequestForm
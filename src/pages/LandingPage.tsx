import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { 
  MapPin, 
  Star, 
  Users, 
  Shield, 
  Compass, 
  Heart,
  ArrowRight,
  Play,
  CheckCircle,
  Globe,
  Camera,
  Mountain,
  Waves,
  TreePine,
  Sun,
  Menu,
  X,
  Sparkles,
  Award,
  Clock,
  Phone,
  Mail,
  Calendar,
  Zap,
  TrendingUp
} from 'lucide-react'

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    const elements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale, .scroll-animate-rotate')
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const destinations = [
    {
      name: "Kenya Safari",
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=600&fit=crop",
      description: "Witness the Great Migration in Maasai Mara",
      price: "From $2,850",
      duration: "7 days",
      rating: 4.9,
      reviews: 234,
      highlights: ["Big Five", "Migration", "Luxury Camps"]
    },
    {
      name: "Tanzania Adventure",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
      description: "Climb Kilimanjaro & explore Serengeti",
      price: "From $3,200",
      duration: "10 days",
      rating: 4.8,
      reviews: 189,
      highlights: ["Kilimanjaro", "Serengeti", "Ngorongoro"]
    },
    {
      name: "South Africa Luxury",
      image: "https://images.unsplash.com/photo-1484318571209-661cf29a69ea?w=800&h=600&fit=crop",
      description: "Wine country & luxury safari experience",
      price: "From $4,500",
      duration: "12 days",
      rating: 5.0,
      reviews: 156,
      highlights: ["Wine Tours", "Cape Town", "Luxury Lodges"]
    },
    {
      name: "Botswana Wilderness",
      image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&h=600&fit=crop",
      description: "Okavango Delta & Chobe National Park",
      price: "From $3,800",
      duration: "9 days",
      rating: 4.9,
      reviews: 98,
      highlights: ["Okavango Delta", "Mokoro Trips", "Wildlife"]
    }
  ]

  const services = [
    {
      icon: Compass,
      title: "Tailor-Made Itineraries",
      description: "Every journey is crafted specifically for you, based on your interests, budget, and travel style.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Local Expertise",
      description: "Our team of local guides and experts ensure authentic experiences and insider access.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "24/7 Support",
      description: "Round-the-clock assistance throughout your journey for complete peace of mind.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Heart,
      title: "Sustainable Travel",
      description: "We're committed to responsible tourism that benefits local communities and wildlife.",
      color: "from-orange-500 to-red-500"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      text: "The most incredible safari experience! Every detail was perfectly planned and the guides were exceptional. EcoTravel Boutique made our dream trip a reality.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      trip: "Kenya Safari Adventure"
    },
    {
      name: "Michael Chen",
      location: "London, UK", 
      rating: 5,
      text: "EcoTravel Boutique exceeded all expectations. The personalized service made our honeymoon unforgettable. Highly recommend!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      trip: "Tanzania Luxury Tour"
    },
    {
      name: "Emma Rodriguez",
      location: "Sydney, Australia",
      rating: 5,
      text: "Professional, knowledgeable, and passionate about conservation. The perfect blend of adventure and luxury.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      trip: "South Africa Wine & Safari"
    }
  ]

  const stats = [
    { number: "2000+", label: "Happy Travelers", icon: Users },
    { number: "15+", label: "Countries", icon: Globe },
    { number: "4.9", label: "Average Rating", icon: Star },
    { number: "14", label: "Years Experience", icon: Award }
  ]

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center hover-glow-blue">
                <Compass className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                EcoTravel Boutique
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#destinations" className={`${scrollY > 50 ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-300'} transition-colors font-medium hover-scale`}>Destinations</a>
              <a href="#services" className={`${scrollY > 50 ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-300'} transition-colors font-medium hover-scale`}>Services</a>
              <a href="#about" className={`${scrollY > 50 ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-300'} transition-colors font-medium hover-scale`}>About</a>
              <a href="#contact" className={`${scrollY > 50 ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-300'} transition-colors font-medium hover-scale`}>Contact</a>
              <Link to="/roadmap">
                <Button variant="outline" size="sm" className="border-gray-300 hover:border-blue-600 hover:text-blue-600 hover-lift">
                  Roadmap
                </Button>
              </Link>
              <Link to="/developer-roadmap">
                <Button variant="outline" size="sm" className="border-purple-300 hover:border-purple-600 hover:text-purple-600 hover-lift">
                  Dev Roadmap
                </Button>
              </Link>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover-shimmer">
                Plan Your Trip
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`${scrollY > 50 ? 'text-gray-700' : 'text-white'} hover-scale`}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden ${scrollY > 50 ? 'bg-white/95' : 'bg-black/90'} backdrop-blur-xl border-t ${scrollY > 50 ? 'border-gray-100' : 'border-white/20'}`}>
            <div className="px-4 pt-2 pb-3 space-y-1">
              <a href="#destinations" className={`block px-3 py-2 ${scrollY > 50 ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-300'} font-medium`}>Destinations</a>
              <a href="#services" className={`block px-3 py-2 ${scrollY > 50 ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-300'} font-medium`}>Services</a>
              <a href="#about" className={`block px-3 py-2 ${scrollY > 50 ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-300'} font-medium`}>About</a>
              <a href="#contact" className={`block px-3 py-2 ${scrollY > 50 ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-300'} font-medium`}>Contact</a>
              <Link to="/roadmap" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">Roadmap</Link>
              <Link to="/developer-roadmap" className="block px-3 py-2 text-gray-700 hover:text-purple-600 font-medium">Dev Roadmap</Link>
              <div className="px-3 py-2">
                <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  Plan Your Trip
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with Parallax */}
        <div className="absolute inset-0" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
          <img 
            src="https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1920&h=1080&fit=crop" 
            alt="African Safari" 
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 animate-float">
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 hover-glow">
              <Mountain className="h-10 w-10 text-white" />
            </div>
          </div>
          <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '2s' }}>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 hover-glow">
              <Camera className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '4s' }}>
            <div className="w-18 h-18 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 hover-glow">
              <TreePine className="h-9 w-9 text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm px-4 py-2 text-sm font-medium hover-scale">
                <Sparkles className="w-4 h-4 mr-2" />
                Tailor-made African Adventures Since 2010
              </Badge>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
              Discover the
              <span className="block bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Soul of Africa
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Experience authentic, sustainable travel across Southern & Eastern Africa with our expertly crafted, personalized journeys that create memories for a lifetime.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-10 py-6 h-auto rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 hover-shimmer">
                <Compass className="mr-3 h-6 w-6" />
                Start Planning Your Journey
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              
              <Button size="lg" variant="outline" className="text-lg px-10 py-6 h-auto rounded-2xl bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm hover-lift">
                <Play className="mr-3 h-5 w-5" />
                Watch Our Story
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white/90">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <div key={index} className="text-center scroll-animate-scale" style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3 backdrop-blur-sm border border-white/20 hover-bounce">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold mb-1">{stat.number}</div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section id="destinations" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 scroll-animate">
            <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-200 px-4 py-2">
              <Globe className="w-4 h-4 mr-2" />
              Popular Destinations
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              Unforgettable African
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Adventures
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From the vast savannas of Kenya to the wine regions of South Africa, discover the diverse beauty of Africa through our carefully curated experiences.
            </p>
          </div>

          {/* Fixed Grid Layout - 2 columns on medium screens, 4 on large */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {destinations.map((destination, index) => (
              <Card key={index} className={`group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white rounded-3xl hover-float scroll-animate-scale`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-gray-900 border-0 backdrop-blur-sm">
                      <Clock className="w-3 h-3 mr-1" />
                      {destination.duration}
                    </Badge>
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center space-x-1 bg-white/90 rounded-full px-3 py-1 backdrop-blur-sm">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold text-gray-900">{destination.rating}</span>
                      <span className="text-xs text-gray-600">({destination.reviews})</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{destination.name}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{destination.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {destination.highlights.map((highlight, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-200">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {destination.price}
                      </span>
                      <div className="text-sm text-gray-500">per person</div>
                    </div>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover-shimmer">
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 scroll-animate">
            <Badge className="mb-6 bg-purple-100 text-purple-700 border-purple-200 px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Our Services
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              Why Choose
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                EcoTravel Boutique?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We combine decades of local expertise with personalized service to create extraordinary African adventures that exceed your expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <Card key={index} className={`text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white rounded-3xl group hover-float scroll-animate-rotate`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-10">
                    <div className={`w-20 h-20 mx-auto mb-8 bg-gradient-to-br ${service.color} rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 hover-bounce`}>
                      <IconComponent className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{service.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="scroll-animate-left">
              <Badge className="mb-6 bg-green-100 text-green-700 border-green-200 px-4 py-2">
                <Heart className="w-4 h-4 mr-2" />
                Our Story
              </Badge>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 tracking-tight leading-tight">
                Passionate About
                <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Africa Since 2010
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Founded by travel enthusiasts who fell in love with Africa's incredible wildlife, diverse cultures, and breathtaking landscapes, EcoTravel Boutique has been creating unforgettable journeys for over a decade.
              </p>
              <p className="text-lg text-gray-600 mb-12 leading-relaxed">
                Our commitment to sustainable tourism ensures that every trip contributes to wildlife conservation and supports local communities, making your adventure meaningful beyond the memories.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mb-12">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon
                  return (
                    <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover-lift">
                      <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center hover-bounce`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                      <div className="text-gray-600">{stat.label}</div>
                    </div>
                  )
                })}
              </div>

              <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white text-lg px-10 py-6 h-auto rounded-2xl shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover-shimmer">
                Learn More About Us
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </div>

            <div className="relative scroll-animate-right">
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&h=600&fit=crop" 
                  alt="African Wildlife" 
                  className="rounded-3xl shadow-2xl w-full hover-tilt"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-orange-400 to-pink-400 rounded-3xl flex items-center justify-center shadow-2xl hover-float">
                <div className="text-center text-white">
                  <div className="text-3xl font-bold mb-1">4.9</div>
                  <div className="text-sm mb-2">Rating</div>
                  <div className="flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-3xl flex items-center justify-center shadow-2xl hover-float" style={{ animationDelay: '1s' }}>
                <div className="text-center text-white">
                  <Award className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-xs font-semibold">Award Winner</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 scroll-animate">
            <Badge className="mb-6 bg-yellow-100 text-yellow-700 border-yellow-200 px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              Testimonials
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              What Our Travelers
              <span className="block bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Say About Us
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it. Here's what our adventurous travelers have to say about their African experiences with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white rounded-3xl group hover-float scroll-animate-scale`} style={{ animationDelay: `${index * 0.2}s` }}>
                <CardContent className="p-10">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-8 leading-relaxed text-lg italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mr-4 shadow-lg hover-scale"
                    />
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                      <div className="text-gray-500 mb-1">{testimonial.location}</div>
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                        {testimonial.trip}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center scroll-animate">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight">
            Ready for Your African
            <span className="block">Adventure?</span>
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Let us create a personalized journey that matches your dreams, interests, and budget. Your extraordinary African adventure awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-10 py-6 h-auto rounded-2xl shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105 hover-shimmer">
              <Compass className="mr-3 h-6 w-6" />
              Plan Your Trip Now
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-10 py-6 h-auto rounded-2xl border-white/30 text-white hover:bg-white/10 backdrop-blur-sm hover-lift">
              <Globe className="mr-3 h-6 w-6" />
              Explore All Destinations
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 scroll-animate">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center hover-glow-blue">
                  <Compass className="h-7 w-7 text-white" />
                </div>
                <span className="text-2xl font-bold">EcoTravel Boutique</span>
              </div>
              <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed">
                Creating extraordinary African adventures with a commitment to sustainable tourism and authentic cultural experiences.
              </p>
              <div className="flex space-x-4">
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 hover-lift">
                  Facebook
                </Button>
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 hover-lift">
                  Instagram
                </Button>
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 hover-lift">
                  Twitter
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-6 text-lg">Quick Links</h3>
              <ul className="space-y-4 text-gray-300">
                <li><a href="#destinations" className="hover:text-white transition-colors hover-scale">Destinations</a></li>
                <li><a href="#services" className="hover:text-white transition-colors hover-scale">Services</a></li>
                <li><a href="#about" className="hover:text-white transition-colors hover-scale">About Us</a></li>
                <li><Link to="/roadmap" className="hover:text-white transition-colors hover-scale">Project Roadmap</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-6 text-lg">Contact Info</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center hover-scale">
                  <MapPin className="h-5 w-5 mr-3 text-blue-400" />
                  Nairobi, Kenya
                </li>
                <li className="flex items-center hover-scale">
                  <Phone className="h-5 w-5 mr-3 text-blue-400" />
                  +254 700 123 456
                </li>
                <li className="flex items-center hover-scale">
                  <Mail className="h-5 w-5 mr-3 text-blue-400" />
                  info@ecotravelboutique.com
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EcoTravel Boutique. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
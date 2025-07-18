import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle,
  Users,
  Code,
  Database,
  MessageSquare,
  CreditCard,
  Map,
  Bot,
  BarChart3,
  TestTube,
  Rocket,
  ChevronDown,
  ChevronRight,
  FileText,
  Globe,
  Shield,
  Zap,
  Package,
  Settings,
  Search,
  Filter,
  Download,
  Printer,
  Share2,
  GitBranch,
  Target,
  TrendingUp,
  DollarSign,
  Timer,
  CheckSquare,
  XCircle,
  AlertTriangle,
  Info,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Plane,
  Hotel,
  Car,
  Camera,
  Heart,
  Star,
  Award,
  Smartphone,
  Laptop,
  Server,
  Cloud,
  Lock,
  Key,
  UserCheck,
  UserPlus,
  LogIn,
  LogOut,
  RefreshCw,
  Send,
  Archive,
  Trash2,
  Edit,
  Copy,
  Clipboard,
  Link,
  ExternalLink,
  Eye,
  EyeOff,
  Bell,
  BellOff,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Battery,
  BatteryCharging,
  Cpu,
  HardDrive,
  Activity,
  Layers,
  Grid,
  List,
  LayoutGrid,
  LayoutList,
  Columns,
  Sidebar,
  PanelLeft,
  PanelRight,
  Maximize2,
  Minimize2,
  Move,
  MoreHorizontal,
  MoreVertical,
  Plus,
  Minus,
  X,
  Check,
  ChevronUp,
  ChevronsUp,
  ChevronsDown,
  ChevronsLeft,
  ChevronsRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  ArrowDownLeft,
  ArrowUpLeft,
  RotateCw,
  RotateCcw,
  Repeat,
  Repeat2,
  Shuffle,
  Play,
  Pause,
  Square,
  SkipBack,
  SkipForward,
  FastForward,
  Rewind,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Airplay,
  Cast,
  Voicemail,
  Upload,
  UploadCloud,
  DownloadCloud,
  File,
  FileCheck,
  FileX,
  FilePlus,
  FileMinus,
  FileSearch,
  FileCode,
  Folder,
  FolderOpen,
  FolderPlus,
  FolderMinus,
  FolderCheck,
  FolderX,
  Save,
  SaveAll,
  Printer as PrinterIcon,
  Scissors,
  Paperclip,
  Navigation,
  Navigation2,
  Compass,
  Bookmark,
  BookmarkPlus,
  BookmarkMinus,
  BookmarkCheck,
  BookmarkX,
  Tag,
  Tags,
  Hash,
  AtSign,
  Percent,
  Euro,
  PoundSterling,
  IndianRupee,
  JapaneseYen,
  RussianRuble,
  Bitcoin,
  ShoppingCart,
  ShoppingBag,
  Gift,
  Ticket,
  Store,
  Building,
  Building2,
  Home,
  School,
  University,
  Landmark,
  Tent,
  Mountain,
  Trees,
  Waves,
  Sun,
  Moon,
  CloudRain,
  CloudSnow,
  Wind,
  Flame,
  Droplet,
  Umbrella
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Phase {
  id: string;
  title: string;
  description: string;
  weeks: string;
  status: 'completed' | 'in-progress' | 'pending';
  progress: number;
  icon: React.ReactNode;
  color: string;
  deliverables: string[];
  tasks: string[];
}

const phases: Phase[] = [
  {
    id: 'foundation',
    title: 'Foundation & Authentication',
    description: 'Core infrastructure, user authentication, and basic UI framework',
    weeks: '1-3',
    status: 'completed',
    progress: 100,
    icon: <Code className="w-6 h-6" />,
    color: 'bg-green-500',
    deliverables: [
      'Multi-role authentication system (Customer/Consultant)',
      'Responsive UI component library with Tailwind',
      'Database schema design and implementation',
      'Basic routing and navigation structure'
    ],
    tasks: [
      'Setup Blink SDK authentication',
      'Create user registration and login forms',
      'Implement role-based access control',
      'Design database tables and relationships',
      'Build responsive navigation components'
    ]
  },
  {
    id: 'booking-flow',
    title: 'Core Booking Flow',
    description: 'Trip request system, customer dashboard, and basic trip management',
    weeks: '4-6',
    status: 'in-progress',
    progress: 75,
    icon: <Target className="w-6 h-6" />,
    color: 'bg-blue-500',
    deliverables: [
      'Multi-step trip request form with validation',
      'Customer dashboard with trip overview',
      'Trip status tracking system',
      'Basic admin trip management interface'
    ],
    tasks: [
      'Build step-by-step trip request wizard',
      'Create interactive destination map',
      'Implement form validation and draft saving',
      'Design customer dashboard with analytics',
      'Build trip management for consultants'
    ]
  },
  {
    id: 'communication',
    title: 'Communication & CRM',
    description: 'Real-time messaging system and comprehensive CRM',
    weeks: '7-9',
    status: 'pending',
    progress: 0,
    icon: <MessageSquare className="w-6 h-6" />,
    color: 'bg-purple-500',
    deliverables: [
      'WhatsApp-style real-time chat interface',
      'File sharing and attachment support',
      'Customer profile management system',
      'Communication history tracking'
    ],
    tasks: [
      'Implement Blink Realtime for messaging',
      'Build chat UI with typing indicators',
      'Create file upload and sharing system',
      'Design comprehensive CRM interface',
      'Add customer notes and tags system'
    ]
  },
  {
    id: 'payment-booking',
    title: 'Payment & Booking',
    description: 'Payment processing, booking confirmation, and quotation system',
    weeks: '10-12',
    status: 'pending',
    progress: 0,
    icon: <CreditCard className="w-6 h-6" />,
    color: 'bg-orange-500',
    deliverables: [
      'Stripe payment integration with deposits',
      'Dynamic quotation builder system',
      'Booking confirmation workflow',
      'Email notification automation'
    ],
    tasks: [
      'Integrate Stripe for secure payments',
      'Build quotation calculator with pricing',
      'Create booking confirmation flow',
      'Setup automated email notifications',
      'Implement payment tracking and receipts'
    ]
  },
  {
    id: 'itinerary',
    title: 'Itinerary Integration',
    description: 'Way2Go API integration and itinerary display',
    weeks: '13-15',
    status: 'pending',
    progress: 0,
    icon: <Map className="w-6 h-6" />,
    color: 'bg-teal-500',
    deliverables: [
      'Way2Go API authentication and integration',
      'Professional itinerary display interface',
      'Mobile-responsive itinerary viewer',
      'Print-friendly itinerary format'
    ],
    tasks: [
      'Setup Way2Go API credentials',
      'Build API wrapper functions',
      'Create itinerary display components',
      'Implement caching and offline support',
      'Add print and PDF export features'
    ]
  },
  {
    id: 'automation',
    title: 'Communication Automation',
    description: 'WhatsApp Business API and email automation',
    weeks: '16-18',
    status: 'pending',
    progress: 0,
    icon: <Bot className="w-6 h-6" />,
    color: 'bg-indigo-500',
    deliverables: [
      'WhatsApp Business API integration',
      'Automated trip update messages',
      'Email template management system',
      'Customer communication automation'
    ],
    tasks: [
      'Setup WhatsApp Business API',
      'Create message templates',
      'Build automation workflow engine',
      'Implement email marketing system',
      'Add communication scheduling'
    ]
  },
  {
    id: 'analytics',
    title: 'Advanced Features',
    description: 'Analytics dashboard and advanced reporting',
    weeks: '19-21',
    status: 'pending',
    progress: 0,
    icon: <BarChart3 className="w-6 h-6" />,
    color: 'bg-pink-500',
    deliverables: [
      'Business analytics dashboard',
      'Revenue and conversion tracking',
      'Customer satisfaction metrics',
      'Consultant performance analytics'
    ],
    tasks: [
      'Build comprehensive dashboard',
      'Implement data visualization',
      'Create automated reports',
      'Add forecasting capabilities',
      'Build KPI tracking system'
    ]
  },
  {
    id: 'deployment',
    title: 'Testing & Deployment',
    description: 'Database integration, testing, and production deployment',
    weeks: '22-24',
    status: 'pending',
    progress: 0,
    icon: <Rocket className="w-6 h-6" />,
    color: 'bg-red-500',
    deliverables: [
      'Excel data migration system',
      'Comprehensive testing suite',
      'Production deployment setup',
      'User training and documentation'
    ],
    tasks: [
      'Migrate existing Excel data',
      'Create automated test suite',
      'Setup production environment',
      'Conduct user acceptance testing',
      'Deploy to production with monitoring'
    ]
  }
];

interface UserFlow {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  steps: {
    id: string;
    title: string;
    description: string;
    actions: string[];
  }[];
}

const userFlows: UserFlow[] = [
  {
    id: 'customer',
    title: 'Customer Journey',
    description: 'Complete customer experience from discovery to travel',
    icon: <Users className="w-8 h-8" />,
    color: 'bg-blue-500',
    steps: [
      {
        id: 'discovery',
        title: 'Discovery & Registration',
        description: 'Customer discovers EcoTravel and creates account',
        actions: [
          'Visit EcoTravel Boutique website',
          'Browse featured destinations and testimonials',
          'Click "Plan Your Trip" or "Get Started"',
          'Register with email and basic details',
          'Confirm email and complete profile setup',
          'Receive welcome email with getting started guide'
        ]
      },
      {
        id: 'trip-request',
        title: 'Trip Request Process',
        description: 'Customer submits detailed trip request',
        actions: [
          'Access trip request form from dashboard',
          'Select destination from interactive map',
          'Choose travel dates (flexible or fixed)',
          'Specify number of travelers and ages',
          'Select trip type (Adventure, Safari, Cultural, Family)',
          'Choose accommodation level (Budget, Mid-range, Luxury)',
          'Select activity preferences and interests',
          'Set budget range with slider',
          'Add special requirements and comments',
          'Review and submit trip request'
        ]
      },
      {
        id: 'consultation',
        title: 'Consultant Communication',
        description: 'Interactive planning with travel consultant',
        actions: [
          'Receive notification of consultant assignment',
          'Start real-time chat conversation',
          'Share additional preferences and photos',
          'Review consultant recommendations',
          'Discuss itinerary options and modifications',
          'Ask questions about destinations and activities',
          'Receive personalized travel advice',
          'Approve final itinerary outline'
        ]
      },
      {
        id: 'quotation',
        title: 'Quotation & Booking',
        description: 'Review pricing and confirm booking',
        actions: [
          'Receive detailed quotation via email and platform',
          'Review pricing breakdown and inclusions',
          'Compare different package options',
          'Request modifications if needed',
          'Accept quotation and proceed to booking',
          'Make deposit payment (30% via Stripe)',
          'Receive booking confirmation and receipt',
          'Setup payment plan for remaining balance'
        ]
      },
      {
        id: 'itinerary',
        title: 'Itinerary & Preparation',
        description: 'Receive final itinerary and travel preparation',
        actions: [
          'Access detailed itinerary via Way2Go integration',
          'View day-by-day activities and accommodations',
          'Download mobile-friendly itinerary',
          'Receive travel preparation checklist',
          'Submit passport and visa information',
          'Receive packing recommendations',
          'Get weather forecasts and health advice',
          'Complete pre-travel documentation'
        ]
      },
      {
        id: 'travel',
        title: 'Travel Experience',
        description: 'During travel with ongoing support',
        actions: [
          'Receive daily WhatsApp updates',
          'Access 24/7 emergency support',
          'Share travel photos and experiences',
          'Receive location-specific information',
          'Get assistance with any issues',
          'Participate in optional activities',
          'Receive local weather and safety updates',
          'Connect with local guides and contacts'
        ]
      },
      {
        id: 'post-travel',
        title: 'Post-Travel Follow-up',
        description: 'Return and relationship building',
        actions: [
          'Receive welcome home message',
          'Complete travel satisfaction survey',
          'Share photos and testimonials',
          'Receive photo compilation and memories',
          'Get recommendations for future trips',
          'Join EcoTravel community and events',
          'Receive birthday and anniversary greetings',
          'Access loyalty program benefits'
        ]
      }
    ]
  },
  {
    id: 'consultant',
    title: 'Consultant Workflow',
    description: 'Travel consultant daily operations and client management',
    icon: <Briefcase className="w-8 h-8" />,
    color: 'bg-green-500',
    steps: [
      {
        id: 'lead-management',
        title: 'Lead Management',
        description: 'Managing incoming trip requests',
        actions: [
          'Receive notification of new trip request',
          'Review customer preferences and requirements',
          'Assess trip complexity and timeline',
          'Claim or get assigned to trip request',
          'Review customer profile and history',
          'Prepare initial response and questions',
          'Set trip status to "In Progress"',
          'Begin customer communication'
        ]
      },
      {
        id: 'client-consultation',
        title: 'Client Consultation',
        description: 'Interactive planning and consultation',
        actions: [
          'Start chat conversation with customer',
          'Ask detailed questions about preferences',
          'Share destination expertise and recommendations',
          'Discuss seasonal considerations and timing',
          'Explain activity options and difficulty levels',
          'Clarify budget parameters and flexibility',
          'Take notes on special requirements',
          'Build rapport and trust with customer'
        ]
      },
      {
        id: 'itinerary-planning',
        title: 'Itinerary Planning',
        description: 'Creating detailed travel itineraries',
        actions: [
          'Access supplier databases and rates',
          'Design day-by-day itinerary structure',
          'Book accommodation and activities',
          'Coordinate transportation between locations',
          'Ensure activity flow and pacing',
          'Check seasonal availability and weather',
          'Add buffer time for travel and rest',
          'Include local cultural experiences'
        ]
      },
      {
        id: 'quotation-creation',
        title: 'Quotation Creation',
        description: 'Building and presenting pricing',
        actions: [
          'Use quotation builder to calculate pricing',
          'Add markup and commission calculations',
          'Include all taxes and fees',
          'Create multiple package options',
          'Add detailed inclusions and exclusions',
          'Review pricing against budget expectations',
          'Generate professional PDF quotation',
          'Send quotation via email and platform'
        ]
      },
      {
        id: 'booking-management',
        title: 'Booking Management',
        description: 'Processing confirmed bookings',
        actions: [
          'Process deposit payment confirmation',
          'Confirm all supplier bookings',
          'Create booking files and documentation',
          'Setup payment schedule for balance',
          'Generate booking confirmation documents',
          'Add booking to calendar and CRM',
          'Setup automated reminder system',
          'Notify relevant team members'
        ]
      },
      {
        id: 'pre-travel-support',
        title: 'Pre-Travel Support',
        description: 'Preparing customers for travel',
        actions: [
          'Send detailed itinerary via Way2Go',
          'Provide travel preparation checklist',
          'Collect passport and visa information',
          'Send packing recommendations',
          'Provide weather and health advice',
          'Share local customs and etiquette tips',
          'Confirm final details and logistics',
          'Ensure 24/7 support contact information'
        ]
      },
      {
        id: 'travel-monitoring',
        title: 'Travel Monitoring',
        description: 'Supporting customers during travel',
        actions: [
          'Send daily WhatsApp check-ins',
          'Monitor weather and safety conditions',
          'Be available for emergency support',
          'Coordinate with local suppliers',
          'Handle any issues or changes',
          'Collect customer feedback and photos',
          'Update customer profile with preferences',
          'Ensure smooth travel experience'
        ]
      },
      {
        id: 'post-travel-follow-up',
        title: 'Post-Travel Follow-up',
        description: 'Closing loop and building relationships',
        actions: [
          'Send welcome home message',
          'Request feedback and testimonials',
          'Update customer profile with notes',
          'Calculate and record commission',
          'Archive trip files and documentation',
          'Plan follow-up for future trips',
          'Add customer to marketing lists',
          'Schedule anniversary and birthday reminders'
        ]
      }
    ]
  },
  {
    id: 'admin',
    title: 'Admin Operations',
    description: 'Platform administration and business management',
    icon: <Settings className="w-8 h-8" />,
    color: 'bg-purple-500',
    steps: [
      {
        id: 'platform-monitoring',
        title: 'Platform Monitoring',
        description: 'Daily system oversight and maintenance',
        actions: [
          'Review system performance metrics',
          'Check error logs and system health',
          'Monitor user activity and engagement',
          'Review security alerts and updates',
          'Verify backup and data integrity',
          'Check payment processing status',
          'Monitor third-party integrations',
          'Update system configurations as needed'
        ]
      },
      {
        id: 'user-management',
        title: 'User Management',
        description: 'Managing consultants and customer accounts',
        actions: [
          'Review new user registrations',
          'Approve consultant account applications',
          'Manage user roles and permissions',
          'Handle account issues and resets',
          'Monitor user activity and compliance',
          'Suspend or deactivate problematic accounts',
          'Provide user support and training',
          'Update user profiles and settings'
        ]
      },
      {
        id: 'business-analytics',
        title: 'Business Analytics',
        description: 'Analyzing performance and generating reports',
        actions: [
          'Review daily/weekly/monthly reports',
          'Analyze conversion rates and revenue',
          'Monitor consultant performance metrics',
          'Track customer satisfaction scores',
          'Identify trends and opportunities',
          'Generate executive dashboards',
          'Prepare board presentation materials',
          'Plan strategic initiatives based on data'
        ]
      },
      {
        id: 'financial-management',
        title: 'Financial Management',
        description: 'Managing payments and financial operations',
        actions: [
          'Review daily payment transactions',
          'Process consultant commission payments',
          'Reconcile bank and payment accounts',
          'Generate financial reports',
          'Handle refunds and payment disputes',
          'Monitor cash flow and forecasting',
          'Manage supplier payment schedules',
          'Ensure financial compliance and auditing'
        ]
      },
      {
        id: 'marketing-operations',
        title: 'Marketing Operations',
        description: 'Managing marketing campaigns and communications',
        actions: [
          'Plan and execute email marketing campaigns',
          'Manage social media content and engagement',
          'Analyze marketing campaign performance',
          'Coordinate with external marketing partners',
          'Update website content and SEO',
          'Manage customer testimonials and reviews',
          'Plan promotional campaigns and discounts',
          'Track marketing ROI and conversion metrics'
        ]
      },
      {
        id: 'supplier-management',
        title: 'Supplier Management',
        description: 'Managing relationships with travel suppliers',
        actions: [
          'Negotiate rates and contracts with suppliers',
          'Onboard new suppliers and partners',
          'Monitor supplier performance and quality',
          'Handle supplier disputes and issues',
          'Update supplier information and rates',
          'Coordinate supplier payment schedules',
          'Evaluate new supplier opportunities',
          'Maintain supplier relationship database'
        ]
      },
      {
        id: 'compliance-quality',
        title: 'Compliance & Quality',
        description: 'Ensuring regulatory compliance and quality standards',
        actions: [
          'Monitor regulatory compliance requirements',
          'Conduct quality audits and reviews',
          'Update policies and procedures',
          'Manage insurance and licensing',
          'Handle customer complaints and disputes',
          'Ensure data protection and privacy compliance',
          'Conduct staff training and development',
          'Maintain industry certifications and standards'
        ]
      }
    ]
  }
];

export default function RoadmapPage() {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('roadmap');

  const overallProgress = phases.reduce((acc, phase) => acc + phase.progress, 0) / phases.length;
  const completedPhases = phases.filter(phase => phase.status === 'completed').length;
  const totalHours = phases.length * 40; // Estimated 40 hours per phase
  const completedHours = phases.filter(phase => phase.status === 'completed').length * 40;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'pending':
        return <Circle className="w-5 h-5 text-gray-400" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const togglePhase = (phaseId: string) => {
    setSelectedPhase(selectedPhase === phaseId ? null : phaseId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Development Roadmap</h1>
              <p className="text-gray-600 mt-1">EcoTravel Boutique Platform - Comprehensive Development Plan</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{overallProgress.toFixed(1)}%</div>
                <div className="text-sm text-gray-500">Overall Progress</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">24</p>
              <p className="text-sm text-gray-600">Weeks Duration</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                Phases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">{phases.length}</p>
              <p className="text-sm text-gray-600">{completedPhases} Completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600" />
                Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">{totalHours}</p>
              <p className="text-sm text-gray-600">{completedHours} Completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-600">Team Members</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="roadmap">Development Roadmap</TabsTrigger>
            <TabsTrigger value="user-flows">User Flows & Journeys</TabsTrigger>
          </TabsList>

          <TabsContent value="roadmap" className="mt-6">
            {/* Timeline Progress */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Development Timeline</h3>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${overallProgress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Start</span>
                  <span>{overallProgress.toFixed(1)}% Complete</span>
                  <span>Launch</span>
                </div>
              </div>
            </div>

            {/* Phase Cards */}
            <div className="space-y-6">
              {phases.map((phase) => (
                <Card key={phase.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader 
                    className="cursor-pointer"
                    onClick={() => togglePhase(phase.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${phase.color} text-white`}>
                          {phase.icon}
                        </div>
                        <div>
                          <div className="flex items-center space-x-3">
                            <CardTitle className="text-xl">{phase.title}</CardTitle>
                            <Badge variant="outline">Weeks {phase.weeks}</Badge>
                            {getStatusIcon(phase.status)}
                          </div>
                          <CardDescription className="mt-1">{phase.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">{phase.progress}%</div>
                          <div className="text-sm text-gray-500">Complete</div>
                        </div>
                        {selectedPhase === phase.id ? (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                    <div className="mt-4">
                      <Progress value={phase.progress} className="h-3" />
                    </div>
                  </CardHeader>

                  {selectedPhase === phase.id && (
                    <CardContent className="border-t bg-gray-50">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Key Deliverables</h4>
                          <ul className="space-y-2">
                            {phase.deliverables.map((deliverable, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{deliverable}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Implementation Tasks</h4>
                          <ul className="space-y-2">
                            {phase.tasks.map((task, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <Circle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="user-flows" className="mt-6">
            <div className="space-y-8">
              {userFlows.map((flow) => (
                <Card key={flow.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className={`p-4 rounded-lg ${flow.color} text-white`}>
                        {flow.icon}
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{flow.title}</CardTitle>
                        <CardDescription className="text-lg">{flow.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {flow.steps.map((step, index) => (
                        <div key={step.id} className="relative">
                          {index < flow.steps.length - 1 && (
                            <div className="absolute left-6 top-12 w-0.5 h-full bg-gray-200 z-0"></div>
                          )}
                          <div className="flex space-x-4">
                            <div className={`w-12 h-12 rounded-full ${flow.color} text-white flex items-center justify-center font-bold text-lg z-10`}>
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h4>
                              <p className="text-gray-600 mb-3">{step.description}</p>
                              <div className="bg-gray-50 rounded-lg p-4">
                                <h5 className="font-medium text-gray-900 mb-2">User Actions:</h5>
                                <ul className="space-y-1">
                                  {step.actions.map((action, actionIndex) => (
                                    <li key={actionIndex} className="flex items-start space-x-2">
                                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                      <span className="text-sm text-gray-700">{action}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
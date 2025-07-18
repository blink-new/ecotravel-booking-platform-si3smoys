import React, { useState } from 'react'
import { ChevronDown, ChevronRight, Calendar, Clock, Users, CheckCircle, AlertCircle, Circle, Target, Code, Database, Palette, MessageSquare, CreditCard, Map, BarChart3, TestTube, Rocket } from 'lucide-react'

interface Task {
  id: string
  title: string
  description: string
  status: 'completed' | 'in-progress' | 'pending' | 'blocked'
  assignee?: string
  estimatedHours: number
  dependencies?: string[]
  priority: 'high' | 'medium' | 'low'
}

interface Phase {
  id: string
  title: string
  description: string
  week: number
  status: 'completed' | 'in-progress' | 'pending'
  progress: number
  icon: React.ReactNode
  color: string
  tasks: Task[]
  deliverables: string[]
  risks: string[]
}

const DeveloperRoadmap: React.FC = () => {
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null)

  const phases: Phase[] = [
    {
      id: 'foundation',
      title: 'Foundation & Authentication',
      description: 'Set up core infrastructure, user authentication system, and basic UI framework',
      week: 1,
      status: 'completed',
      progress: 100,
      icon: <Code className="w-6 h-6" />,
      color: 'bg-green-500',
      tasks: [
        {
          id: 'auth-setup',
          title: 'User Authentication System',
          description: 'Implement multi-role authentication with customer/consultant roles',
          status: 'completed',
          assignee: 'Frontend Team',
          estimatedHours: 16,
          priority: 'high'
        },
        {
          id: 'ui-framework',
          title: 'UI Framework & Design System',
          description: 'Create reusable components and establish design patterns',
          status: 'completed',
          assignee: 'UI/UX Team',
          estimatedHours: 24,
          priority: 'high'
        },
        {
          id: 'database-schema',
          title: 'Database Schema Design',
          description: 'Design and implement core database tables and relationships',
          status: 'completed',
          assignee: 'Backend Team',
          estimatedHours: 20,
          priority: 'high'
        }
      ],
      deliverables: [
        'User registration and login system',
        'Role-based access control',
        'Responsive UI component library',
        'Database schema with core tables'
      ],
      risks: [
        'Authentication complexity with multiple user types',
        'Database design changes requiring migrations'
      ]
    },
    {
      id: 'booking-flow',
      title: 'Core Booking Flow',
      description: 'Implement trip request system, customer dashboard, and basic trip management',
      week: 2,
      status: 'in-progress',
      progress: 75,
      icon: <Target className="w-6 h-6" />,
      color: 'bg-blue-500',
      tasks: [
        {
          id: 'trip-request',
          title: 'Multi-step Trip Request Form',
          description: 'Build comprehensive trip request wizard with validation',
          status: 'completed',
          assignee: 'Frontend Team',
          estimatedHours: 32,
          priority: 'high'
        },
        {
          id: 'customer-dashboard',
          title: 'Customer Dashboard',
          description: 'Create personalized dashboard with trip overview and quick actions',
          status: 'completed',
          assignee: 'Frontend Team',
          estimatedHours: 24,
          priority: 'high'
        },
        {
          id: 'trip-management',
          title: 'Basic Trip Management',
          description: 'Admin interface for viewing and managing trip requests',
          status: 'in-progress',
          assignee: 'Full-stack Team',
          estimatedHours: 28,
          priority: 'high'
        }
      ],
      deliverables: [
        'Multi-step trip request form',
        'Customer dashboard with analytics',
        'Trip status tracking system',
        'Basic admin trip management'
      ],
      risks: [
        'Form complexity affecting user experience',
        'Performance issues with large trip datasets'
      ]
    },
    {
      id: 'communication',
      title: 'Communication & CRM',
      description: 'Build real-time messaging system and comprehensive CRM for customer management',
      week: 3,
      status: 'pending',
      progress: 0,
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'bg-purple-500',
      tasks: [
        {
          id: 'chat-system',
          title: 'Real-time Chat Interface',
          description: 'WhatsApp-style messaging between customers and consultants',
          status: 'pending',
          assignee: 'Frontend Team',
          estimatedHours: 40,
          priority: 'high',
          dependencies: ['trip-management']
        },
        {
          id: 'crm-system',
          title: 'Customer Relationship Management',
          description: 'Comprehensive CRM with customer profiles and history',
          status: 'pending',
          assignee: 'Full-stack Team',
          estimatedHours: 36,
          priority: 'medium'
        },
        {
          id: 'file-sharing',
          title: 'File Sharing & Attachments',
          description: 'Enable file uploads and sharing in chat conversations',
          status: 'pending',
          assignee: 'Backend Team',
          estimatedHours: 20,
          priority: 'medium',
          dependencies: ['chat-system']
        }
      ],
      deliverables: [
        'Real-time messaging system',
        'File upload and sharing',
        'Customer profile management',
        'Communication history tracking'
      ],
      risks: [
        'Real-time performance at scale',
        'File storage and security concerns'
      ]
    },
    {
      id: 'payment-booking',
      title: 'Payment & Booking Confirmation',
      description: 'Integrate payment processing, booking confirmation, and quotation system',
      week: 4,
      status: 'pending',
      progress: 0,
      icon: <CreditCard className="w-6 h-6" />,
      color: 'bg-orange-500',
      tasks: [
        {
          id: 'payment-integration',
          title: 'Stripe Payment Integration',
          description: 'Secure payment processing with multiple payment methods',
          status: 'pending',
          assignee: 'Backend Team',
          estimatedHours: 32,
          priority: 'high'
        },
        {
          id: 'quotation-builder',
          title: 'Quotation Builder',
          description: 'Dynamic quotation creation with pricing calculator',
          status: 'pending',
          assignee: 'Full-stack Team',
          estimatedHours: 28,
          priority: 'high'
        },
        {
          id: 'booking-confirmation',
          title: 'Booking Confirmation System',
          description: 'Automated booking confirmation and email notifications',
          status: 'pending',
          assignee: 'Backend Team',
          estimatedHours: 24,
          priority: 'medium',
          dependencies: ['payment-integration']
        }
      ],
      deliverables: [
        'Secure payment processing',
        'Dynamic quotation system',
        'Booking confirmation workflow',
        'Email notification system'
      ],
      risks: [
        'Payment security compliance',
        'Integration complexity with Stripe'
      ]
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'in-progress':
        return <AlertCircle className="w-5 h-5 text-blue-500" />
      case 'blocked':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <Circle className="w-5 h-5 text-gray-400" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const togglePhase = (phaseId: string) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId)
  }

  const overallProgress = Math.round(phases.reduce((acc, phase) => acc + phase.progress, 0) / phases.length)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Development Roadmap</h1>
              <p className="text-gray-600 mt-1">EcoTravel Boutique Platform - 4 Week Sprint</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{overallProgress}%</div>
                <div className="text-sm text-gray-500">Overall Progress</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-blue-500" />
              <div className="ml-3">
                <div className="text-2xl font-bold text-gray-900">4</div>
                <div className="text-sm text-gray-500">Weeks Duration</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <Target className="w-8 h-8 text-green-500" />
              <div className="ml-3">
                <div className="text-2xl font-bold text-gray-900">{phases.length}</div>
                <div className="text-sm text-gray-500">Development Phases</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-orange-500" />
              <div className="ml-3">
                <div className="text-2xl font-bold text-gray-900">
                  {phases.reduce((acc, phase) => acc + phase.tasks.reduce((taskAcc, task) => taskAcc + task.estimatedHours, 0), 0)}
                </div>
                <div className="text-sm text-gray-500">Total Hours</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-purple-500" />
              <div className="ml-3">
                <div className="text-2xl font-bold text-gray-900">3</div>
                <div className="text-sm text-gray-500">Team Members</div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Progress */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline Progress</h3>
          <div className="relative">
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4].map((week) => (
                <div key={week} className="text-sm font-medium text-gray-500">
                  Week {week}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(overallProgress / 100) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between">
              {phases.map((phase) => (
                <div key={phase.id} className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full ${phase.color} mb-1`}></div>
                  <div className="text-xs text-gray-500 text-center max-w-20">
                    {phase.title.split(' ')[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Phase Cards */}
        <div className="space-y-4">
          {phases.map((phase) => (
            <div key={phase.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Phase Header */}
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => togglePhase(phase.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${phase.color} text-white`}>
                      {phase.icon}
                    </div>
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="text-xl font-semibold text-gray-900">{phase.title}</h3>
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                          Week {phase.week}
                        </span>
                        {getStatusIcon(phase.status)}
                      </div>
                      <p className="text-gray-600 mt-1">{phase.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{phase.progress}%</div>
                      <div className="text-sm text-gray-500">Complete</div>
                    </div>
                    {expandedPhase === phase.id ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${phase.color}`}
                      style={{ width: `${phase.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedPhase === phase.id && (
                <div className="border-t border-gray-100 bg-gray-50">
                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Tasks */}
                      <div className="lg:col-span-2">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Tasks</h4>
                        <div className="space-y-3">
                          {phase.tasks.map((task) => (
                            <div key={task.id} className="bg-white rounded-lg p-4 border border-gray-200">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-2">
                                    {getStatusIcon(task.status)}
                                    <h5 className="font-medium text-gray-900">{task.title}</h5>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                                      {task.priority}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <span>👤 {task.assignee}</span>
                                    <span>⏱️ {task.estimatedHours}h</span>
                                  </div>
                                  {task.dependencies && (
                                    <div className="mt-2">
                                      <span className="text-xs text-gray-500">
                                        Depends on: {task.dependencies.join(', ')}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Deliverables & Risks */}
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">Deliverables</h4>
                          <ul className="space-y-2">
                            {phase.deliverables.map((deliverable, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{deliverable}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">Risks</h4>
                          <ul className="space-y-2">
                            {phase.risks.map((risk, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{risk}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Team & Resources */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Team & Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Code className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900">Frontend Team</h4>
              <p className="text-sm text-gray-600">React, TypeScript, UI/UX</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Database className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900">Backend Team</h4>
              <p className="text-sm text-gray-600">API, Database, Integrations</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900">Full-stack Team</h4>
              <p className="text-sm text-gray-600">End-to-end Development</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeveloperRoadmap
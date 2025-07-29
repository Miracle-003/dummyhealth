"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  User,
  Calendar,
  Users,
  FileText,
  BookOpen,
  LogOut,
  Bell,
  Settings,
  Activity,
  Clock,
  Video,
  MessageCircle,
  ChevronRight,
  Stethoscope,
  DollarSign,
  Star,
  BarChart3,
  ChevronDown,
  Menu,
} from "lucide-react"
import Link from "next/link"

// Doctor dashboard - comprehensive medical professional interface
export default function DoctorDashboard() {
  // State for managing doctor data
  const [doctor] = useState({
    name: "Dr. Sarah Wilson",
    email: "sarah.wilson@medicare.com",
    avatar: "/placeholder.svg?height=60&width=60&text=SW",
    specialty: "Cardiologist",
    license: "MD123456",
    experience: "15 years",
    rating: 4.9,
    reviews: 127,
  })

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Get current time for greeting
  const currentHour = new Date().getHours()
  const getGreeting = () => {
    if (currentHour < 12) return { text: "Good morning", emoji: "☀️" }
    if (currentHour < 18) return { text: "Good afternoon", emoji: "🌤️" }
    return { text: "Good evening", emoji: "🌙" }
  }
  const greeting = getGreeting()

  // Doctor statistics and metrics
  const doctorStats = {
    totalPatients: 1247,
    todayAppointments: 8,
    monthlyEarnings: 15420,
    patientSatisfaction: 98,
  }

  // Today's appointments
  const todayAppointments = [
    {
      id: 1,
      patient: "John Smith",
      time: "9:00 AM",
      type: "Video Consultation",
      condition: "Follow-up - Hypertension",
      status: "upcoming",
      avatar: "/placeholder.svg?height=40&width=40&text=JS",
    },
    {
      id: 2,
      patient: "Emily Johnson",
      time: "10:30 AM",
      type: "In-Person Visit",
      condition: "Chest Pain Evaluation",
      status: "upcoming",
      avatar: "/placeholder.svg?height=40&width=40&text=EJ",
    },
    {
      id: 3,
      patient: "Michael Brown",
      time: "2:00 PM",
      type: "Video Consultation",
      condition: "Cardiac Screening",
      status: "completed",
      avatar: "/placeholder.svg?height=40&width=40&text=MB",
    },
  ]

  // Recent patient activities
  const recentActivities = [
    {
      id: 1,
      type: "consultation",
      title: "Completed consultation with Maria Garcia",
      time: "2 hours ago",
      icon: Video,
    },
    {
      id: 2,
      type: "prescription",
      title: "Prescribed medication for David Lee",
      time: "4 hours ago",
      icon: FileText,
    },
    {
      id: 3,
      type: "report",
      title: "Lab results reviewed for Anna Wilson",
      time: "6 hours ago",
      icon: Activity,
    },
  ]

  // Quick stats for dashboard overview
  const quickStats = [
    {
      label: "Today's Appointments",
      value: doctorStats.todayAppointments.toString(),
      icon: Calendar,
      color: "text-blue-600",
    },
    { label: "Total Patients", value: doctorStats.totalPatients.toString(), icon: Users, color: "text-green-600" },
    {
      label: "Monthly Earnings",
      value: `$${doctorStats.monthlyEarnings.toLocaleString()}`,
      icon: DollarSign,
      color: "text-purple-600",
    },
    { label: "Satisfaction Rate", value: `${doctorStats.patientSatisfaction}%`, icon: Star, color: "text-yellow-600" },
  ]

  // Main function cards with gradients
  const mainFunctions = [
    {
      title: "Appointments",
      description: "Manage your schedule and patient appointments",
      icon: Calendar,
      href: "/doctor/appointments",
      gradient: "from-blue-500 to-blue-600",
      count: doctorStats.todayAppointments,
      countLabel: "Today",
    },
    {
      title: "Consultations",
      description: "Start video calls and manage patient consultations",
      icon: Video,
      href: "/doctor/consultations",
      gradient: "from-green-500 to-green-600",
      count: 3,
      countLabel: "Active",
    },
    {
      title: "Medical Records",
      description: "Access and manage patient medical records",
      icon: FileText,
      href: "/doctor/medical-records",
      gradient: "from-purple-500 to-purple-600",
      count: 24,
      countLabel: "Recent",
    },
    {
      title: "Analytics",
      description: "View performance metrics and insights",
      icon: BarChart3,
      href: "/doctor/analytics",
      gradient: "from-orange-500 to-orange-600",
      count: doctorStats.patientSatisfaction,
      countLabel: "% Rating",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Navigation */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-xl sm:text-2xl font-bold text-green-600">
                Medicare
              </Link>
              <span className="ml-2 text-xs sm:text-sm text-gray-500 hidden sm:block">Doctor Portal</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-100">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={doctor.avatar || "/placeholder.svg"} alt={doctor.name} />
                      <AvatarFallback>SW</AvatarFallback>
                    </Avatar>
                    <div className="text-left hidden xl:block">
                      <div className="text-sm font-medium text-gray-700">{doctor.name}</div>
                      <div className="text-xs text-green-600">{doctor.specialty}</div>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/doctor/profile" className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/doctor/resources" className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Resources
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/doctor/patients" className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      My Patients
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden flex items-center space-x-2">
              {/* Mobile Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>

              {/* Mobile Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={doctor.avatar || "/placeholder.svg"} alt={doctor.name} />
                      <AvatarFallback>SW</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/doctor/profile" className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/doctor/resources" className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Resources
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/doctor/patients" className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      My Patients
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link href="/doctor/settings">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Settings
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              {greeting.text}, {doctor.name}! {greeting.emoji}
            </h1>
            <p className="text-blue-100 mb-4 sm:mb-6 text-sm sm:text-base">
              You have {doctorStats.todayAppointments} appointments scheduled for today. Ready to help your patients?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/doctor/appointments">
                <Button className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Today's Schedule
                </Button>
              </Link>
              <Link href="/doctor/consultations">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                >
                  <Video className="h-4 w-4 mr-2" />
                  Start Consultation
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {quickStats.map((stat, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="mb-2 sm:mb-0">
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`p-2 sm:p-3 rounded-full bg-gray-100 ${stat.color} self-start sm:self-auto`}>
                      <stat.icon className="h-4 w-4 sm:h-6 sm:w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Function Cards with Gradients */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {mainFunctions.map((func, index) => (
              <Link key={index} href={func.href}>
                <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
                  <div className={`bg-gradient-to-br ${func.gradient} p-6 text-white relative`}>
                    <div className="flex items-center justify-between mb-4">
                      <func.icon className="h-8 w-8" />
                      <div className="text-right">
                        <div className="text-2xl font-bold">{func.count}</div>
                        <div className="text-xs opacity-90">{func.countLabel}</div>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{func.title}</h3>
                    <p className="text-sm opacity-90 leading-relaxed">{func.description}</p>

                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
                    <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-white bg-opacity-10 rounded-full"></div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Doctor Card */}
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-0">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-white shadow-lg">
                  <AvatarImage src={doctor.avatar || "/placeholder.svg"} alt={doctor.name} />
                  <AvatarFallback className="text-xl">SW</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{doctor.name}</h2>
                  <p className="text-lg text-indigo-600 font-medium mb-3">{doctor.specialty}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-sm text-gray-600">
                    <div className="flex items-center justify-center sm:justify-start">
                      <Stethoscope className="h-4 w-4 mr-2" />
                      <span>{doctor.experience} experience</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start">
                      <Star className="h-4 w-4 mr-2 text-yellow-500" />
                      <span>
                        {doctor.rating}/5.0 ({doctor.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      <span>License: {doctor.license}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg sm:text-xl">
                <span className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Today's Appointments
                </span>
                <Link href="/doctor/appointments">
                  <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                    View All
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {todayAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg"
                  >
                    <Avatar className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                      <AvatarImage src={appointment.avatar || "/placeholder.svg"} alt={appointment.patient} />
                      <AvatarFallback>
                        {appointment.patient
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm sm:text-base truncate">{appointment.patient}</h4>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">{appointment.condition}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        <span className="text-xs text-gray-500">{appointment.time}</span>
                        <Badge variant="outline" className="text-xs">
                          {appointment.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
                      <Badge
                        variant={appointment.status === "upcoming" ? "default" : "secondary"}
                        className={`text-xs ${
                          appointment.status === "upcoming"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {appointment.status}
                      </Badge>
                      {appointment.status === "upcoming" && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs">
                          {appointment.type === "Video Consultation" ? (
                            <Video className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          ) : (
                            <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          )}
                          Start
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg sm:text-xl">
                <span className="flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-green-600" />
                  Recent Activities
                </span>
                <Link href="/doctor/activities">
                  <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                    View All
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="p-2 bg-white rounded-full flex-shrink-0">
                      <activity.icon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm sm:text-base truncate">{activity.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

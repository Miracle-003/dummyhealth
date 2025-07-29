"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { CircularProgress } from "@/components/ui/circular-progress"
import {
  Calendar,
  Clock,
  Heart,
  Pill,
  Bell,
  Settings,
  LogOut,
  Video,
  Phone,
  Activity,
  Star,
  Plus,
  ChevronRight,
  Stethoscope,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Smartphone,
  Wifi,
  WifiOff,
  Bluetooth,
} from "lucide-react"

const upcomingAppointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Wilson",
    specialty: "Cardiologist",
    date: "Today",
    time: "2:30 PM",
    type: "video",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    doctor: "Dr. Michael Brown",
    specialty: "Dermatologist",
    date: "Tomorrow",
    time: "10:00 AM",
    type: "phone",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const recentConsultations = [
  {
    id: 1,
    doctor: "Dr. Jennifer Lee",
    specialty: "Pediatrician",
    date: "2 days ago",
    diagnosis: "Common Cold",
    status: "completed",
    rating: 5,
  },
  {
    id: 2,
    doctor: "Dr. Robert Kim",
    specialty: "General Physician",
    date: "1 week ago",
    diagnosis: "Routine Checkup",
    status: "completed",
    rating: 4,
  },
]

const medications = [
  {
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    remaining: 15,
    total: 30,
    nextRefill: "Dec 15, 2024",
  },
  {
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    remaining: 8,
    total: 60,
    nextRefill: "Dec 10, 2024",
  },
]

const healthMetrics = [
  {
    label: "Blood Pressure",
    value: "120/80",
    unit: "mmHg",
    status: "normal",
    trend: "stable",
    lastUpdated: "2 hours ago",
    score: 85,
    deviceConnected: true,
  },
  {
    label: "Heart Rate",
    value: "72",
    unit: "bpm",
    status: "normal",
    trend: "up",
    lastUpdated: "2 hours ago",
    score: 78,
    deviceConnected: true,
  },
  {
    label: "Weight",
    value: "165",
    unit: "lbs",
    status: "normal",
    trend: "down",
    lastUpdated: "1 day ago",
    score: 82,
    deviceConnected: false,
  },
  {
    label: "Blood Sugar",
    value: "95",
    unit: "mg/dL",
    status: "normal",
    trend: "stable",
    lastUpdated: "3 hours ago",
    score: 90,
    deviceConnected: true,
  },
]

const connectedDevices = [
  {
    id: 1,
    name: "Apple Watch Series 9",
    type: "Heart Rate & Activity",
    status: "connected",
    lastSync: "2 minutes ago",
    battery: 85,
  },
  {
    id: 2,
    name: "Omron Blood Pressure Monitor",
    type: "Blood Pressure",
    status: "connected",
    lastSync: "1 hour ago",
    battery: 92,
  },
  {
    id: 3,
    name: "Fitbit Aria Scale",
    type: "Weight & BMI",
    status: "disconnected",
    lastSync: "2 days ago",
    battery: 0,
  },
  {
    id: 4,
    name: "Freestyle Libre CGM",
    type: "Blood Glucose",
    status: "connected",
    lastSync: "15 minutes ago",
    battery: 78,
  },
]

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Calculate overall health score
  const overallHealthScore = Math.round(
    healthMetrics.reduce((sum, metric) => sum + metric.score, 0) / healthMetrics.length,
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-green-600 bg-green-50"
      case "warning":
        return "text-yellow-600 bg-yellow-50"
      case "critical":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-600" />
      case "down":
        return <TrendingUp className="h-3 w-3 text-red-600 rotate-180" />
      default:
        return <div className="h-3 w-3 rounded-full bg-gray-400" />
    }
  }

  const handleDeviceSync = (deviceId: number) => {
    // Simulate device sync
    console.log(`Syncing device ${deviceId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Heart className="h-8 w-8 text-green-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Medicare</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
                <Settings className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="bg-green-100 text-green-600">JD</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">Patient ID: #12345</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, John!</h1>
          <p className="text-gray-600">Here's your health overview for today</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Link href="/consultations">
            <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Video className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Video Call</p>
                    <p className="text-xs text-gray-500">Start consultation</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/appointments">
            <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Book Appointment</p>
                    <p className="text-xs text-gray-500">Schedule with doctor</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/pharmacy">
            <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Pill className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Pharmacy</p>
                    <p className="text-xs text-gray-500">Order medicines</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/doctors">
            <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Stethoscope className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Find Doctors</p>
                    <p className="text-xs text-gray-500">Browse specialists</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Appointments */}
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-900">Upcoming Appointments</CardTitle>
                  <Link href="/appointments">
                    <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                      View All <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={appointment.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-green-100 text-green-600">
                            {appointment.doctor
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{appointment.doctor}</p>
                          <p className="text-sm text-gray-600">{appointment.specialty}</p>
                          <div className="flex items-center mt-1">
                            <Clock className="h-3 w-3 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">
                              {appointment.date} at {appointment.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="border-green-200 text-green-700">
                          {appointment.type === "video" ? (
                            <>
                              <Video className="h-3 w-3 mr-1" /> Video
                            </>
                          ) : (
                            <>
                              <Phone className="h-3 w-3 mr-1" /> Phone
                            </>
                          )}
                        </Badge>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          Join
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Health Metrics with Overall Health Score in Right Corner */}
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-gray-900">Health Metrics</CardTitle>
                    <CardDescription className="text-gray-600">
                      Your latest vital signs and measurements
                    </CardDescription>
                  </div>
                  {/* Overall Health Score in Right Corner */}
                  <div className="flex flex-col items-center">
                    <CircularProgress value={overallHealthScore} size={100} strokeWidth={8} />
                    <p className="text-xs text-gray-600 mt-2 text-center">Overall Health</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {healthMetrics.map((metric, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                          {metric.deviceConnected ? (
                            <Wifi className="h-3 w-3 text-green-500 ml-2" />
                          ) : (
                            <WifiOff className="h-3 w-3 text-gray-400 ml-2" />
                          )}
                        </div>
                        {getTrendIcon(metric.trend)}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-baseline space-x-2 mb-2">
                            <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                            <span className="text-sm text-gray-500">{metric.unit}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge className={`text-xs ${getStatusColor(metric.status)}`}>{metric.status}</Badge>
                          </div>
                          <span className="text-xs text-gray-500 mt-1 block">{metric.lastUpdated}</span>
                        </div>

                        <div className="ml-4">
                          <CircularProgress value={metric.score} size={60} strokeWidth={4} showValue={false} />
                          <div className="text-center mt-1">
                            <span className="text-xs font-medium text-gray-600">{metric.score}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Smart Device Integration */}
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-900">Connected Devices</CardTitle>
                  <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700 bg-transparent">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Device
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {connectedDevices.map((device) => (
                    <div
                      key={device.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            device.status === "connected" ? "bg-green-100" : "bg-gray-100"
                          }`}
                        >
                          {device.status === "connected" ? (
                            <Bluetooth className="h-5 w-5 text-green-600" />
                          ) : (
                            <Smartphone className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{device.name}</p>
                          <p className="text-sm text-gray-600">{device.type}</p>
                          <p className="text-xs text-gray-500">Last sync: {device.lastSync}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {device.status === "connected" && (
                          <div className="text-right">
                            <p className="text-xs text-gray-500">Battery</p>
                            <p className="text-sm font-medium text-gray-900">{device.battery}%</p>
                          </div>
                        )}
                        <Badge
                          className={`text-xs ${
                            device.status === "connected" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {device.status}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeviceSync(device.id)}
                          disabled={device.status === "disconnected"}
                        >
                          Sync
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Consultations */}
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-900">Recent Consultations</CardTitle>
                  <Link href="/consultations">
                    <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                      View All <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentConsultations.map((consultation) => (
                    <div
                      key={consultation.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{consultation.doctor}</p>
                        <p className="text-sm text-gray-600">{consultation.specialty}</p>
                        <p className="text-sm text-gray-500 mt-1">{consultation.diagnosis}</p>
                        <p className="text-xs text-gray-400">{consultation.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < consultation.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Medications */}
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-900">Medications</CardTitle>
                  <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medications.map((medication, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{medication.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {medication.dosage}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{medication.frequency}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Remaining</span>
                          <span className="text-gray-900">
                            {medication.remaining}/{medication.total} pills
                          </span>
                        </div>
                        <Progress value={(medication.remaining / medication.total) * 100} className="h-2" />
                        <p className="text-xs text-gray-500">Next refill: {medication.nextRefill}</p>
                      </div>
                      {medication.remaining <= 5 && (
                        <div className="flex items-center mt-2 p-2 bg-yellow-50 rounded">
                          <AlertCircle className="h-4 w-4 text-yellow-600 mr-2" />
                          <span className="text-xs text-yellow-700">Low stock - refill soon</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Health Tips */}
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Health Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start">
                      <Activity className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">Stay Active</h4>
                        <p className="text-sm text-blue-700">
                          Aim for 30 minutes of moderate exercise daily to maintain good cardiovascular health.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-start">
                      <Heart className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
                      <div>
                        <h4 className="font-medium text-green-900 mb-1">Monitor Blood Pressure</h4>
                        <p className="text-sm text-green-700">
                          Regular monitoring helps detect changes early and manage hypertension effectively.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-start">
                      <Pill className="h-5 w-5 text-purple-600 mt-0.5 mr-3" />
                      <div>
                        <h4 className="font-medium text-purple-900 mb-1">Medication Adherence</h4>
                        <p className="text-sm text-purple-700">
                          Take medications as prescribed and set reminders to avoid missing doses.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="bg-red-50 border border-red-200">
              <CardHeader>
                <CardTitle className="text-red-900">Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <p className="text-sm text-red-700 mb-4">For medical emergencies, call immediately</p>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <Phone className="h-4 w-4 mr-2" />
                    Call 911
                  </Button>
                  <p className="text-xs text-red-600 mt-2">Or contact your primary care physician</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

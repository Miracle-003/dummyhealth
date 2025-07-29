"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  Phone,
  MessageCircle,
  ArrowLeft,
  Plus,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

// Appointments management page - shows user's appointments and allows management
export default function AppointmentsPage() {
  // State for managing active tab
  const [activeTab, setActiveTab] = useState("upcoming")

  // Sample appointments data - would come from API
  const appointments = {
    upcoming: [
      {
        id: 1,
        doctor: {
          name: "Dr. Sarah Wilson",
          specialty: "Cardiologist",
          image: "/placeholder.svg?height=60&width=60&text=Dr.Sarah",
        },
        date: "2024-02-15",
        time: "10:00 AM",
        type: "Video Consultation",
        status: "confirmed",
        location: "Online",
        duration: "30 minutes",
        reason: "Follow-up consultation for heart condition",
      },
      {
        id: 2,
        doctor: {
          name: "Dr. Michael Chen",
          specialty: "Dermatologist",
          image: "/placeholder.svg?height=60&width=60&text=Dr.Michael",
        },
        date: "2024-02-18",
        time: "2:30 PM",
        type: "In-Person Visit",
        status: "confirmed",
        location: "Medical Center, Los Angeles",
        duration: "45 minutes",
        reason: "Skin examination and treatment",
      },
    ],
    past: [
      {
        id: 3,
        doctor: {
          name: "Dr. Emily Rodriguez",
          specialty: "Pediatrician",
          image: "/placeholder.svg?height=60&width=60&text=Dr.Emily",
        },
        date: "2024-01-20",
        time: "11:00 AM",
        type: "Video Consultation",
        status: "completed",
        location: "Online",
        duration: "25 minutes",
        reason: "Child health checkup",
      },
    ],
    cancelled: [
      {
        id: 4,
        doctor: {
          name: "Dr. James Thompson",
          specialty: "Orthopedic Surgeon",
          image: "/placeholder.svg?height=60&width=60&text=Dr.James",
        },
        date: "2024-01-15",
        time: "3:00 PM",
        type: "In-Person Visit",
        status: "cancelled",
        location: "Orthopedic Clinic, Houston",
        duration: "60 minutes",
        reason: "Knee pain consultation",
      },
    ],
  }

  // Function to get status icon and color
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "confirmed":
        return { icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" }
      case "completed":
        return { icon: CheckCircle, color: "text-blue-600", bg: "bg-blue-100" }
      case "cancelled":
        return { icon: XCircle, color: "text-red-600", bg: "bg-red-100" }
      default:
        return { icon: AlertCircle, color: "text-yellow-600", bg: "bg-yellow-100" }
    }
  }

  // Function to get consultation type icon
  const getConsultationIcon = (type: string) => {
    switch (type) {
      case "Video Consultation":
        return Video
      case "Phone Consultation":
        return Phone
      case "In-Person Visit":
        return MapPin
      default:
        return Calendar
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="mr-4">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
            </div>

            {/* Book new appointment button */}
            <Link href="/doctors">
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Book Appointment
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Appointments Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Upcoming ({appointments.upcoming.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Past ({appointments.past.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              Cancelled ({appointments.cancelled.length})
            </TabsTrigger>
          </TabsList>

          {/* Upcoming Appointments */}
          <TabsContent value="upcoming" className="space-y-4">
            {appointments.upcoming.length > 0 ? (
              appointments.upcoming.map((appointment) => {
                const StatusIcon = getStatusDisplay(appointment.status).icon
                const ConsultationIcon = getConsultationIcon(appointment.type)

                return (
                  <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Appointment Info */}
                        <div className="flex items-start gap-4">
                          {/* Doctor Avatar */}
                          <Avatar className="w-16 h-16">
                            <AvatarImage
                              src={appointment.doctor.image || "/placeholder.svg"}
                              alt={appointment.doctor.name}
                            />
                            <AvatarFallback>
                              {appointment.doctor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          {/* Appointment Details */}
                          <div className="flex-1 space-y-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{appointment.doctor.name}</h3>
                              <p className="text-green-600 font-medium">{appointment.doctor.specialty}</p>
                            </div>

                            {/* Date and Time */}
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(appointment.date).toLocaleDateString("en-US", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {appointment.time} ({appointment.duration})
                              </div>
                            </div>

                            {/* Consultation Type and Location */}
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <ConsultationIcon className="h-4 w-4 mr-1" />
                                {appointment.type}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {appointment.location}
                              </div>
                            </div>

                            {/* Reason */}
                            <p className="text-sm text-gray-700">
                              <strong>Reason:</strong> {appointment.reason}
                            </p>

                            {/* Status Badge */}
                            <Badge
                              className={`${getStatusDisplay(appointment.status).bg} ${getStatusDisplay(appointment.status).color} border-0`}
                            >
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </Badge>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2 min-w-[200px]">
                          {appointment.type === "Video Consultation" && (
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                              <Video className="h-4 w-4 mr-2" />
                              Join Video Call
                            </Button>
                          )}

                          <div className="flex gap-2">
                            <Button variant="outline" className="flex-1 bg-transparent">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Message
                            </Button>
                            <Button variant="outline" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              className="flex-1 text-blue-600 hover:text-blue-700 bg-transparent"
                            >
                              Reschedule
                            </Button>
                            <Button variant="outline" className="flex-1 text-red-600 hover:text-red-700 bg-transparent">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            ) : (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No upcoming appointments</h3>
                <p className="text-gray-600 mb-4">Book your first appointment with our qualified doctors.</p>
                <Link href="/doctors">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>

          {/* Past Appointments */}
          <TabsContent value="past" className="space-y-4">
            {appointments.past.map((appointment) => {
              const StatusIcon = getStatusDisplay(appointment.status).icon
              const ConsultationIcon = getConsultationIcon(appointment.type)

              return (
                <Card key={appointment.id} className="opacity-75">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Similar structure as upcoming but with different actions */}
                      <div className="flex items-start gap-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage
                            src={appointment.doctor.image || "/placeholder.svg"}
                            alt={appointment.doctor.name}
                          />
                          <AvatarFallback>
                            {appointment.doctor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{appointment.doctor.name}</h3>
                            <p className="text-green-600 font-medium">{appointment.doctor.specialty}</p>
                          </div>

                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(appointment.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {appointment.time}
                            </div>
                          </div>

                          <Badge
                            className={`${getStatusDisplay(appointment.status).bg} ${getStatusDisplay(appointment.status).color} border-0`}
                          >
                            <StatusIcon className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        </div>
                      </div>

                      {/* Past appointment actions */}
                      <div className="flex flex-col gap-2 min-w-[200px]">
                        <Button className="w-full bg-green-600 hover:bg-green-700">Book Again</Button>
                        <Button variant="outline" className="w-full bg-transparent">
                          Leave Review
                        </Button>
                        <Button variant="outline" className="w-full bg-transparent">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </TabsContent>

          {/* Cancelled Appointments */}
          <TabsContent value="cancelled" className="space-y-4">
            {appointments.cancelled.map((appointment) => {
              const StatusIcon = getStatusDisplay(appointment.status).icon

              return (
                <Card key={appointment.id} className="opacity-60">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage
                            src={appointment.doctor.image || "/placeholder.svg"}
                            alt={appointment.doctor.name}
                          />
                          <AvatarFallback>
                            {appointment.doctor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{appointment.doctor.name}</h3>
                            <p className="text-green-600 font-medium">{appointment.doctor.specialty}</p>
                          </div>

                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(appointment.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {appointment.time}
                            </div>
                          </div>

                          <Badge
                            className={`${getStatusDisplay(appointment.status).bg} ${getStatusDisplay(appointment.status).color} border-0`}
                          >
                            <StatusIcon className="h-3 w-3 mr-1" />
                            Cancelled
                          </Badge>
                        </div>
                      </div>

                      {/* Cancelled appointment actions */}
                      <div className="flex flex-col gap-2 min-w-[200px]">
                        <Button className="w-full bg-green-600 hover:bg-green-700">Book Again</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

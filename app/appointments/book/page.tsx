"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  ArrowLeft,
  CalendarIcon,
  Clock,
  Video,
  Phone,
  MessageCircle,
  Star,
  MapPin,
  CheckCircle,
  Sparkles,
  Heart,
  Stethoscope,
  Brain,
  Eye,
} from "lucide-react"
import { format } from "date-fns"

// Sample recent appointments for recommendations
const recentAppointments = [
  {
    doctorId: "dr-sarah-wilson",
    doctor: "Dr. Sarah Wilson",
    specialty: "Cardiologist",
    lastVisit: "2024-01-15",
    reason: "Heart checkup",
  },
  {
    doctorId: "dr-michael-chen",
    doctor: "Dr. Michael Chen",
    specialty: "Dermatologist",
    lastVisit: "2024-01-10",
    reason: "Skin examination",
  },
  {
    doctorId: "dr-jennifer-lee",
    doctor: "Dr. Jennifer Lee",
    specialty: "Pediatrician",
    lastVisit: "2024-01-05",
    reason: "Child checkup",
  },
]

// Sample doctors data with verification status
const doctors = [
  {
    id: "dr-sarah-wilson",
    name: "Dr. Sarah Wilson",
    specialty: "Cardiologist",
    rating: 4.9,
    reviews: 127,
    experience: "15 years",
    consultationFee: 150,
    avatar: "/placeholder.svg?height=60&width=60&text=SW",
    isVerified: true,
    licenseVerified: true,
    faceVerified: true,
    nextAvailable: "Today 2:00 PM",
    location: "Heart Care Center, NYC",
    languages: ["English", "Spanish"],
  },
  {
    id: "dr-michael-chen",
    name: "Dr. Michael Chen",
    specialty: "Dermatologist",
    rating: 4.8,
    reviews: 89,
    experience: "12 years",
    consultationFee: 120,
    avatar: "/placeholder.svg?height=60&width=60&text=MC",
    isVerified: true,
    licenseVerified: true,
    faceVerified: true,
    nextAvailable: "Tomorrow 10:00 AM",
    location: "Skin Health Clinic, NYC",
    languages: ["English", "Mandarin"],
  },
  {
    id: "dr-jennifer-lee",
    name: "Dr. Jennifer Lee",
    specialty: "Pediatrician",
    rating: 4.7,
    reviews: 156,
    experience: "10 years",
    consultationFee: 100,
    avatar: "/placeholder.svg?height=60&width=60&text=JL",
    isVerified: false,
    licenseVerified: true,
    faceVerified: false,
    nextAvailable: "Dec 20, 3:00 PM",
    location: "Children's Health Center, NYC",
    languages: ["English", "Korean"],
  },
  {
    id: "dr-robert-kim",
    name: "Dr. Robert Kim",
    specialty: "General Physician",
    rating: 4.6,
    reviews: 203,
    experience: "8 years",
    consultationFee: 80,
    avatar: "/placeholder.svg?height=60&width=60&text=RK",
    isVerified: true,
    licenseVerified: true,
    faceVerified: true,
    nextAvailable: "Dec 18, 11:00 AM",
    location: "Family Care Clinic, NYC",
    languages: ["English"],
  },
]

// Auto-recommend doctors based on recent appointments
const getRecommendedDoctors = () => {
  const recentDoctorIds = recentAppointments.map((apt) => apt.doctorId)
  const recommended = doctors.filter((doctor) => recentDoctorIds.includes(doctor.id))
  const others = doctors.filter((doctor) => !recentDoctorIds.includes(doctor.id))
  return [...recommended, ...others]
}

export default function BookAppointmentPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<string>("")
  const [appointmentType, setAppointmentType] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [symptoms, setSymptoms] = useState<string>("")
  const [showRecommended, setShowRecommended] = useState(true)

  const recommendedDoctors = getRecommendedDoctors()
  const availableTimes = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
  ]

  const getSpecialtyIcon = (specialty: string) => {
    switch (specialty.toLowerCase()) {
      case "cardiologist":
        return <Heart className="h-5 w-5 text-red-500" />
      case "dermatologist":
        return <Stethoscope className="h-5 w-5 text-blue-500" />
      case "pediatrician":
        return <Heart className="h-5 w-5 text-pink-500" />
      case "neurologist":
        return <Brain className="h-5 w-5 text-purple-500" />
      case "ophthalmologist":
        return <Eye className="h-5 w-5 text-green-500" />
      default:
        return <Stethoscope className="h-5 w-5 text-gray-500" />
    }
  }

  const getVerificationBadge = (doctor: any) => {
    if (doctor.isVerified && doctor.licenseVerified && doctor.faceVerified) {
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Fully Verified
        </Badge>
      )
    } else if (doctor.licenseVerified && !doctor.faceVerified) {
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">License Verified</Badge>
    } else {
      return <Badge className="bg-red-100 text-red-800 border-red-200">Verification Pending</Badge>
    }
  }

  const handleBookAppointment = () => {
    if (!selectedDoctor || !appointmentType || !selectedDate || !selectedTime) {
      alert("Please fill in all required fields")
      return
    }

    // Here you would typically make an API call to book the appointment
    alert("Appointment booked successfully!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/appointments" className="mr-4">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Book Appointment</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Doctor Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Auto-Recommend Section */}
            {showRecommended && recentAppointments.length > 0 && (
              <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-900">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Recommended for You
                  </CardTitle>
                  <CardDescription className="text-blue-700">
                    Based on your recent appointments and medical history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentAppointments.slice(0, 2).map((appointment, index) => {
                      const doctor = doctors.find((d) => d.id === appointment.doctorId)
                      if (!doctor) return null

                      return (
                        <div
                          key={appointment.doctorId}
                          className={`p-4 bg-white rounded-lg border-2 cursor-pointer transition-all ${
                            selectedDoctor === doctor.id
                              ? "border-green-500 bg-green-50"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                          onClick={() => setSelectedDoctor(doctor.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={doctor.avatar || "/placeholder.svg"} alt={doctor.name} />
                                <AvatarFallback>
                                  {doctor.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                                <p className="text-sm text-gray-600">{doctor.specialty}</p>
                                <p className="text-xs text-blue-600">
                                  Last visit: {appointment.lastVisit} for {appointment.reason}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              {getVerificationBadge(doctor)}
                              <p className="text-sm text-gray-600 mt-1">${doctor.consultationFee}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* All Doctors */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Available Doctors</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setShowRecommended(!showRecommended)}>
                    {showRecommended ? "Show All" : "Show Recommended"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedDoctor === doctor.id
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedDoctor(doctor.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={doctor.avatar || "/placeholder.svg"} alt={doctor.name} />
                            <AvatarFallback>
                              {doctor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                              {getSpecialtyIcon(doctor.specialty)}
                            </div>
                            <p className="text-green-600 font-medium">{doctor.specialty}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                <span>
                                  {doctor.rating} ({doctor.reviews} reviews)
                                </span>
                              </div>
                              <span>{doctor.experience} experience</span>
                            </div>
                            <div className="flex items-center mt-1 text-sm text-gray-500">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>{doctor.location}</span>
                            </div>
                            <div className="flex items-center mt-1 text-sm text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>Next available: {doctor.nextAvailable}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          {getVerificationBadge(doctor)}
                          <p className="text-lg font-semibold text-gray-900 mt-2">${doctor.consultationFee}</p>
                          <p className="text-xs text-gray-500">consultation fee</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Appointment Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Consultation Type */}
                <div className="space-y-2">
                  <Label>Consultation Type</Label>
                  <Select value={appointmentType} onValueChange={setAppointmentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select consultation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">
                        <div className="flex items-center">
                          <Video className="h-4 w-4 mr-2" />
                          Video Consultation
                        </div>
                      </SelectItem>
                      <SelectItem value="phone">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          Phone Consultation
                        </div>
                      </SelectItem>
                      <SelectItem value="chat">
                        <div className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Chat Consultation
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Selection */}
                <div className="space-y-2">
                  <Label>Preferred Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time Selection */}
                <div className="space-y-2">
                  <Label>Preferred Time</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTimes.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Symptoms/Reason */}
                <div className="space-y-2">
                  <Label>Symptoms or Reason for Visit</Label>
                  <Textarea
                    placeholder="Describe your symptoms or reason for the appointment..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Book Appointment Button */}
                <Button
                  onClick={handleBookAppointment}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={!selectedDoctor || !appointmentType || !selectedDate || !selectedTime}
                >
                  Book Appointment
                </Button>

                {/* Selected Doctor Summary */}
                {selectedDoctor && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Appointment Summary</h4>
                    {(() => {
                      const doctor = doctors.find((d) => d.id === selectedDoctor)
                      return doctor ? (
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>
                            <strong>Doctor:</strong> {doctor.name}
                          </p>
                          <p>
                            <strong>Specialty:</strong> {doctor.specialty}
                          </p>
                          <p>
                            <strong>Type:</strong> {appointmentType}
                          </p>
                          <p>
                            <strong>Date:</strong> {selectedDate ? format(selectedDate, "PPP") : "Not selected"}
                          </p>
                          <p>
                            <strong>Time:</strong> {selectedTime || "Not selected"}
                          </p>
                          <p>
                            <strong>Fee:</strong> ${doctor.consultationFee}
                          </p>
                        </div>
                      ) : null
                    })()}
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

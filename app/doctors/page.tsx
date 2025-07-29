"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  Calendar,
  MessageCircle,
  Video,
  Phone,
  Heart,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

// Doctors listing page - allows users to search and filter doctors
export default function DoctorsPage() {
  // State for search and filter functionality
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [sortBy, setSortBy] = useState("rating")

  // Sample doctors data - would come from API in production
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      rating: 4.9,
      reviews: 127,
      image: "/placeholder.svg?height=150&width=150&text=Dr.Sarah",
      experience: "15 years",
      location: "New York, NY",
      available: true,
      consultationFee: 150,
      languages: ["English", "Spanish"],
      education: "Harvard Medical School",
      about: "Specialized in cardiovascular diseases with extensive experience in interventional cardiology.",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Dermatologist",
      rating: 4.8,
      reviews: 89,
      image: "/placeholder.svg?height=150&width=150&text=Dr.Michael",
      experience: "12 years",
      location: "Los Angeles, CA",
      available: true,
      consultationFee: 120,
      languages: ["English", "Mandarin"],
      education: "Stanford University School of Medicine",
      about: "Expert in skin conditions, cosmetic dermatology, and dermatologic surgery.",
    },
    // Add more doctors here...
  ]

  // Specialty options for filtering
  const specialties = [
    "All Specialties",
    "Cardiologist",
    "Dermatologist",
    "Pediatrician",
    "Orthopedic Surgeon",
    "Psychiatrist",
    "General Practitioner",
    "Neurologist",
    "Gynecologist",
  ]

  // Filter doctors based on search criteria
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty =
      !selectedSpecialty || selectedSpecialty === "All Specialties" || doctor.specialty === selectedSpecialty
    const matchesLocation = !selectedLocation || doctor.location.toLowerCase().includes(selectedLocation.toLowerCase())

    return matchesSearch && matchesSpecialty && matchesLocation
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="mr-4">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Find Doctors</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Search input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search doctors, specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Specialty filter */}
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Select Specialty" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Location filter */}
            <Input
              placeholder="Location (City, State)"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            />

            {/* Sort options */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="experience">Most Experienced</SelectItem>
                <SelectItem value="fee">Lowest Fee</SelectItem>
                <SelectItem value="availability">Available Now</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results count */}
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Showing {filteredDoctors.length} doctors</p>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Doctor Image and Basic Info */}
                  <div className="flex-shrink-0">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
                      <AvatarFallback>
                        {doctor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Doctor Details */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                      <p className="text-green-600 font-medium">{doctor.specialty}</p>
                    </div>

                    {/* Rating and Reviews */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 font-medium">{doctor.rating}</span>
                      </div>
                      <span className="text-gray-500">({doctor.reviews} reviews)</span>
                      <Badge
                        variant={doctor.available ? "default" : "secondary"}
                        className={doctor.available ? "bg-green-100 text-green-800" : ""}
                      >
                        {doctor.available ? "Available" : "Busy"}
                      </Badge>
                    </div>

                    {/* Location and Experience */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {doctor.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {doctor.experience} experience
                      </div>
                    </div>

                    {/* Languages and Education */}
                    <div className="text-sm text-gray-600">
                      <p>
                        <strong>Languages:</strong> {doctor.languages.join(", ")}
                      </p>
                      <p>
                        <strong>Education:</strong> {doctor.education}
                      </p>
                    </div>

                    {/* About */}
                    <p className="text-sm text-gray-600 line-clamp-2">{doctor.about}</p>

                    {/* Consultation Fee */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-blue-600">${doctor.consultationFee}</span>
                        <span className="text-gray-500 ml-1">consultation</span>
                      </div>

                      {/* Favorite button */}
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500">
                        <Heart className="h-5 w-5" />
                      </Button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1 bg-green-600 hover:bg-green-700" disabled={!doctor.available}>
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Appointment
                      </Button>
                      <Button variant="outline" size="icon">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {filteredDoctors.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Doctors
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or browse all available doctors.</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedSpecialty("")
                setSelectedLocation("")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

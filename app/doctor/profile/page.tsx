"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Camera,
  Upload,
  CheckCircle,
  XCircle,
  AlertCircle,
  Shield,
  FileText,
  User,
  Clock,
  Star,
  Edit,
  Save,
  X,
} from "lucide-react"

export default function DoctorProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [verificationStep, setVerificationStep] = useState<"license" | "face" | "complete" | null>(null)
  const [licenseFile, setLicenseFile] = useState<File | null>(null)
  const [facePhoto, setFacePhoto] = useState<File | null>(null)

  // Doctor profile data
  const [doctorProfile, setDoctorProfile] = useState({
    name: "Dr. Sarah Wilson",
    email: "sarah.wilson@medicare.com",
    phone: "+1 (555) 123-4567",
    specialty: "Cardiologist",
    experience: "15 years",
    education: "MD from Harvard Medical School",
    licenseNumber: "MD123456789",
    bio: "Experienced cardiologist specializing in preventive cardiology and heart disease management. Committed to providing comprehensive cardiac care with a focus on patient education and lifestyle modifications.",
    languages: ["English", "Spanish"],
    consultationFee: 150,
    avatar: "/placeholder.svg?height=120&width=120&text=SW",

    // Verification status
    isVerified: false,
    licenseVerified: true,
    faceVerified: false,
    verificationProgress: 50,
  })

  const handleLicenseUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setLicenseFile(file)
      // Simulate verification process
      setTimeout(() => {
        setDoctorProfile((prev) => ({
          ...prev,
          licenseVerified: true,
          verificationProgress: 75,
        }))
        setVerificationStep("face")
      }, 2000)
    }
  }

  const handleFacePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFacePhoto(file)
      // Simulate face verification process
      setTimeout(() => {
        setDoctorProfile((prev) => ({
          ...prev,
          faceVerified: true,
          isVerified: true,
          verificationProgress: 100,
        }))
        setVerificationStep("complete")
      }, 3000)
    }
  }

  const getVerificationStatus = () => {
    if (doctorProfile.isVerified && doctorProfile.licenseVerified && doctorProfile.faceVerified) {
      return {
        status: "Fully Verified",
        color: "bg-green-100 text-green-800 border-green-200",
        icon: <CheckCircle className="h-4 w-4" />,
      }
    } else if (doctorProfile.licenseVerified && !doctorProfile.faceVerified) {
      return {
        status: "License Verified",
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: <AlertCircle className="h-4 w-4" />,
      }
    } else {
      return {
        status: "Verification Pending",
        color: "bg-red-100 text-red-800 border-red-200",
        icon: <XCircle className="h-4 w-4" />,
      }
    }
  }

  const verificationStatus = getVerificationStatus()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/doctor/dashboard" className="mr-4">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "outline" : "default"}
              className={isEditing ? "" : "bg-green-600 hover:bg-green-700"}
            >
              {isEditing ? (
                <>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Verification Status Card */}
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-blue-600" />
                    Verification Status
                  </CardTitle>
                  <CardDescription>Complete your verification to appear as verified to patients</CardDescription>
                </div>
                <Badge className={verificationStatus.color}>
                  {verificationStatus.icon}
                  <span className="ml-1">{verificationStatus.status}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Verification Progress</span>
                    <span>{doctorProfile.verificationProgress}%</span>
                  </div>
                  <Progress value={doctorProfile.verificationProgress} className="h-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* License Verification */}
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-blue-600" />
                        <span className="font-medium">License Verification</span>
                      </div>
                      {doctorProfile.licenseVerified ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    {!doctorProfile.licenseVerified ? (
                      <div>
                        <p className="text-sm text-gray-600 mb-3">Upload your medical license for verification</p>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleLicenseUpload}
                          className="hidden"
                          id="license-upload"
                        />
                        <label htmlFor="license-upload">
                          <Button variant="outline" className="w-full bg-transparent" asChild>
                            <span>
                              <Upload className="h-4 w-4 mr-2" />
                              Upload License
                            </span>
                          </Button>
                        </label>
                      </div>
                    ) : (
                      <p className="text-sm text-green-600">License verified successfully</p>
                    )}
                  </div>

                  {/* Face Verification */}
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <User className="h-5 w-5 mr-2 text-blue-600" />
                        <span className="font-medium">Face Verification</span>
                      </div>
                      {doctorProfile.faceVerified ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    {!doctorProfile.faceVerified ? (
                      <div>
                        <p className="text-sm text-gray-600 mb-3">
                          Take a clear photo of yourself for identity verification
                        </p>
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          onChange={handleFacePhotoUpload}
                          className="hidden"
                          id="face-upload"
                        />
                        <label htmlFor="face-upload">
                          <Button
                            variant="outline"
                            className="w-full bg-transparent"
                            disabled={!doctorProfile.licenseVerified}
                            asChild
                          >
                            <span>
                              <Camera className="h-4 w-4 mr-2" />
                              Take Photo
                            </span>
                          </Button>
                        </label>
                        {!doctorProfile.licenseVerified && (
                          <p className="text-xs text-gray-500 mt-2">Complete license verification first</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-green-600">Face verified successfully</p>
                    )}
                  </div>
                </div>

                {!doctorProfile.isVerified && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
                      <div>
                        <h4 className="font-medium text-yellow-800">Verification Required</h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          Patients can see your verification status. Complete both license and face verification to
                          appear as a fully verified doctor and build trust with patients.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Your profile information as it appears to patients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Avatar and Basic Info */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={doctorProfile.avatar || "/placeholder.svg"} alt={doctorProfile.name} />
                      <AvatarFallback className="text-xl">
                        {doctorProfile.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="icon"
                        variant="outline"
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-transparent"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h2 className="text-2xl font-bold text-gray-900">{doctorProfile.name}</h2>
                      <Badge className={verificationStatus.color}>
                        {verificationStatus.icon}
                        <span className="ml-1">{verificationStatus.status}</span>
                      </Badge>
                    </div>
                    <p className="text-lg text-green-600 font-medium">{doctorProfile.specialty}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{doctorProfile.experience} experience</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-400" />
                        <span>4.9 (127 reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={doctorProfile.name}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={doctorProfile.email}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={doctorProfile.phone}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialty">Specialty</Label>
                    <Input
                      id="specialty"
                      value={doctorProfile.specialty}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      value={doctorProfile.experience}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="license">License Number</Label>
                    <Input
                      id="license"
                      value={doctorProfile.licenseNumber}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fee">Consultation Fee ($)</Label>
                    <Input
                      id="fee"
                      type="number"
                      value={doctorProfile.consultationFee}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="languages">Languages</Label>
                    <Input
                      id="languages"
                      value={doctorProfile.languages.join(", ")}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="education">Education</Label>
                  <Input
                    id="education"
                    value={doctorProfile.education}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    value={doctorProfile.bio}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                    rows={4}
                  />
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-3">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

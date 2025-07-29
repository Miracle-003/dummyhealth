"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, HeadphonesIcon, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

// Contact page - comprehensive contact information and support options
export default function ContactPage() {
  // State for form management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call - replace with actual API integration
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        category: "",
        message: "",
      })
    }, 2000)
  }

  // Contact information data
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      details: ["1-800-MEDICARE", "(1-800-633-4227)"],
      availability: "24/7 Available",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Mail,
      title: "Email Support",
      details: ["support@medicare.com", "emergency@medicare.com"],
      availability: "Response within 2 hours",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: MapPin,
      title: "Office Address",
      details: ["123 Healthcare Avenue", "Medical City, MC 12345"],
      availability: "Mon-Fri: 9AM-6PM",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      details: ["Available on website", "Instant responses"],
      availability: "24/7 Available",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  // FAQ data
  const faqs = [
    {
      question: "How do I book an appointment?",
      answer:
        "You can book an appointment through our website by selecting 'Find Doctors', choosing your preferred healthcare provider, and selecting an available time slot. You can also call our support line at 1-800-MEDICARE for assistance.",
    },
    {
      question: "Is telehealth covered by insurance?",
      answer:
        "Most insurance plans cover telehealth services. We accept major insurance providers and will verify your coverage before your appointment. Contact your insurance provider or our billing team for specific coverage details.",
    },
    {
      question: "How secure is my medical information?",
      answer:
        "We use bank-level encryption and are fully HIPAA compliant. Your medical information is stored securely and only accessible to authorized healthcare providers involved in your care.",
    },
    {
      question: "Can I get prescriptions through telehealth?",
      answer:
        "Yes, our licensed physicians can prescribe medications during telehealth consultations when medically appropriate. Prescriptions are sent directly to your preferred pharmacy or our online pharmacy.",
    },
    {
      question: "What if I need emergency care?",
      answer:
        "For medical emergencies, please call 911 or go to your nearest emergency room immediately. Our telehealth services are designed for non-emergency medical consultations and routine care.",
    },
    {
      question: "How do I access my medical records?",
      answer:
        "You can access your medical records through your patient portal. Log in to your account and navigate to 'Medical Records' to view your consultation history, prescriptions, and test results.",
    },
  ]

  // Support categories for the contact form
  const supportCategories = [
    "General Inquiry",
    "Technical Support",
    "Billing & Insurance",
    "Appointment Scheduling",
    "Prescription Issues",
    "Account Management",
    "Emergency Support",
    "Feedback & Suggestions",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="mr-4">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Contact Us</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help you with any questions about our healthcare services. Reach out to us through any of the
            channels below.
          </p>
        </div>

        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 ${info.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <info.icon className={`h-8 w-8 ${info.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                <div className="space-y-1 mb-3">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
                <Badge className={`${info.bgColor} ${info.color} border-0`}>{info.availability}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="h-5 w-5 mr-2 text-green-600" />
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Phone and Category */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                      <Select
                        required
                        value={formData.category}
                        onValueChange={(value) => handleInputChange("category", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {supportCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                    <Input
                      required
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <Textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-600 mb-4">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)} variant="outline">
                    Send Another Message
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HeadphonesIcon className="h-5 w-5 mr-2 text-blue-600" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-900 mb-2">Emergency Support</h3>
                    <p className="text-red-700 text-sm mb-3">
                      For medical emergencies, please call 911 immediately. For urgent healthcare questions outside of
                      emergencies:
                    </p>
                    <div className="space-y-1">
                      <p className="font-medium text-red-900">Emergency Hotline: 1-800-URGENT-1</p>
                      <p className="text-red-700 text-sm">Available 24/7 for urgent medical consultations</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-purple-600" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Telehealth Services</span>
                      <span className="font-medium text-green-600">24/7 Available</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-green-600" />
              Our Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Medicare Headquarters</h3>
                <div className="space-y-3 text-gray-600">
                  <p>
                    📍 123 Healthcare Avenue
                    <br />
                    Medical City, MC 12345
                  </p>
                  <p>📞 Phone: 1-800-MEDICARE</p>
                  <p>📧 Email: support@medicare.com</p>
                  <p>🌐 Website: www.medicare.com</p>
                </div>
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Getting Here</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Free parking available on-site</li>
                    <li>• Accessible by public transportation</li>
                    <li>• Near Metro Station: Healthcare Plaza</li>
                    <li>• Wheelchair accessible entrance</li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <p className="text-gray-500">Interactive Map Would Be Here</p>
                {/* In production, integrate with Google Maps or similar service */}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

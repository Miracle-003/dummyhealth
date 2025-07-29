"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Heart,
  Stethoscope,
  Shield,
  Smartphone,
  Star,
  ArrowRight,
  Video,
  MessageCircle,
  Pill,
  Clock,
  Award,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useState, useEffect } from "react"

const features = [
  {
    icon: Video,
    title: "Video Consultations",
    description: "Connect with top doctors via secure video calls anytime, anywhere",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: MessageCircle,
    title: "Ask a Doctor",
    description: "Get quick answers to your health questions from verified physicians",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Smartphone,
    title: "Health Monitoring",
    description: "Track your health with connected devices and smart monitoring",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Pill,
    title: "Prescription Management",
    description: "Digital prescriptions with pharmacy delivery and refill reminders",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "HIPAA-compliant platform ensuring your health data stays protected",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Access healthcare professionals around the clock for urgent needs",
    color: "bg-green-100 text-green-600",
  },
]

const stats = [
  { label: "Doctors Available", value: "25,000+" },
  { label: "Patients Helped", value: "10M+" },
  { label: "Questions Answered", value: "50M+" },
  { label: "Countries Served", value: "190+" },
]

const specialties = [
  "Primary Care",
  "Dermatology",
  "Mental Health",
  "Pediatrics",
  "Cardiology",
  "Gynecology",
  "Orthopedics",
  "Neurology",
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Patient",
    content: "Medicare made it so easy to get medical advice quickly. The doctors are professional and caring.",
    rating: 5,
    avatar: "SJ",
  },
  {
    name: "Dr. Michael Chen",
    role: "Cardiologist",
    content: "As a physician, I appreciate Medicare's platform for connecting with patients efficiently.",
    rating: 5,
    avatar: "MC",
  },
  {
    name: "Emily Rodriguez",
    role: "Working Mom",
    content: "Perfect for busy parents! I can consult with pediatricians without leaving work.",
    rating: 5,
    avatar: "ER",
  },
]

// Image carousel data
const carouselImages = [
  {
    id: 1,
    src: "/placeholder.svg?height=600&width=800&text=Doctor+Video+Call",
    alt: "Doctor conducting video consultation",
    title: "Video Consultations",
    description: "Connect with certified doctors through secure video calls",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=600&width=800&text=Health+Monitoring",
    alt: "Patient using health monitoring devices",
    title: "Smart Health Monitoring",
    description: "Track your vitals with connected medical devices",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=600&width=800&text=Digital+Prescription",
    alt: "Digital prescription management",
    title: "Digital Prescriptions",
    description: "Get prescriptions delivered directly to your pharmacy",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=600&width=800&text=24/7+Support",
    alt: "24/7 medical support",
    title: "24/7 Medical Support",
    description: "Access healthcare professionals anytime, anywhere",
  },
]

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">Medicare</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#doctors" className="text-gray-700 hover:text-green-600 font-medium">
                Find Doctors
              </a>
              <a href="#ask" className="text-gray-700 hover:text-green-600 font-medium">
                Ask a Doctor
              </a>
              <a href="#specialties" className="text-gray-700 hover:text-green-600 font-medium">
                Specialties
              </a>
              <a href="#about" className="text-gray-700 hover:text-green-600 font-medium">
                About
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="ghost" className="text-gray-700 hover:text-green-600 font-medium">
                  Log in
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-green-600 hover:bg-green-700 text-white font-medium px-6">Sign up free</Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-100">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
                <a href="#doctors" className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium">
                  Find Doctors
                </a>
                <a href="#ask" className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium">
                  Ask a Doctor
                </a>
                <a href="#specialties" className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium">
                  Specialties
                </a>
                <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium">
                  About
                </a>
                <div className="flex flex-col space-y-2 px-3 py-2">
                  <Link href="/auth/login">
                    <Button variant="ghost" className="w-full justify-start">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Sign up free</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Carousel */}
      <section className="bg-gradient-to-br from-green-50 via-white to-green-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Talk to a doctor
                <span className="text-green-600 block">anytime, anywhere</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Get personalized medical advice from top-rated doctors. Available 24/7 via video, phone, or chat. Your
                health, our priority.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/auth/register">
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-medium"
                  >
                    Ask a doctor now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/doctors">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg font-medium bg-transparent"
                  >
                    Find specialists
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 text-green-600 mr-1" />
                  HIPAA Secure
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 text-green-600 mr-1" />
                  Board Certified
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-green-600 mr-1" />
                  24/7 Available
                </div>
              </div>
            </div>

            {/* Image Carousel */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white">
                <div className="relative h-96 lg:h-[500px]">
                  {carouselImages.map((image, index) => (
                    <div
                      key={image.id}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <img
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <h3 className="text-2xl font-bold mb-2">{image.title}</h3>
                        <p className="text-lg opacity-90">{image.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Carousel Controls */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>

                {/* Carousel Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentSlide ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating consultation card */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-xl shadow-lg p-6 border border-gray-100 hidden lg:block">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Video className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Quick consultation</p>
                    <p className="text-sm text-gray-600">Available now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section id="specialties" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get care for any health concern</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our network of board-certified doctors covers all major medical specialties
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {specialties.map((specialty, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{specialty}</h3>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/specialties">
              <Button
                variant="outline"
                size="lg"
                className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
              >
                View all specialties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why choose Medicare?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience healthcare the way it should be - convenient, accessible, and personalized
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border border-gray-100 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-gray-900 text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How it works</h2>
            <p className="text-xl text-gray-600">Get the care you need in three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Describe your symptoms</h3>
              <p className="text-gray-600 leading-relaxed">
                Tell us about your health concern through our secure platform
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect with a doctor</h3>
              <p className="text-gray-600 leading-relaxed">
                Get matched with a qualified doctor who can help with your specific needs
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Get treatment plan</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive personalized medical advice, prescriptions, and follow-up care
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by millions worldwide</h2>
            <p className="text-xl text-gray-600">See what our patients and doctors are saying</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border border-gray-100 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 leading-relaxed">"{testimonial.content}"</blockquote>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-green-600">{testimonial.avatar}</span>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to talk to a doctor?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join millions of people who trust Medicare for their healthcare needs. Get started today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-medium">
                Ask a doctor now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent px-8 py-4 text-lg font-medium"
            >
              Learn more
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Heart className="h-8 w-8 text-green-500" />
                <span className="ml-2 text-xl font-bold">Medicare</span>
              </div>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Your trusted healthcare platform connecting you with top doctors worldwide.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <span className="text-xs">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <span className="text-xs">t</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <span className="text-xs">in</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">For Patients</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Ask a Doctor
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Find Specialists
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Health Library
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Symptom Checker
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">For Doctors</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Join Medicare
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Doctor Portal
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Medical Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Continuing Education
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Medicare. All rights reserved. | Licensed healthcare platform</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

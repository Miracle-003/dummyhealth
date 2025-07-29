"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { VideoCallInterface } from "@/components/video-call-interface"
import { PhoneCallInterface } from "@/components/phone-call-interface"
import {
  Video,
  Phone,
  MessageCircle,
  ArrowLeft,
  Search,
  Clock,
  Star,
  Download,
  FileText,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
} from "lucide-react"
import Link from "next/link"

// Online consultations page - manages video calls, phone calls, chat, and consultation history
export default function ConsultationsPage() {
  // State for managing active consultation and chat
  const [activeTab, setActiveTab] = useState("active")
  const [chatMessage, setChatMessage] = useState("")
  const [activeCallType, setActiveCallType] = useState<"video" | "phone" | null>(null)
  const [callDuration, setCallDuration] = useState("00:00")
  const [callStatus, setCallStatus] = useState<"connecting" | "ringing" | "connected" | "on-hold">("connected")

  // Ref for auto-scrolling messages
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Sample consultation data - would come from API in production
  const consultations = {
    active: [
      {
        id: 1,
        doctor: {
          name: "Dr. Sarah Wilson",
          specialty: "Cardiologist",
          image: "/placeholder.svg?height=60&width=60&text=Dr.Sarah",
          role: "doctor" as const,
          isOnline: true,
          phoneNumber: "+1 (555) 123-4567",
        },
        type: "Video Call",
        status: "ongoing",
        startTime: "10:00 AM",
        duration: "15 min",
        date: "Today",
        lastMessage: "How are you feeling today?",
        unreadCount: 2,
      },
    ],
    scheduled: [
      {
        id: 2,
        doctor: {
          name: "Dr. Michael Chen",
          specialty: "Dermatologist",
          image: "/placeholder.svg?height=60&width=60&text=Dr.Michael",
          role: "doctor" as const,
          isOnline: true,
        },
        type: "Video Call",
        status: "scheduled",
        scheduledTime: "2:30 PM",
        date: "Today",
        reason: "Skin condition follow-up",
      },
    ],
    history: [
      {
        id: 3,
        doctor: {
          name: "Dr. Emily Rodriguez",
          specialty: "Pediatrician",
          image: "/placeholder.svg?height=60&width=60&text=Dr.Emily",
          role: "doctor" as const,
          isOnline: false,
        },
        type: "Video Call",
        status: "completed",
        date: "Jan 20, 2024",
        duration: "25 min",
        rating: 5,
        prescription: true,
        notes: "Follow-up in 2 weeks",
      },
    ],
  }

  // Enhanced chat messages with better structure
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "doctor",
      senderName: "Dr. Sarah Wilson",
      message: "Hello! How are you feeling today?",
      time: "10:05 AM",
      type: "text",
      avatar: "/placeholder.svg?height=40&width=40&text=Dr.Sarah",
    },
    {
      id: 2,
      sender: "patient",
      senderName: "You",
      message: "Hi Doctor, I'm feeling much better than yesterday. The chest pain has reduced significantly.",
      time: "10:06 AM",
      type: "text",
      avatar: "/placeholder.svg?height=40&width=40&text=You",
    },
    {
      id: 3,
      sender: "doctor",
      senderName: "Dr. Sarah Wilson",
      message: "That's great to hear! Can you describe the pain level on a scale of 1-10?",
      time: "10:07 AM",
      type: "text",
      avatar: "/placeholder.svg?height=40&width=40&text=Dr.Sarah",
    },
    {
      id: 4,
      sender: "patient",
      senderName: "You",
      message: "I'd say it's around 3 now, compared to 7-8 yesterday.",
      time: "10:08 AM",
      type: "text",
      avatar: "/placeholder.svg?height=40&width=40&text=You",
    },
    {
      id: 5,
      sender: "doctor",
      senderName: "Dr. Sarah Wilson",
      message: "Excellent progress! Let's continue with the current medication. I'm sending you a prescription.",
      time: "10:09 AM",
      type: "text",
      avatar: "/placeholder.svg?height=40&width=40&text=Dr.Sarah",
    },
  ])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  // Simulate call duration timer
  useEffect(() => {
    if (activeCallType && callStatus === "connected") {
      const startTime = Date.now()
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000)
        const minutes = Math.floor(elapsed / 60)
        const seconds = elapsed % 60
        setCallDuration(`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [activeCallType, callStatus])

  // Send chat message function
  const sendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        sender: "patient" as const,
        senderName: "You",
        message: chatMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "text" as const,
        avatar: "/placeholder.svg?height=40&width=40&text=You",
      }
      setChatMessages([...chatMessages, newMessage])
      setChatMessage("")

      // Simulate doctor response after 2 seconds
      setTimeout(() => {
        const doctorResponse = {
          id: chatMessages.length + 2,
          sender: "doctor" as const,
          senderName: "Dr. Sarah Wilson",
          message: "Thank you for the update. I'll review this information.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          type: "text" as const,
          avatar: "/placeholder.svg?height=40&width=40&text=Dr.Sarah",
        }
        setChatMessages((prev) => [...prev, doctorResponse])
      }, 2000)
    }
  }

  // Handle call actions
  const startVideoCall = () => {
    setActiveCallType("video")
    setCallStatus("connecting")
    // Simulate connection process
    setTimeout(() => setCallStatus("ringing"), 1000)
    setTimeout(() => setCallStatus("connected"), 3000)
  }

  const startPhoneCall = () => {
    setActiveCallType("phone")
    setCallStatus("connecting")
    setTimeout(() => setCallStatus("ringing"), 1000)
    setTimeout(() => setCallStatus("connected"), 3000)
  }

  const endCall = () => {
    setActiveCallType(null)
    setCallDuration("00:00")
    setCallStatus("connected")
  }

  // If in call mode, show call interface
  if (activeCallType) {
    const participant = {
      ...consultations.active[0].doctor,
      isOnline: true,
    }

    return (
      <div className="fixed inset-0 z-50 bg-black">
        {activeCallType === "video" ? (
          <VideoCallInterface participant={participant} onEndCall={endCall} callDuration={callDuration} />
        ) : (
          <PhoneCallInterface
            participant={participant}
            onEndCall={endCall}
            callDuration={callDuration}
            callStatus={callStatus}
          />
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="mr-4">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-foreground">Consultations</h1>
            </div>

            {/* Search consultations */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search consultations..." className="pl-10" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Consultations List */}
          <div className="lg:col-span-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="active" className="text-xs">
                  Active ({consultations.active.length})
                </TabsTrigger>
                <TabsTrigger value="scheduled" className="text-xs">
                  Scheduled ({consultations.scheduled.length})
                </TabsTrigger>
                <TabsTrigger value="history" className="text-xs">
                  History ({consultations.history.length})
                </TabsTrigger>
              </TabsList>

              {/* Active Consultations */}
              <TabsContent value="active" className="space-y-4">
                {consultations.active.map((consultation) => (
                  <Card
                    key={consultation.id}
                    className="cursor-pointer hover:shadow-md transition-shadow border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage
                            src={consultation.doctor.image || "/placeholder.svg"}
                            alt={consultation.doctor.name}
                          />
                          <AvatarFallback>
                            {consultation.doctor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate">{consultation.doctor.name}</h3>
                          <p className="text-xs text-primary">{consultation.doctor.specialty}</p>
                          <p className="text-xs text-muted-foreground truncate">{consultation.lastMessage}</p>

                          <div className="flex items-center gap-2 mt-1">
                            <Badge className="bg-primary/20 text-primary text-xs">{consultation.status}</Badge>
                            <span className="text-xs text-muted-foreground">{consultation.duration}</span>
                          </div>
                        </div>

                        {consultation.unreadCount > 0 && (
                          <Badge className="bg-destructive text-destructive-foreground text-xs">
                            {consultation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Scheduled Consultations */}
              <TabsContent value="scheduled" className="space-y-4">
                {consultations.scheduled.map((consultation) => (
                  <Card key={consultation.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage
                            src={consultation.doctor.image || "/placeholder.svg"}
                            alt={consultation.doctor.name}
                          />
                          <AvatarFallback>
                            {consultation.doctor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate">{consultation.doctor.name}</h3>
                          <p className="text-xs text-primary">{consultation.doctor.specialty}</p>
                          <p className="text-xs text-muted-foreground">{consultation.reason}</p>

                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{consultation.scheduledTime}</span>
                          </div>
                        </div>

                        <Badge variant="outline" className="text-xs">
                          {consultation.date}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Consultation History */}
              <TabsContent value="history" className="space-y-4">
                {consultations.history.map((consultation) => (
                  <Card key={consultation.id} className="cursor-pointer hover:shadow-md transition-shadow opacity-75">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage
                            src={consultation.doctor.image || "/placeholder.svg"}
                            alt={consultation.doctor.name}
                          />
                          <AvatarFallback>
                            {consultation.doctor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate">{consultation.doctor.name}</h3>
                          <p className="text-xs text-primary">{consultation.doctor.specialty}</p>

                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < consultation.rating ? "text-yellow-400 fill-current" : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>

                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">{consultation.date}</span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{consultation.duration}</span>
                          </div>
                        </div>

                        {consultation.prescription && (
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs">
                            Rx
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Enhanced Chat/Video Interface */}
          <div className="lg:col-span-2">
            {activeTab === "active" && consultations.active.length > 0 ? (
              <Card className="h-[700px] flex flex-col shadow-lg">
                {/* Enhanced Chat Header */}
                <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-primary/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12 border-2 border-primary/20">
                        <AvatarImage
                          src={consultations.active[0].doctor.image || "/placeholder.svg"}
                          alt={consultations.active[0].doctor.name}
                        />
                        <AvatarFallback>
                          {consultations.active[0].doctor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{consultations.active[0].doctor.name}</h3>
                        <p className="text-sm text-primary font-medium">{consultations.active[0].doctor.specialty}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-muted-foreground">Online</span>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Call Controls */}
                    <div className="flex items-center gap-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 shadow-md" onClick={startVideoCall}>
                        <Video className="h-4 w-4 mr-2" />
                        Video Call
                      </Button>
                      <Button variant="outline" size="sm" onClick={startPhoneCall}>
                        <Phone className="h-4 w-4 mr-2" />
                        Voice Call
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Enhanced Chat Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.sender === "patient" ? "flex-row-reverse" : ""}`}
                      >
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.senderName} />
                          <AvatarFallback className="text-xs">
                            {message.senderName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className={`flex flex-col max-w-[70%] ${message.sender === "patient" ? "items-end" : ""}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium text-muted-foreground">{message.senderName}</span>
                            <span className="text-xs text-muted-foreground">{message.time}</span>
                          </div>

                          <div
                            className={`px-4 py-3 rounded-2xl shadow-sm ${
                              message.sender === "patient"
                                ? "bg-primary text-primary-foreground rounded-br-md"
                                : "bg-muted text-foreground rounded-bl-md"
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{message.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Enhanced Message Input */}
                <div className="border-t bg-card p-4">
                  <div className="flex items-end gap-3">
                    <Button variant="ghost" size="icon" className="flex-shrink-0">
                      <Paperclip className="h-5 w-5" />
                    </Button>

                    <div className="flex-1 relative">
                      <Input
                        placeholder="Type your message..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        className="pr-12 py-3 rounded-full border-2 focus:border-primary"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2"
                      >
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button
                      onClick={sendMessage}
                      className="rounded-full w-12 h-12 bg-primary hover:bg-primary/90 shadow-md"
                      disabled={!chatMessage.trim()}
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                    <span>Press Enter to send</span>
                    <span>Dr. Sarah is typing...</span>
                  </div>
                </div>
              </Card>
            ) : (
              /* No Active Consultation */
              <Card className="h-[700px] flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No Active Consultation</h3>
                  <p className="text-muted-foreground mb-4">
                    Select an active consultation to start chatting with your doctor.
                  </p>
                  <Link href="/doctors">
                    <Button className="bg-primary hover:bg-primary/90">Book New Consultation</Button>
                  </Link>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <Video className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Start Video Call</h3>
              <p className="text-sm text-muted-foreground">Connect with available doctors instantly</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <FileText className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">View Prescriptions</h3>
              <p className="text-sm text-muted-foreground">Access your digital prescriptions</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <Download className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Download Reports</h3>
              <p className="text-sm text-muted-foreground">Get your consultation reports</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  MessageCircle,
  UserPlus,
  MoreVertical,
  Pause,
  Play,
} from "lucide-react"

interface PhoneCallInterfaceProps {
  participant: {
    name: string
    avatar: string
    role: "doctor" | "patient"
    isOnline: boolean
    phoneNumber?: string
  }
  onEndCall: () => void
  callDuration: string
  callStatus: "connecting" | "ringing" | "connected" | "on-hold"
}

// Phone Call Interface Component - handles voice-only consultation UI
export function PhoneCallInterface({ participant, onEndCall, callDuration, callStatus }: PhoneCallInterfaceProps) {
  // State management for call controls
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [isSpeakerOn, setIsSpeakerOn] = useState(false)
  const [isOnHold, setIsOnHold] = useState(false)
  const [showKeypad, setShowKeypad] = useState(false)

  // Audio visualization simulation
  const [audioLevels, setAudioLevels] = useState<number[]>([])

  // Simulate audio levels for visual feedback
  useEffect(() => {
    if (callStatus === "connected" && isAudioOn) {
      const interval = setInterval(() => {
        setAudioLevels(Array.from({ length: 5 }, () => Math.random() * 100))
      }, 200)
      return () => clearInterval(interval)
    } else {
      setAudioLevels([])
    }
  }, [callStatus, isAudioOn])

  // Get status color based on call status
  const getStatusColor = () => {
    switch (callStatus) {
      case "connecting":
        return "bg-yellow-600"
      case "ringing":
        return "bg-blue-600 animate-pulse"
      case "connected":
        return "bg-green-600"
      case "on-hold":
        return "bg-orange-600"
      default:
        return "bg-gray-600"
    }
  }

  // Get status text
  const getStatusText = () => {
    switch (callStatus) {
      case "connecting":
        return "Connecting..."
      case "ringing":
        return "Ringing..."
      case "connected":
        return `Connected • ${callDuration}`
      case "on-hold":
        return "On Hold"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-8 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-400 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center space-y-8 max-w-md w-full">
        {/* Participant Avatar */}
        <div className="relative">
          <Avatar className="w-48 h-48 border-8 border-white/20 shadow-2xl">
            <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
            <AvatarFallback className="text-4xl bg-gradient-to-br from-blue-500 to-purple-600">
              {participant.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          {/* Audio Visualization Ring */}
          {callStatus === "connected" && isAudioOn && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-56 h-56 border-4 border-green-400 rounded-full animate-ping opacity-20"></div>
              <div className="absolute w-52 h-52 border-2 border-green-400 rounded-full animate-pulse"></div>
            </div>
          )}

          {/* Role Badge */}
          <Badge
            className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 ${
              participant.role === "doctor" ? "bg-blue-600" : "bg-green-600"
            } text-white px-4 py-1`}
          >
            {participant.role === "doctor" ? "Doctor" : "Patient"}
          </Badge>
        </div>

        {/* Participant Info */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">{participant.name}</h2>
          {participant.phoneNumber && <p className="text-lg text-white/70">{participant.phoneNumber}</p>}
        </div>

        {/* Call Status */}
        <div className="text-center">
          <Badge className={`${getStatusColor()} text-white px-6 py-2 text-lg font-medium`}>{getStatusText()}</Badge>
        </div>

        {/* Audio Levels Visualization */}
        {callStatus === "connected" && isAudioOn && audioLevels.length > 0 && (
          <div className="flex items-end space-x-1 h-12">
            {audioLevels.map((level, index) => (
              <div
                key={index}
                className="bg-green-400 w-2 rounded-full transition-all duration-200"
                style={{ height: `${Math.max(level * 0.4, 8)}px` }}
              />
            ))}
          </div>
        )}

        {/* Call Controls */}
        <div className="flex items-center justify-center space-x-6 mt-8">
          {/* Mute Toggle */}
          <Button
            variant={isAudioOn ? "secondary" : "destructive"}
            size="lg"
            className="rounded-full w-16 h-16 shadow-lg"
            onClick={() => setIsAudioOn(!isAudioOn)}
            title={isAudioOn ? "Mute microphone" : "Unmute microphone"}
          >
            {isAudioOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
          </Button>

          {/* Hold Toggle */}
          <Button
            variant={isOnHold ? "default" : "outline"}
            size="lg"
            className="rounded-full w-16 h-16 shadow-lg"
            onClick={() => setIsOnHold(!isOnHold)}
            title={isOnHold ? "Resume call" : "Put on hold"}
          >
            {isOnHold ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
          </Button>

          {/* End Call */}
          <Button
            variant="destructive"
            size="lg"
            className="rounded-full w-20 h-20 bg-red-600 hover:bg-red-700 shadow-lg"
            onClick={onEndCall}
            title="End call"
          >
            <PhoneOff className="w-8 h-8" />
          </Button>

          {/* Speaker Toggle */}
          <Button
            variant={isSpeakerOn ? "default" : "outline"}
            size="lg"
            className="rounded-full w-16 h-16 shadow-lg"
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            title={isSpeakerOn ? "Turn off speaker" : "Turn on speaker"}
          >
            {isSpeakerOn ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
          </Button>

          {/* Add Participant */}
          <Button
            variant="outline"
            size="lg"
            className="rounded-full w-16 h-16 shadow-lg bg-transparent"
            title="Add participant"
          >
            <UserPlus className="w-6 h-6" />
          </Button>
        </div>

        {/* Additional Controls */}
        <div className="flex items-center space-x-4 mt-6">
          <Button
            variant="outline"
            size="sm"
            className="text-white border-white/20 hover:bg-white/10 bg-transparent"
            onClick={() => setShowKeypad(!showKeypad)}
          >
            Keypad
          </Button>
          <Button variant="outline" size="sm" className="text-white border-white/20 hover:bg-white/10 bg-transparent">
            <MessageCircle className="w-4 h-4 mr-2" />
            Message
          </Button>
          <Button variant="outline" size="sm" className="text-white border-white/20 hover:bg-white/10 bg-transparent">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>

        {/* Status Indicators */}
        <div className="flex space-x-4 mt-4">
          {!isAudioOn && (
            <Badge className="bg-red-600 text-white">
              <MicOff className="w-3 h-3 mr-1" />
              Muted
            </Badge>
          )}
          {isSpeakerOn && (
            <Badge className="bg-blue-600 text-white">
              <Volume2 className="w-3 h-3 mr-1" />
              Speaker On
            </Badge>
          )}
          {isOnHold && (
            <Badge className="bg-orange-600 text-white">
              <Pause className="w-3 h-3 mr-1" />
              On Hold
            </Badge>
          )}
        </div>
      </div>

      {/* Keypad Overlay */}
      {showKeypad && (
        <Card className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-80 bg-black/80 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((key) => (
                <Button
                  key={key}
                  variant="outline"
                  className="h-12 text-white border-white/20 hover:bg-white/10 bg-transparent"
                >
                  {key}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

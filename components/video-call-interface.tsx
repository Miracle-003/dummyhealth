"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Settings,
  Users,
  MessageCircle,
  Share,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
} from "lucide-react"

interface VideoCallInterfaceProps {
  participant: {
    name: string
    avatar: string
    role: "doctor" | "patient"
    isOnline: boolean
  }
  onEndCall: () => void
  callDuration: string
}

// Video Call Interface Component - handles video consultation UI
export function VideoCallInterface({ participant, onEndCall, callDuration }: VideoCallInterfaceProps) {
  // State management for call controls
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [isSpeakerOn, setIsSpeakerOn] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)

  // Auto-hide controls after 3 seconds of inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [showControls])

  // Handle mouse movement to show controls
  const handleMouseMove = () => {
    setShowControls(true)
  }

  return (
    <div className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Main Video Area */}
      <div className="relative w-full h-full">
        {/* Remote Participant Video */}
        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
          {isVideoOn ? (
            // Simulated video feed - in production, this would be the actual video stream
            <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
              <div className="text-center text-white">
                <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-white/20">
                  <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                  <AvatarFallback className="text-2xl">
                    {participant.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-2xl font-semibold">{participant.name}</h3>
                <Badge className={`mt-2 ${participant.role === "doctor" ? "bg-blue-600" : "bg-green-600"}`}>
                  {participant.role === "doctor" ? "Doctor" : "Patient"}
                </Badge>
              </div>
            </div>
          ) : (
            // Video off state
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <div className="text-center text-white">
                <VideoOff className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-lg">Camera is off</p>
              </div>
            </div>
          )}
        </div>

        {/* Self Video (Picture-in-Picture) */}
        <Card className="absolute top-4 right-4 w-48 h-36 bg-gray-700 border-2 border-white/20">
          <CardContent className="p-0 h-full">
            {isVideoOn ? (
              <div className="w-full h-full bg-gradient-to-br from-green-900 to-blue-900 flex items-center justify-center rounded-lg">
                <div className="text-center text-white">
                  <Avatar className="w-16 h-16 mx-auto mb-2">
                    <AvatarImage src="/placeholder.svg?height=64&width=64&text=You" alt="You" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                  <p className="text-sm">You</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-gray-600 flex items-center justify-center rounded-lg">
                <VideoOff className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Call Status */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-red-600 text-white animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
            LIVE • {callDuration}
          </Badge>
        </div>

        {/* Connection Status */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <Badge className={`${participant.isOnline ? "bg-green-600" : "bg-red-600"} text-white`}>
            {participant.isOnline ? "Connected" : "Connecting..."}
          </Badge>
        </div>
      </div>

      {/* Call Controls Overlay */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <div className="flex items-center justify-center space-x-4">
            {/* Audio Toggle */}
            <Button
              variant={isAudioOn ? "secondary" : "destructive"}
              size="lg"
              className="rounded-full w-14 h-14"
              onClick={() => setIsAudioOn(!isAudioOn)}
              title={isAudioOn ? "Mute microphone" : "Unmute microphone"}
            >
              {isAudioOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
            </Button>

            {/* Video Toggle */}
            <Button
              variant={isVideoOn ? "secondary" : "destructive"}
              size="lg"
              className="rounded-full w-14 h-14"
              onClick={() => setIsVideoOn(!isVideoOn)}
              title={isVideoOn ? "Turn off camera" : "Turn on camera"}
            >
              {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
            </Button>

            {/* End Call */}
            <Button
              variant="destructive"
              size="lg"
              className="rounded-full w-16 h-16 bg-red-600 hover:bg-red-700"
              onClick={onEndCall}
              title="End call"
            >
              <PhoneOff className="w-7 h-7" />
            </Button>

            {/* Speaker Toggle */}
            <Button
              variant={isSpeakerOn ? "secondary" : "outline"}
              size="lg"
              className="rounded-full w-14 h-14"
              onClick={() => setIsSpeakerOn(!isSpeakerOn)}
              title={isSpeakerOn ? "Mute speaker" : "Unmute speaker"}
            >
              {isSpeakerOn ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
            </Button>

            {/* Fullscreen Toggle */}
            <Button
              variant="outline"
              size="lg"
              className="rounded-full w-14 h-14 bg-transparent"
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
            </Button>
          </div>

          {/* Additional Controls */}
          <div className="flex items-center justify-center space-x-2 mt-4">
            <Button variant="outline" size="sm" className="text-white border-white/20 hover:bg-white/10 bg-transparent">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Button>
            <Button variant="outline" size="sm" className="text-white border-white/20 hover:bg-white/10 bg-transparent">
              <Share className="w-4 h-4 mr-2" />
              Share Screen
            </Button>
            <Button variant="outline" size="sm" className="text-white border-white/20 hover:bg-white/10 bg-transparent">
              <Users className="w-4 h-4 mr-2" />
              Participants
            </Button>
            <Button variant="outline" size="sm" className="text-white border-white/20 hover:bg-white/10 bg-transparent">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      )}

      {/* Audio/Video Status Indicators */}
      <div className="absolute bottom-20 left-4 flex space-x-2">
        {!isAudioOn && (
          <Badge className="bg-red-600 text-white">
            <MicOff className="w-3 h-3 mr-1" />
            Muted
          </Badge>
        )}
        {!isVideoOn && (
          <Badge className="bg-red-600 text-white">
            <VideoOff className="w-3 h-3 mr-1" />
            Camera Off
          </Badge>
        )}
      </div>
    </div>
  )
}

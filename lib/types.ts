export interface User {
  id: string
  email: string
  role: "patient" | "practitioner" | "admin" | "ancillary"
  profile: UserProfile
  createdAt: string
  updatedAt: string
}

export interface UserProfile {
  firstName: string
  lastName: string
  phone?: string
  profileImage?: string
  dateOfBirth?: string
  gender?: "male" | "female" | "other"
  address?: Address
  emergencyContact?: EmergencyContact
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface EmergencyContact {
  name: string
  relationship: string
  phone: string
}

export interface Doctor {
  id: string
  userId: string
  specialties: string[]
  licenseNumber: string
  yearsOfExperience: number
  education: Education[]
  certifications: Certification[]
  availability: Availability
  rating: number
  reviewCount: number
  consultationFee: number
  isVerified: boolean
  isOnline: boolean
  languages: string[]
}

export interface Education {
  degree: string
  institution: string
  year: number
}

export interface Certification {
  name: string
  issuingBody: string
  issueDate: string
  expiryDate?: string
}

export interface Availability {
  schedule: WeeklySchedule
  isOnCall: boolean
  nextAvailable?: string
}

export interface WeeklySchedule {
  monday: TimeSlot[]
  tuesday: TimeSlot[]
  wednesday: TimeSlot[]
  thursday: TimeSlot[]
  friday: TimeSlot[]
  saturday: TimeSlot[]
  sunday: TimeSlot[]
}

export interface TimeSlot {
  start: string
  end: string
  isAvailable: boolean
}

export interface Appointment {
  id: string
  patientId: string
  doctorId: string
  type: "video" | "phone" | "chat"
  status: "scheduled" | "in-progress" | "completed" | "cancelled"
  scheduledAt: string
  duration: number
  symptoms?: string
  diagnosis?: string
  prescription?: Prescription[]
  notes?: string
  fee: number
  paymentStatus: "pending" | "paid" | "refunded"
}

export interface Prescription {
  id: string
  medication: string
  dosage: string
  frequency: string
  duration: string
  instructions: string
  refills: number
}

export interface MedicalRecord {
  id: string
  patientId: string
  doctorId: string
  appointmentId?: string
  type: "consultation" | "lab-result" | "prescription" | "imaging"
  title: string
  description: string
  attachments: Attachment[]
  createdAt: string
  sharedWith: string[]
}

export interface Attachment {
  id: string
  name: string
  type: string
  url: string
  size: number
}

export interface SmartDevice {
  id: string
  patientId: string
  type: "ecg" | "heart-rate" | "spo2" | "blood-pressure" | "glucose" | "weight"
  brand: string
  model: string
  isConnected: boolean
  lastSync: string
  readings: DeviceReading[]
}

export interface DeviceReading {
  id: string
  value: number | string
  unit: string
  timestamp: string
  notes?: string
}

export interface Payment {
  id: string
  userId: string
  amount: number
  currency: string
  method: "card" | "ussd" | "insurance" | "wallet" | "subscription"
  status: "pending" | "completed" | "failed" | "refunded"
  description: string
  createdAt: string
}

export interface Notification {
  id: string
  userId: string
  type: "appointment" | "prescription" | "payment" | "system"
  title: string
  message: string
  isRead: boolean
  createdAt: string
  actionUrl?: string
}

export interface AncillaryService {
  id: string
  type: "pharmacy" | "lab" | "ambulance" | "logistics"
  name: string
  address: Address
  contact: {
    phone: string
    email: string
  }
  services: string[]
  isActive: boolean
  rating: number
  reviewCount: number
}

export interface Order {
  id: string
  patientId: string
  serviceId: string
  type: "prescription" | "lab-test" | "transport"
  items: OrderItem[]
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled"
  totalAmount: number
  deliveryAddress?: Address
  estimatedDelivery?: string
  trackingNumber?: string
  createdAt: string
}

export interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  instructions?: string
}

export interface DigitalKiosk {
  id: string
  location: string
  address: Address
  status: "online" | "offline" | "maintenance"
  capabilities: string[]
  lastMaintenance: string
  nurseOnDuty?: {
    name: string
    contact: string
  }
}

export interface ConsultationSession {
  id: string
  appointmentId: string
  type: "video" | "phone" | "chat"
  status: "waiting" | "active" | "ended"
  startTime?: string
  endTime?: string
  participants: SessionParticipant[]
  recordings?: string[]
  chatHistory?: ChatMessage[]
}

export interface SessionParticipant {
  userId: string
  role: "patient" | "doctor" | "nurse"
  joinedAt?: string
  leftAt?: string
}

export interface ChatMessage {
  id: string
  senderId: string
  message: string
  timestamp: string
  type: "text" | "image" | "file"
  attachments?: Attachment[]
}

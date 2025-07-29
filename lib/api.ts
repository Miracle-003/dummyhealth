import type {
  User,
  Doctor,
  Appointment,
  MedicalRecord,
  SmartDevice,
  Payment,
  AncillaryService,
  Order,
  ConsultationSession,
} from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    // Add auth token if available
    const token = localStorage.getItem("auth-token")
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }

    const response = await fetch(url, config)

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }

  async register(userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    phone: string
    role: string
  }): Promise<{ user: User; token: string }> {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async logout(): Promise<void> {
    return this.request("/auth/logout", { method: "POST" })
  }

  // User endpoints
  async getProfile(): Promise<User> {
    return this.request("/users/profile")
  }

  async updateProfile(updates: Partial<User["profile"]>): Promise<User> {
    return this.request("/users/profile", {
      method: "PUT",
      body: JSON.stringify(updates),
    })
  }

  // Doctor endpoints
  async getDoctors(filters?: {
    specialty?: string
    availability?: boolean
    rating?: number
  }): Promise<Doctor[]> {
    const params = new URLSearchParams()
    if (filters?.specialty) params.append("specialty", filters.specialty)
    if (filters?.availability) params.append("availability", "true")
    if (filters?.rating) params.append("rating", filters.rating.toString())

    return this.request(`/doctors?${params.toString()}`)
  }

  async getDoctorById(id: string): Promise<Doctor> {
    return this.request(`/doctors/${id}`)
  }

  async updateDoctorAvailability(isOnCall: boolean): Promise<Doctor> {
    return this.request("/doctors/availability", {
      method: "PUT",
      body: JSON.stringify({ isOnCall }),
    })
  }

  // Appointment endpoints
  async getAppointments(userId?: string): Promise<Appointment[]> {
    const endpoint = userId ? `/appointments?userId=${userId}` : "/appointments"
    return this.request(endpoint)
  }

  async createAppointment(appointmentData: {
    doctorId: string
    type: "video" | "phone" | "chat"
    scheduledAt: string
    symptoms?: string
  }): Promise<Appointment> {
    return this.request("/appointments", {
      method: "POST",
      body: JSON.stringify(appointmentData),
    })
  }

  async updateAppointment(id: string, updates: Partial<Appointment>): Promise<Appointment> {
    return this.request(`/appointments/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    })
  }

  async cancelAppointment(id: string): Promise<void> {
    return this.request(`/appointments/${id}/cancel`, { method: "POST" })
  }

  // Medical Records endpoints
  async getMedicalRecords(patientId?: string): Promise<MedicalRecord[]> {
    const endpoint = patientId ? `/medical-records?patientId=${patientId}` : "/medical-records"
    return this.request(endpoint)
  }

  async createMedicalRecord(recordData: Omit<MedicalRecord, "id" | "createdAt">): Promise<MedicalRecord> {
    return this.request("/medical-records", {
      method: "POST",
      body: JSON.stringify(recordData),
    })
  }

  async shareMedicalRecord(recordId: string, doctorIds: string[]): Promise<void> {
    return this.request(`/medical-records/${recordId}/share`, {
      method: "POST",
      body: JSON.stringify({ doctorIds }),
    })
  }

  // Smart Device endpoints
  async getDevices(): Promise<SmartDevice[]> {
    return this.request("/devices")
  }

  async connectDevice(deviceData: {
    type: string
    brand: string
    model: string
  }): Promise<SmartDevice> {
    return this.request("/devices", {
      method: "POST",
      body: JSON.stringify(deviceData),
    })
  }

  async syncDeviceData(deviceId: string): Promise<SmartDevice> {
    return this.request(`/devices/${deviceId}/sync`, { method: "POST" })
  }

  // Payment endpoints
  async getPayments(): Promise<Payment[]> {
    return this.request("/payments")
  }

  async createPayment(paymentData: {
    amount: number
    method: string
    description: string
  }): Promise<Payment> {
    return this.request("/payments", {
      method: "POST",
      body: JSON.stringify(paymentData),
    })
  }

  // Ancillary Services endpoints
  async getAncillaryServices(type?: string): Promise<AncillaryService[]> {
    const endpoint = type ? `/ancillary-services?type=${type}` : "/ancillary-services"
    return this.request(endpoint)
  }

  async createOrder(orderData: {
    serviceId: string
    type: string
    items: Array<{ name: string; quantity: number; price: number }>
    deliveryAddress?: any
  }): Promise<Order> {
    return this.request("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    })
  }

  async getOrders(): Promise<Order[]> {
    return this.request("/orders")
  }

  async trackOrder(orderId: string): Promise<Order> {
    return this.request(`/orders/${orderId}/track`)
  }

  // Consultation endpoints
  async startConsultation(appointmentId: string): Promise<ConsultationSession> {
    return this.request(`/consultations/start`, {
      method: "POST",
      body: JSON.stringify({ appointmentId }),
    })
  }

  async endConsultation(sessionId: string): Promise<void> {
    return this.request(`/consultations/${sessionId}/end`, { method: "POST" })
  }

  async getConsultationHistory(): Promise<ConsultationSession[]> {
    return this.request("/consultations/history")
  }

  // Admin endpoints
  async getUsers(role?: string): Promise<User[]> {
    const endpoint = role ? `/admin/users?role=${role}` : "/admin/users"
    return this.request(endpoint)
  }

  async verifyPractitioner(userId: string, verified: boolean): Promise<void> {
    return this.request(`/admin/practitioners/${userId}/verify`, {
      method: "POST",
      body: JSON.stringify({ verified }),
    })
  }

  async getReports(type: string, dateRange: { start: string; end: string }): Promise<any> {
    return this.request(`/admin/reports/${type}?start=${dateRange.start}&end=${dateRange.end}`)
  }

  async processPayouts(): Promise<void> {
    return this.request("/admin/payouts/process", { method: "POST" })
  }
}

export const apiClient = new ApiClient()

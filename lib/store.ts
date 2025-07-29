import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User, Appointment, Notification, SmartDevice } from "./types"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
  updateProfile: (profile: Partial<User["profile"]>) => void
}

interface UIState {
  sidebarOpen: boolean
  theme: "light" | "dark"
  language: string
  toggleSidebar: () => void
  setTheme: (theme: "light" | "dark") => void
  setLanguage: (language: string) => void
}

interface AppointmentState {
  appointments: Appointment[]
  currentAppointment: Appointment | null
  setAppointments: (appointments: Appointment[]) => void
  addAppointment: (appointment: Appointment) => void
  updateAppointment: (id: string, updates: Partial<Appointment>) => void
  setCurrentAppointment: (appointment: Appointment | null) => void
}

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Notification) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
}

interface DeviceState {
  devices: SmartDevice[]
  connectedDevices: SmartDevice[]
  setDevices: (devices: SmartDevice[]) => void
  addDevice: (device: SmartDevice) => void
  updateDevice: (id: string, updates: Partial<SmartDevice>) => void
  removeDevice: (id: string) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (profile) =>
        set((state) => ({
          user: state.user ? { ...state.user, profile: { ...state.user.profile, ...profile } } : null,
        })),
    }),
    {
      name: "auth-storage",
    },
  ),
)

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: false,
      theme: "light",
      language: "en",
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "ui-storage",
    },
  ),
)

export const useAppointmentStore = create<AppointmentState>((set) => ({
  appointments: [],
  currentAppointment: null,
  setAppointments: (appointments) => set({ appointments }),
  addAppointment: (appointment) => set((state) => ({ appointments: [...state.appointments, appointment] })),
  updateAppointment: (id, updates) =>
    set((state) => ({
      appointments: state.appointments.map((apt) => (apt.id === id ? { ...apt, ...updates } : apt)),
    })),
  setCurrentAppointment: (appointment) => set({ currentAppointment: appointment }),
}))

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((notif) => ({ ...notif, isRead: true })),
      unreadCount: 0,
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((notif) => notif.id !== id),
      unreadCount: state.notifications.find((notif) => notif.id === id && !notif.isRead)
        ? state.unreadCount - 1
        : state.unreadCount,
    })),
}))

export const useDeviceStore = create<DeviceState>((set) => ({
  devices: [],
  connectedDevices: [],
  setDevices: (devices) =>
    set({
      devices,
      connectedDevices: devices.filter((device) => device.isConnected),
    }),
  addDevice: (device) =>
    set((state) => ({
      devices: [...state.devices, device],
      connectedDevices: device.isConnected ? [...state.connectedDevices, device] : state.connectedDevices,
    })),
  updateDevice: (id, updates) =>
    set((state) => {
      const updatedDevices = state.devices.map((device) => (device.id === id ? { ...device, ...updates } : device))
      return {
        devices: updatedDevices,
        connectedDevices: updatedDevices.filter((device) => device.isConnected),
      }
    }),
  removeDevice: (id) =>
    set((state) => ({
      devices: state.devices.filter((device) => device.id !== id),
      connectedDevices: state.connectedDevices.filter((device) => device.id !== id),
    })),
}))

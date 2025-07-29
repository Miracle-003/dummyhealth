"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuthStore, useUIStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  Users,
  Activity,
  Settings,
  Bell,
  LogOut,
  X,
  Heart,
  Stethoscope,
  Pill,
  ShoppingBag,
  BarChart3,
  UserCheck,
  Truck,
  Monitor,
  FileText,
  CreditCard,
  Shield,
} from "lucide-react"

interface SidebarProps {
  userRole: "patient" | "practitioner" | "admin" | "ancillary"
}

const navigationItems = {
  patient: [
    { name: "Dashboard", href: "/patient/dashboard", icon: Activity },
    { name: "Appointments", href: "/patient/appointments", icon: Calendar },
    { name: "Find Doctors", href: "/patient/doctors", icon: Stethoscope },
    { name: "Medical Records", href: "/patient/records", icon: FileText },
    { name: "Pharmacy", href: "/patient/pharmacy", icon: Pill },
    { name: "Marketplace", href: "/patient/marketplace", icon: ShoppingBag },
    { name: "Smart Devices", href: "/patient/devices", icon: Monitor },
    { name: "Payments", href: "/patient/payments", icon: CreditCard },
    { name: "Settings", href: "/patient/settings", icon: Settings },
  ],
  practitioner: [
    { name: "Dashboard", href: "/practitioner/dashboard", icon: Activity },
    { name: "Patient Queue", href: "/practitioner/queue", icon: Users },
    { name: "Appointments", href: "/practitioner/appointments", icon: Calendar },
    { name: "Schedule", href: "/practitioner/schedule", icon: Calendar },
    { name: "Prescriptions", href: "/practitioner/prescriptions", icon: Pill },
    { name: "Referrals", href: "/practitioner/referrals", icon: FileText },
    { name: "Earnings", href: "/practitioner/earnings", icon: CreditCard },
    { name: "Settings", href: "/practitioner/settings", icon: Settings },
  ],
  admin: [
    { name: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
    { name: "User Management", href: "/admin/users", icon: Users },
    { name: "Practitioner Verification", href: "/admin/verification", icon: UserCheck },
    { name: "Queue Management", href: "/admin/queue", icon: Activity },
    { name: "Reports", href: "/admin/reports", icon: FileText },
    { name: "Payouts", href: "/admin/payouts", icon: CreditCard },
    { name: "System Settings", href: "/admin/settings", icon: Settings },
    { name: "Security", href: "/admin/security", icon: Shield },
  ],
  ancillary: [
    { name: "Dashboard", href: "/ancillary/dashboard", icon: Activity },
    { name: "Orders", href: "/ancillary/orders", icon: ShoppingBag },
    { name: "Tracking", href: "/ancillary/tracking", icon: Truck },
    { name: "Billing", href: "/ancillary/billing", icon: CreditCard },
    { name: "Results Upload", href: "/ancillary/results", icon: FileText },
    { name: "Settings", href: "/ancillary/settings", icon: Settings },
  ],
}

export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname()
  const { user, logout } = useAuthStore()
  const { sidebarOpen, toggleSidebar } = useUIStore()

  const navigation = navigationItems[userRole] || []

  const handleLogout = () => {
    logout()
    window.location.href = "/auth/login"
  }

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={toggleSidebar} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900">Medicare</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User Profile */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={user?.profile?.profileImage || "/placeholder.svg"} />
                <AvatarFallback className="bg-green-100 text-green-600">
                  {user?.profile?.firstName?.[0]}
                  {user?.profile?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.profile?.firstName} {user?.profile?.lastName}
                </p>
                <p className="text-xs text-gray-500 capitalize">{userRole}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive ? "bg-green-100 text-green-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900">
              <Bell className="mr-3 h-5 w-5" />
              Notifications
            </Button>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

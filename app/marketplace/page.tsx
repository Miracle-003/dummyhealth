"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  ShoppingCart,
  Filter,
  Star,
  Plus,
  Minus,
  Heart,
  Truck,
  Shield,
  Clock,
  ArrowLeft,
  ShoppingBag,
  Bell,
  User,
  FileText,
  Settings,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Marketplace page - comprehensive medicine and health products shopping
export default function MarketplacePage() {
  // State for cart management and filtering
  const [cart, setCart] = useState<{ [key: number]: number }>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [sortBy, setSortBy] = useState("popularity")

  // Sample user data - would come from authentication context
  const user = {
    name: "John Smith",
    avatar: "/placeholder.svg?height=40&width=40&text=JS",
  }

  // Sample products data - would come from API
  const products = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "Pain Relief",
      price: 12.99,
      originalPrice: 15.99,
      image: "/placeholder.svg?height=200&width=200&text=Paracetamol",
      description: "Effective pain relief and fever reducer",
      manufacturer: "PharmaCorp",
      rating: 4.5,
      reviews: 234,
      inStock: true,
      prescription: false,
      discount: 20,
      fastDelivery: true,
    },
    {
      id: 2,
      name: "Vitamin D3 1000 IU",
      category: "Vitamins & Supplements",
      price: 18.99,
      originalPrice: 22.99,
      image: "/placeholder.svg?height=200&width=200&text=VitaminD3",
      description: "Essential vitamin for bone health and immunity",
      manufacturer: "HealthPlus",
      rating: 4.6,
      reviews: 189,
      inStock: true,
      prescription: false,
      discount: 17,
      fastDelivery: true,
    },
    {
      id: 3,
      name: "Digital Thermometer",
      category: "Medical Devices",
      price: 24.99,
      originalPrice: 29.99,
      image: "/placeholder.svg?height=200&width=200&text=Thermometer",
      description: "Fast and accurate digital thermometer",
      manufacturer: "MediTech",
      rating: 4.4,
      reviews: 156,
      inStock: true,
      prescription: false,
      discount: 17,
      fastDelivery: false,
    },
    {
      id: 4,
      name: "Blood Pressure Monitor",
      category: "Medical Devices",
      price: 89.99,
      originalPrice: 109.99,
      image: "/placeholder.svg?height=200&width=200&text=BP+Monitor",
      description: "Automatic blood pressure monitor with memory",
      manufacturer: "CardioTech",
      rating: 4.7,
      reviews: 298,
      inStock: true,
      prescription: false,
      discount: 18,
      fastDelivery: true,
    },
    {
      id: 5,
      name: "Omega-3 Fish Oil",
      category: "Vitamins & Supplements",
      price: 32.99,
      originalPrice: 39.99,
      image: "/placeholder.svg?height=200&width=200&text=Omega3",
      description: "High-quality omega-3 fatty acids for heart health",
      manufacturer: "NutriWell",
      rating: 4.5,
      reviews: 167,
      inStock: true,
      prescription: false,
      discount: 18,
      fastDelivery: true,
    },
    {
      id: 6,
      name: "First Aid Kit",
      category: "Health & Wellness",
      price: 45.99,
      originalPrice: 55.99,
      image: "/placeholder.svg?height=200&width=200&text=First+Aid",
      description: "Complete first aid kit for home and travel",
      manufacturer: "SafeCare",
      rating: 4.3,
      reviews: 89,
      inStock: true,
      prescription: false,
      discount: 18,
      fastDelivery: false,
    },
  ]

  // Categories for filtering
  const categories = [
    "All Categories",
    "Pain Relief",
    "Vitamins & Supplements",
    "Medical Devices",
    "Health & Wellness",
    "Personal Care",
    "Baby Care",
    "Diabetes Care",
  ]

  // Cart management functions
  const addToCart = (productId: number) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }))
  }

  const removeFromCart = (productId: number) => {
    setCart((prev) => {
      const newCart = { ...prev }
      if (newCart[productId] > 1) {
        newCart[productId]--
      } else {
        delete newCart[productId]
      }
      return newCart
    })
  }

  const getTotalCartItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  }

  const getTotalCartValue = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find((p) => p.id === Number.parseInt(productId))
      return total + (product ? product.price * quantity : 0)
    }, 0)
  }

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      !selectedCategory || selectedCategory === "All Categories" || product.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Logo and Back */}
            <div className="flex items-center space-x-4">
              <Link href="/patient/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <Link href="/" className="text-2xl font-bold text-green-600">
                  Medicare
                </Link>
                <span className="ml-2 text-sm text-gray-500">Marketplace</span>
              </div>
            </div>

            {/* Right side - Profile and Cart */}
            <div className="flex items-center space-x-4">
              {/* Profile */}
              <div className="flex items-center space-x-2 hidden lg:flex">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">{user.name}</span>
              </div>

              {/* Cart */}
              <Button className="relative bg-green-600 hover:bg-green-700 hidden lg:inline-flex">
                <ShoppingCart className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">Cart</span>
                {getTotalCartItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-5">
                    {getTotalCartItems()}
                  </Badge>
                )}
              </Button>

              {/* Mobile Navigation */}
              <div className="lg:hidden flex items-center space-x-2">
                {/* Mobile Marketplace - Icon Only */}
                <Link href="/marketplace">
                  <Button variant="ghost" size="icon" title="Marketplace">
                    <ShoppingBag className="h-5 w-5" />
                  </Button>
                </Link>

                {/* Mobile Notifications */}
                <Button variant="ghost" size="icon" className="relative" title="Notifications">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </Button>

                {/* Mobile Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" title="Profile">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link href="/patient/account" className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        My Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/patient/medical-records" className="flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        Medical Records
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/patient/settings" className="flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Cart */}
                <Button className="relative bg-green-600 hover:bg-green-700" size="icon" title="Cart">
                  <ShoppingCart className="h-5 w-5" />
                  {getTotalCartItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-5">
                      {getTotalCartItems()}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search medicines, devices, supplements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="discount">Best Discount</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="cursor-pointer hover:bg-green-50">
              Fast Delivery
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-green-50">
              Best Sellers
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-green-50">
              On Sale
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-green-50">
              Prescription Free
            </Badge>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-600">Showing {filteredProducts.length} products</p>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Service Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 flex items-center gap-3 shadow-sm">
            <div className="bg-green-100 p-2 rounded-full">
              <Truck className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold">Free Delivery</h3>
              <p className="text-sm text-gray-600">On orders above $50</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 flex items-center gap-3 shadow-sm">
            <div className="bg-blue-100 p-2 rounded-full">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">100% Authentic</h3>
              <p className="text-sm text-gray-600">Genuine products only</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 flex items-center gap-3 shadow-sm">
            <div className="bg-orange-100 p-2 rounded-full">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold">Quick Delivery</h3>
              <p className="text-sm text-gray-600">Same day in metro cities</p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow duration-300 group">
              <CardContent className="p-4">
                {/* Product Image */}
                <div className="relative mb-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Badges */}
                  <div className="absolute top-2 left-2 space-y-1">
                    {product.discount > 0 && (
                      <Badge className="bg-red-500 text-white text-xs">{product.discount}% OFF</Badge>
                    )}
                    {product.fastDelivery && <Badge className="bg-green-500 text-white text-xs">Fast Delivery</Badge>}
                  </div>

                  {/* Wishlist */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>

                  {/* Prescription Required */}
                  {product.prescription && (
                    <Badge className="absolute bottom-2 right-2 bg-orange-500 text-white text-xs">Rx Required</Badge>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-green-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                  <p className="text-xs text-gray-500">by {product.manufacturer}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-green-600">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>

                  {/* Add to Cart */}
                  <div className="pt-2">
                    {cart[product.id] ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => removeFromCart(product.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-medium min-w-[20px] text-center">{cart[product.id]}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => addToCart(product.id)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <span className="text-sm font-medium text-green-600">
                          ${(product.price * cart[product.id]).toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 group-hover:bg-green-700 transition-colors"
                        onClick={() => addToCart(product.id)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cart Summary (Fixed Bottom) */}
        {getTotalCartItems() > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-40">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  {getTotalCartItems()} item{getTotalCartItems() > 1 ? "s" : ""} in cart
                </div>
                <div className="text-lg font-bold text-green-600">Total: ${getTotalCartValue().toFixed(2)}</div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">View Cart</Button>
                <Button className="bg-green-600 hover:bg-green-700">Checkout</Button>
              </div>
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or browse all available products.</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

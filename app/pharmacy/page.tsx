"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ShoppingCart, Plus, Minus, ArrowLeft, Star, Truck, Shield, Clock } from "lucide-react"
import Link from "next/link"

// Online pharmacy page - allows users to browse and purchase medicines
export default function PharmacyPage() {
  // State for cart and search functionality
  const [cart, setCart] = useState<{ [key: number]: number }>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  // Sample medicines data - would come from API
  const medicines = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "Pain Relief",
      price: 12.99,
      originalPrice: 15.99,
      image: "/placeholder.svg?height=150&width=150&text=Paracetamol",
      description: "Effective pain relief and fever reducer",
      manufacturer: "PharmaCorp",
      rating: 4.5,
      reviews: 234,
      inStock: true,
      prescription: false,
      dosage: "500mg tablets",
      pack: "Strip of 10 tablets",
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      category: "Antibiotics",
      price: 24.99,
      originalPrice: 29.99,
      image: "/placeholder.svg?height=150&width=150&text=Amoxicillin",
      description: "Antibiotic for bacterial infections",
      manufacturer: "MediPharm",
      rating: 4.7,
      reviews: 156,
      inStock: true,
      prescription: true,
      dosage: "250mg capsules",
      pack: "Strip of 10 capsules",
    },
    {
      id: 3,
      name: "Vitamin D3 1000 IU",
      category: "Vitamins",
      price: 18.99,
      originalPrice: 22.99,
      image: "/placeholder.svg?height=150&width=150&text=VitaminD3",
      description: "Essential vitamin for bone health",
      manufacturer: "HealthPlus",
      rating: 4.6,
      reviews: 89,
      inStock: true,
      prescription: false,
      dosage: "1000 IU tablets",
      pack: "Bottle of 60 tablets",
    },
  ]

  // Categories for filtering
  const categories = [
    "All Categories",
    "Pain Relief",
    "Antibiotics",
    "Vitamins",
    "Cold & Flu",
    "Digestive Health",
    "Heart Health",
    "Diabetes Care",
  ]

  // Add item to cart
  const addToCart = (medicineId: number) => {
    setCart((prev) => ({
      ...prev,
      [medicineId]: (prev[medicineId] || 0) + 1,
    }))
  }

  // Remove item from cart
  const removeFromCart = (medicineId: number) => {
    setCart((prev) => {
      const newCart = { ...prev }
      if (newCart[medicineId] > 1) {
        newCart[medicineId]--
      } else {
        delete newCart[medicineId]
      }
      return newCart
    })
  }

  // Get total cart items
  const getTotalCartItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  }

  // Filter medicines based on search and category
  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch =
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      !selectedCategory || selectedCategory === "All Categories" || medicine.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="mr-4">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Online Pharmacy</h1>
            </div>

            {/* Cart button */}
            <Button className="relative bg-green-600 hover:bg-green-700">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart
              {getTotalCartItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">{getTotalCartItems()}</Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Search input */}
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search medicines, brands, conditions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quick filters and info */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-green-50">
                Prescription Free
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-green-50">
                Fast Delivery
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-green-50">
                Best Sellers
              </Badge>
            </div>

            <p className="text-gray-600">Showing {filteredMedicines.length} medicines</p>
          </div>
        </div>

        {/* Service Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-full">
              <Truck className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold">Free Delivery</h3>
              <p className="text-sm text-gray-600">On orders above $50</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">100% Authentic</h3>
              <p className="text-sm text-gray-600">Genuine medicines only</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-full">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold">Quick Delivery</h3>
              <p className="text-sm text-gray-600">Same day in metro cities</p>
            </div>
          </div>
        </div>

        {/* Medicines Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedicines.map((medicine) => (
            <Card key={medicine.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4">
                {/* Medicine Image */}
                <div className="relative mb-4">
                  <img
                    src={medicine.image || "/placeholder.svg"}
                    alt={medicine.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  {medicine.prescription && (
                    <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">Rx</Badge>
                  )}
                  {!medicine.inStock && (
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-50 rounded-lg flex items-center justify-center">
                      <span className="text-white font-semibold">Out of Stock</span>
                    </div>
                  )}
                </div>

                {/* Medicine Info */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg line-clamp-2">{medicine.name}</h3>
                  <p className="text-sm text-gray-600">{medicine.dosage}</p>
                  <p className="text-xs text-gray-500">{medicine.pack}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{medicine.description}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{medicine.rating}</span>
                    <span className="text-sm text-gray-500">({medicine.reviews})</span>
                  </div>

                  {/* Manufacturer */}
                  <p className="text-xs text-gray-500">by {medicine.manufacturer}</p>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-green-600">${medicine.price}</span>
                    <span className="text-sm text-gray-500 line-through">${medicine.originalPrice}</span>
                  </div>

                  {/* Add to Cart Section */}
                  <div className="pt-2">
                    {cart[medicine.id] ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => removeFromCart(medicine.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-medium">{cart[medicine.id]}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => addToCart(medicine.id)}
                            disabled={!medicine.inStock}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <span className="text-sm font-medium text-green-600">
                          ${(medicine.price * cart[medicine.id]).toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => addToCart(medicine.id)}
                        disabled={!medicine.inStock}
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

        {/* No Results */}
        {filteredMedicines.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No medicines found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or browse all available medicines.</p>
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

        {/* Prescription Upload Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Need Prescription Medicines?</h3>
            <p className="text-gray-600 mb-4">Upload your prescription and we'll help you find the right medicines</p>
            <Button className="bg-blue-600 hover:bg-blue-700">Upload Prescription</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

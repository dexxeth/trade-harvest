"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { format } from "date-fns"
import { CalendarIcon, Upload, ImageIcon, MapPin, Package, DollarSign, Loader2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { MdCurrencyRupee } from "react-icons/md";

export default function ProductUploadForm() {
  const [date, setDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const router = useRouter()

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newPreviewImages: string[] = []
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          newPreviewImages.push(reader.result as string)
          setPreviewImages([...newPreviewImages])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index: number) => {
    setPreviewImages(previewImages.filter((_, i) => i !== index))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(event.target as HTMLFormElement)

    const newProduct = {
      id: Date.now(),
      name: formData.get("title"),
      category: formData.get("category"),
      price: Number.parseFloat(formData.get("price") as string),
      quantity: formData.get("quantity"),
      location: {
        state: formData.get("state"),
        city: formData.get("city"),
      },
      uploadTime: date || new Date(),
      description: formData.get("description"),
      images: previewImages,
    }

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      })

      if (response.ok) {
        router.push(`/products/${newProduct.id}`)
      } else {
        throw new Error("Failed to submit product")
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <Card className="mx-auto max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">List Your Product</CardTitle>
          <CardDescription>Fill in the details below to list your agricultural product</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Basic Information</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Product Name</Label>
                  <div className="relative">
                    <Package className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="title" name="title" placeholder="Enter product name" className="pl-9" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" name="category" placeholder="e.g., Grains, Vegetables" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Product Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your product, including quality, specifications, and any special features"
                  className="h-24"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Quantity and Price</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity (Quintal)</Label>
                  <Input id="quantity" name="quantity" type="number" min="0" placeholder="Enter quantity" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Unit Price (₹)</Label>
                  <div className="relative">

                    <MdCurrencyRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="100"
                      placeholder="0.00"
                      className="pl-9"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

           
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Location and Date</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="state" name="state" placeholder="Enter state" className="pl-9" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" placeholder="Enter city" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Available From</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

           
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Product Images</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="images"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <ImageIcon className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 10MB each</p>
                    </div>
                    <Input
                      id="images"
                      name="images"
                      type="file"
                      className="hidden"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      required
                    />
                  </label>
                </div>

                {previewImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {previewImages.map((preview, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                          src={preview || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting} size="lg">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  List Product
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


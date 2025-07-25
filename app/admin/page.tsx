"use client";

import type React from "react";

import { useState, useRef } from "react";
import {
  Upload,
  Search,
  Plus,
  Trash2,
  Eye,
  Download,
  HelpCircle,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";

interface Photo {
  id: string;
 
  category: string;
  url: string;
  uploadDate: string;
  size: string;

}

const categories = [
  "portrait",
  "wedding",
  "event coverage",
  "funeral coverage",
];

export default function AdminDashboard() {
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: "PHT001",
      category: "portrait",
      url: "/placeholder.svg?height=300&width=400",
      uploadDate: "2024-01-15",
      size: "2.4 MB",
      
    },
    {
      id: "PHT002",
    
      category: "funeral coverage",
      url: "/placeholder.svg?height=300&width=400",
      uploadDate: "2024-01-14",
      size: "1.8 MB",
    },
    {
      id: "PHT003",
    
      category: "event coverage",
      url: "/placeholder.svg?height=300&width=400",
      uploadDate: "2024-01-13",
      size: "3.1 MB",
    
    },
    {
      id: "PHT004",
     
      category: "wedding",
      url: "/placeholder.svg?height=300&width=400",
      uploadDate: "2024-01-12",
      size: "2.2 MB",
  
    },
    {
      id: "PHT005",
    
      category: "portrait",
      url: "/placeholder.svg?height=300&width=400",
      uploadDate: "2024-01-11",
      size: "1.9 MB",
    
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    name: "",
    category: "",
    description: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredPhotos = photos.filter((photo) => {
    const matchesSearch =
     
      photo.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || photo.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const newPhoto: Photo = {
        id: `PHT${String(photos.length + 1).padStart(3, "0")}`,
      
        category: uploadForm.category,
        url: URL.createObjectURL(file),
        uploadDate: new Date().toISOString().split("T")[0],
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
       
      };
      setPhotos([newPhoto, ...photos]);
      setUploadForm({ name: "", category: "", description: "" });
      setIsUploadOpen(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDeleteSelected = () => {
    setPhotos(photos.filter((photo) => !selectedPhotos.includes(photo.id)));
    setSelectedPhotos([]);
  };

  const handleSelectPhoto = (photoId: string) => {
    setSelectedPhotos((prev) =>
      prev.includes(photoId)
        ? prev.filter((id) => id !== photoId)
        : [...prev, photoId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPhotos.length === filteredPhotos.length) {
      setSelectedPhotos([]);
    } else {
      setSelectedPhotos(filteredPhotos.map((photo) => photo.id));
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      {/* Sidebar */}
      <AppSidebar
        photos={photos}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      {/* Main Content */}
      <SidebarInset>
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold text-gray-900">
                  FABBS Dashboard
                </h1>
                <Badge variant="secondary" className="text-sm">
                  {photos.length} Photos
                </Badge>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6">
            {/* Controls */}
            <div className="mb-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search photos by name or ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export All
                  </Button>

                  <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Upload Photo
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Upload New Photo</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="photo-name">Photo Name</Label>
                          <Input
                            id="photo-name"
                            value={uploadForm.name}
                            onChange={(e) =>
                              setUploadForm({
                                ...uploadForm,
                                name: e.target.value,
                              })
                            }
                            placeholder="Enter photo name"
                          />
                        </div>

                        <div>
                          <Label htmlFor="photo-category">Category</Label>
                          <Select
                            value={uploadForm.category}
                            onValueChange={(value) =>
                              setUploadForm({ ...uploadForm, category: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
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

                        <div>
                          <Label htmlFor="photo-description">
                            Description (Optional)
                          </Label>
                          <Textarea
                            id="photo-description"
                            value={uploadForm.description}
                            onChange={(e) =>
                              setUploadForm({
                                ...uploadForm,
                                description: e.target.value,
                              })
                            }
                            placeholder="Enter photo description"
                            rows={3}
                          />
                        </div>

                        <div>
                          <Label htmlFor="photo-file">Select Photo</Label>
                          <Input
                            id="photo-file"
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            ref={fileInputRef}
                          />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>

            {/* Photos Table */}
            <div className="space-y-4">
              {/* Bulk Actions */}
              {selectedPhotos.length > 0 && (
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="text-sm font-medium text-blue-900">
                    {selectedPhotos.length} photo
                    {selectedPhotos.length > 1 ? "s" : ""} selected
                  </span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDeleteSelected}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Selected
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedPhotos([])}
                  >
                    Clear Selection
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export Selected
                  </Button>
                </div>
              )}

              {/* Table */}
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="w-12 p-4">
                            <Checkbox
                              checked={
                                filteredPhotos.length > 0 &&
                                selectedPhotos.length === filteredPhotos.length
                              }
                              onCheckedChange={handleSelectAll}
                            />
                          </th>
                          <th className="text-left p-4 font-semibold text-gray-900">
                            Photo
                          </th>
                          <th className="text-left p-4 font-semibold text-gray-900">
                            ID
                          </th>
                          <th className="text-left p-4 font-semibold text-gray-900">
                            Name
                          </th>
                          <th className="text-left p-4 font-semibold text-gray-900">
                            Category
                          </th>
                          <th className="text-left p-4 font-semibold text-gray-900">
                            Description
                          </th>
                          <th className="text-left p-4 font-semibold text-gray-900">
                            Upload Date
                          </th>
                          <th className="text-left p-4 font-semibold text-gray-900">
                            Size
                          </th>
                          <th className="text-left p-4 font-semibold text-gray-900">
                            Status
                          </th>
                          <th className="text-left p-4 font-semibold text-gray-900">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPhotos.map((photo, index) => (
                          <tr
                            key={photo.id}
                            className={`border-b hover:bg-gray-50 ${
                              index % 2 === 0 ? "bg-white" : "bg-gray-25"
                            }`}
                          >
                            <td className="p-4">
                              <Checkbox
                                checked={selectedPhotos.includes(photo.id)}
                                onCheckedChange={() =>
                                  handleSelectPhoto(photo.id)
                                }
                              />
                            </td>
                            <td className="p-4">
                              <div className="relative w-16 h-12 rounded-md overflow-hidden bg-gray-100">
                                <Image
                                  src={photo.url || "/placeholder.svg"}
                                  alt="Photo thumbnail"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="font-mono text-sm font-medium text-blue-600">
                                {photo.id}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="max-w-48">
                                <span className="font-medium text-gray-900 truncate block">
                                  photo
                                </span>
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge variant="secondary" className="text-xs">
                                {photo.category}
                              </Badge>
                            </td>
                            
                            <td className="p-4">
                              <span className="text-sm text-gray-600">
                                {photo.uploadDate}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className="text-sm text-gray-600">
                                {photo.size}
                              </span>
                            </td>
                            <td className="p-4">
                              <Badge
                                variant="outline"
                                className="text-xs text-green-600 border-green-200"
                              >
                                Active
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0"
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-4xl">
                                    <DialogHeader>
                                      <DialogTitle>{photo.name}</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div className="relative w-full h-96 rounded-lg overflow-hidden bg-gray-100">
                                        <Image
                                          src={photo.url || "/placeholder.svg"}
                                          alt={photo.name}
                                          fill
                                          className="object-contain"
                                        />
                                      </div>
                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                          <strong>ID:</strong> {photo.id}
                                        </div>
                                        <div>
                                          <strong>Category:</strong>{" "}
                                          {photo.category}
                                        </div>
                                        <div>
                                          <strong>Upload Date:</strong>{" "}
                                          {photo.uploadDate}
                                        </div>
                                        <div>
                                          <strong>File Size:</strong>{" "}
                                          {photo.size}
                                        </div>
                                      </div>
                                      {photo.description && (
                                        <div>
                                          <strong>Description:</strong>
                                          <p className="mt-1 text-gray-600">
                                            {photo.description}
                                          </p>
                                        </div>
                                      )}
                                      <div className="flex gap-2 pt-4">
                                        <Button variant="outline" size="sm">
                                          <Download className="mr-2 h-4 w-4" />
                                          Download Original
                                        </Button>
                                        <Button variant="outline" size="sm">
                                          Copy Public URL
                                        </Button>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>

                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0"
                                    >
                                      <span className="sr-only">Open menu</span>
                                      <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M12 5v.01M12 12v.01M12 19v.01"
                                        />
                                      </svg>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                      Actions
                                    </DropdownMenuLabel>
                                    <DropdownMenuItem>
                                      <Eye className="mr-2 h-4 w-4" />
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Download className="mr-2 h-4 w-4" />
                                      Download
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      Copy Public URL
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      Edit Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {filteredPhotos.length === 0 && (
                    <div className="text-center py-12">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-semibold text-gray-900">
                        No photos found
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {searchTerm || selectedCategory !== "all"
                          ? "Try adjusting your search or filter criteria."
                          : "Get started by uploading your first photo."}
                      </p>
                      <Button
                        className="mt-4"
                        onClick={() => setIsUploadOpen(true)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Upload First Photo
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Table Footer with Pagination Info */}
              <div className="flex items-center justify-between px-2">
                <div className="text-sm text-gray-700">
                  Showing {filteredPhotos.length} of {photos.length} photos
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

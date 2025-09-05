"use client";

import { useState, useRef } from "react";
import { Search, Plus, Trash2, Download, HelpCircle } from "lucide-react";
import { usePhotos } from "../context/photoDataContext";
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
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import Image from "next/image";

const categories = [
  "portrait",
  "wedding",
  "event coverage",
  "funeral coverage",
];

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState("");
  const [loading, setLoading] = useState(false);

  const { photos, fetchPhotos } = usePhotos();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDeleteSelected = () => {};

  const handleUpload = async () => {
    if (!file || !category) return alert("Please select a file and category");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);
    formData.append("alt", alt);

    const res = await fetch("/api/uploads", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      alert("Uploaded successfully!");
      setIsUploadOpen(false);
      setFile(null);
      setCategory("");
      setAlt("");
      fetchPhotos();
    } else {
      alert(`Error: ${data.error}`);
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar selectedCategory={"all"} onCategorySelect={() => {}} />

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
                  Photos
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
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search photos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
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
                    <DialogContent
                      className="sm:max-w-md"
                      aria-describedby={undefined}
                    >
                      <DialogHeader>
                        <DialogTitle>Upload New Photo</DialogTitle>
                      </DialogHeader>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="photo-category" className="mb-2">
                            Category
                          </Label>
                          <Select
                            value={category}
                            onValueChange={(value) => setCategory(value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((c) => (
                                <SelectItem key={c} value={c}>
                                  {c}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="photo-file" className="mb-2">
                            Select Photo
                          </Label>
                          <Input
                            id="photo-file"
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              setFile(e.target.files?.[0] || null)
                            }
                            ref={fileInputRef}
                          />
                        </div>

                        <div>
                          <Label htmlFor="alt" className="mb-2">
                            Alt Text (for accessibility)
                          </Label>
                          <Textarea
                            id="alt"
                            placeholder="Add an alt..."
                            value={alt}
                            onChange={(e) => setAlt(e.target.value)}
                          />
                        </div>

                        <Button
                          disabled={!file || !category || loading}
                          onClick={handleUpload}
                          className="w-full"
                        >
                          {loading ? "Uploading..." : "Upload"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>

            {/* Photos Table */}
            <div className="space-y-4">
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

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="w-12 p-4">
                            <Checkbox />
                          </th>
                          <th className="text-left p-4 font-semibold text-gray-900">
                            Photo
                          </th>

                          <th className="text-left p-4 font-semibold text-gray-900">
                            Category
                          </th>
                          <th className="text-left p-4 font-semibold text-gray-900">
                            Alt Text
                          </th>
                          <th className="text-left p-4 font-semibold text-gray-900">
                            Upload Date
                          </th>
                          <th className="text-left p-4 font-semibold text-gray-900">
                            Size
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {photos.map((photo) => (
                          <tr key={photo.id} className="border-b">
                            <td className="p-4">
                              <input type="checkbox" />
                            </td>
                            <td className="p-4">
                              <Image
                                src={photo.src}
                                alt={photo.alt || "Photo"}
                                height={48}
                                width={48}
                                className=" object-cover rounded"
                              />
                            </td>
                            <td className="p-4">{photo.category}</td>
                            <td className="p-4">{photo.alt}</td>
                            <td className="p-4">
                              {new Date(photo.created_at).toLocaleDateString()}
                            </td>
                            <td className="p-4">
                              {photo.size
                                ? `${(photo.size / 1024).toFixed(2)} KB`
                                : "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

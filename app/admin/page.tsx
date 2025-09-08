// "use client";

// import { useState, useRef } from "react";
// import { Search, Plus, Trash2, Download, HelpCircle } from "lucide-react";
// import { usePhotos } from "../context/photoDataContext";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   SidebarProvider,
//   SidebarTrigger,
//   SidebarInset,
// } from "@/components/ui/sidebar";
// import { AppSidebar } from "./components/app-sidebar";
// import Image from "next/image";

// const categories = [
//   "portrait",
//   "wedding",
//   "event coverage",
//   "funeral coverage",
// ];

// export default function AdminDashboard() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
//   const [isUploadOpen, setIsUploadOpen] = useState(false);
//   const [imageSelected, setImageSelected] = useState(false);
//   const [category, setCategory] = useState("");
//   const [file, setFile] = useState<File | null>(null);
//   const [alt, setAlt] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [selectedPhotoSrc, setSelectedPhotoSrc] = useState<string | null>(null);

//   const { photos, fetchPhotos } = usePhotos();

//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleDeleteSelected = () => {};

//   const handleImageSelect = (src:string) => {
//     setImageSelected(true);
//     setSelectedPhotoSrc(src);
//   };

//   const handleUpload = async () => {
//     if (!file || !category) return alert("Please select a file and category");

//     setLoading(true);
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("category", category);
//     formData.append("alt", alt);

//     const res = await fetch("/api/uploads", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();
//     setLoading(false);

//     if (res.ok) {
//       alert("Uploaded successfully!");
//       setIsUploadOpen(false);
//       setFile(null);
//       setCategory("");
//       setAlt("");
//       fetchPhotos();
//     } else {
//       alert(`Error: ${data.error}`);
//     }
//   };

//   return (
//     <SidebarProvider defaultOpen={true}>
//       <AppSidebar selectedCategory={"all"} onCategorySelect={() => {}} />

//       <SidebarInset>
//         <div className="min-h-screen bg-gray-50">
//           {/* Header */}
//           <header className="bg-white border-b border-gray-200 px-6 py-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-4">
//                 <SidebarTrigger />
//                 <h1 className="text-2xl font-bold text-gray-900">
//                   FABBS Dashboard
//                 </h1>
//                 <Badge variant="secondary" className="text-sm">
//                   Photos
//                 </Badge>
//               </div>

//               <div className="flex items-center space-x-4">
//                 <Button variant="outline" size="sm">
//                   <HelpCircle className="mr-2 h-4 w-4" />
//                   Help
//                 </Button>
//               </div>
//             </div>
//           </header>

//           <div className="p-6">
//             {/* Controls */}
//             <div className="mb-6 space-y-4">
//               <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                   <Input
//                     placeholder="Search photos..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10 w-64"
//                   />
//                 </div>

//                 <div className="flex gap-2">
//                   <Button variant="outline">
//                     <Download className="mr-2 h-4 w-4" />
//                     Export All
//                   </Button>

//                   <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
//                     <DialogTrigger asChild>
//                       <Button>
//                         <Plus className="mr-2 h-4 w-4" />
//                         Upload Photo
//                       </Button>
//                     </DialogTrigger>
//                     <DialogContent
//                       className="sm:max-w-md"
//                       aria-describedby={undefined}
//                     >
//                       <DialogHeader>
//                         <DialogTitle>Upload New Photo</DialogTitle>
//                       </DialogHeader>

//                       <div className="space-y-4">
//                         <div>
//                           <Label htmlFor="photo-category" className="mb-2">
//                             Category
//                           </Label>
//                           <Select
//                             value={category}
//                             onValueChange={(value) => setCategory(value)}
//                           >
//                             <SelectTrigger>
//                               <SelectValue placeholder="Select category" />
//                             </SelectTrigger>
//                             <SelectContent>
//                               {categories.map((c) => (
//                                 <SelectItem key={c} value={c}>
//                                   {c}
//                                 </SelectItem>
//                               ))}
//                             </SelectContent>
//                           </Select>
//                         </div>

//                         <div>
//                           <Label htmlFor="photo-file" className="mb-2">
//                             Select Photo
//                           </Label>
//                           <Input
//                             id="photo-file"
//                             type="file"
//                             accept="image/*"
//                             onChange={(e) =>
//                               setFile(e.target.files?.[0] || null)
//                             }
//                             ref={fileInputRef}
//                           />
//                         </div>

//                         <div>
//                           <Label htmlFor="alt" className="mb-2">
//                             Alt Text (for accessibility)
//                           </Label>
//                           <Textarea
//                             id="alt"
//                             placeholder="Add an alt..."
//                             value={alt}
//                             onChange={(e) => setAlt(e.target.value)}
//                           />
//                         </div>

//                         <Button
//                           disabled={!file || !category || loading}
//                           onClick={handleUpload}
//                           className="w-full"
//                         >
//                           {loading ? "Uploading..." : "Upload"}
//                         </Button>
//                       </div>
//                     </DialogContent>
//                   </Dialog>
//                 </div>
//               </div>
//             </div>

//             {/* Photos Table */}
//             <div className="space-y-4">
//               {selectedPhotos.length > 0 && (
//                 <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
//                   <span className="text-sm font-medium text-blue-900">
//                     {selectedPhotos.length} photo
//                     {selectedPhotos.length > 1 ? "s" : ""} selected
//                   </span>
//                   <Button
//                     variant="destructive"
//                     size="sm"
//                     onClick={handleDeleteSelected}
//                   >
//                     <Trash2 className="mr-2 h-4 w-4" />
//                     Delete Selected
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => setSelectedPhotos([])}
//                   >
//                     Clear Selection
//                   </Button>
//                   <Button variant="outline" size="sm">
//                     <Download className="mr-2 h-4 w-4" />
//                     Export Selected
//                   </Button>
//                 </div>
//               )}

//               <Card>
//                 <CardContent className="p-0">
//                   <div className="overflow-x-auto">
//                     <table className="w-full">
//                       <thead className="bg-gray-50 border-b">
//                         <tr>
//                           <th className="w-12 p-4">
//                             <Checkbox />
//                           </th>
//                           <th className="text-left p-4 font-semibold text-gray-900">
//                             Photo
//                           </th>

//                           <th className="text-left p-4 font-semibold text-gray-900">
//                             Category
//                           </th>
//                           <th className="text-left p-4 font-semibold text-gray-900">
//                             Alt Text
//                           </th>
//                           <th className="text-left p-4 font-semibold text-gray-900">
//                             Upload Date
//                           </th>
//                           <th className="text-left p-4 font-semibold text-gray-900">
//                             Size
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {photos.map((photo) => (
//                           <tr key={photo.id} className="border-b">
//                             <td className="p-4">
//                               <input type="checkbox" />
//                             </td>
//                             <td className="p-4">
//                               <Image
//                                 onClick={()=>handleImageSelect(photo.src)}
//                                 src={photo.src}
//                                 alt={photo.alt || "Photo"}
//                                 height={48}
//                                 width={48}
//                                 className=" object-cover rounded"
//                               />
//                             </td>
//                             <td className="p-4">{photo.category}</td>
//                             <td className="p-4">{photo.alt}</td>
//                             <td className="p-4">
//                               {new Date(photo.created_at).toLocaleDateString()}
//                             </td>
//                             <td className="p-4">
//                               {photo.size
//                                 ? `${(photo.size / 1024).toFixed(2)} KB`
//                                 : "—"}
//                             </td>

//                           </tr>

//                     ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//         {imageSelected && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-4 rounded-lg max-w-lg w-full">
//               <Image
//                 src={selectedPhotoSrc!}
//                 alt="Selected Photo"
//                 width={800}
//                 height={600}
//                 className="object-cover rounded"
//               />
//               <Button
//                 variant="outline"
//                 className="mt-4 w-full"
//                 onClick={() => setImageSelected(false

//                 )}
//               >
//                 Close
//               </Button>
//               </div>
//               </div>
//               )}
//       </SidebarInset>
//     </SidebarProvider>

//   );
// }

"use client";

import { useState, useRef } from "react";
import {
  Plus,
  Trash2,
  Download,
  HelpCircle,
  Eye,
  Share2,
  MoreHorizontal,
} from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
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
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPhotoSrc, setSelectedPhotoSrc] = useState<string | null>(null);

  const { photos, fetchPhotos } = usePhotos();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDeleteSelected = () => {};

  const handleImageSelect = (src: string) => {
    setImageSelected(true);
    setSelectedPhotoSrc(src);
  };

  // const handleEditPhoto = (photoId: string) => {
  //   console.log("Edit photo:", photoId)
  // }

  // const handleDeletePhoto = (photoId: string) => {
  //   console.log("Delete photo:", photoId)
  // }

  // const handleSharePhoto = (photoId: string) => {
  //   console.log("Share photo:", photoId)
  // }

  // const handleFavoritePhoto = (photoId: string) => {
  //   console.log("Favorite photo:", photoId)
  // }

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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 border-b border-blue-200 px-6 py-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="text-white hover:bg-white/20" />
                <h1 className="text-2xl font-bold text-white">
                  <span className="hidden sm:inline-flex"> FABBS</span>{" "}
                  Dashboard
                </h1>
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30 hidden sm:inline-flex"
                >
                  Photos
                </Badge>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6">
            <div className="mb-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export All
                  </Button>

                  <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600">
                        <Plus className="mr-2 h-4 w-4" />
                        Upload Photo
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      className="sm:max-w-md border-indigo-200"
                      aria-describedby={undefined}
                    >
                      <DialogHeader>
                        <DialogTitle className="text-indigo-900">
                          Upload New Photo
                        </DialogTitle>
                      </DialogHeader>

                      <div className="space-y-4">
                        <div>
                          <Label
                            htmlFor="photo-category"
                            className="mb-2 text-indigo-700"
                          >
                            Category
                          </Label>
                          <Select
                            value={category}
                            onValueChange={(value) => setCategory(value)}
                          >
                            <SelectTrigger className="border-indigo-200 focus:border-indigo-400">
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
                          <Label
                            htmlFor="photo-file"
                            className="mb-2 text-indigo-700"
                          >
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
                            className="border-indigo-200 focus:border-indigo-400"
                          />
                        </div>

                        <div>
                          <Label htmlFor="alt" className="mb-2 text-indigo-700">
                            Alt Text (for accessibility)
                          </Label>
                          <Textarea
                            id="alt"
                            placeholder="Add an alt..."
                            value={alt}
                            onChange={(e) => setAlt(e.target.value)}
                            className="border-indigo-200 focus:border-indigo-400"
                          />
                        </div>

                        <Button
                          disabled={!file || !category || loading}
                          onClick={handleUpload}
                          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                        >
                          {loading ? "Uploading..." : "Upload"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {selectedPhotos.length > 0 && (
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 shadow-sm">
                  <span className="text-sm font-medium text-blue-900">
                    {selectedPhotos.length} photo
                    {selectedPhotos.length > 1 ? "s" : ""} selected
                  </span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDeleteSelected}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Selected
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedPhotos([])}
                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    Clear Selection
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export Selected
                  </Button>
                </div>
              )}

              <Card className="shadow-lg border-indigo-100">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100">
                        <tr>
                          <th className="w-12 p-4">
                            <Checkbox className="border-indigo-300" />
                          </th>
                          <th className="text-left p-4 font-semibold text-indigo-900">
                            Photo
                          </th>
                          <th className="text-left p-4 font-semibold text-indigo-900">
                            Category
                          </th>
                          <th className="text-left p-4 font-semibold text-indigo-900">
                            Alt Text
                          </th>
                          <th className="text-left p-4 font-semibold text-indigo-900">
                            Upload Date
                          </th>
                          <th className="text-left p-4 font-semibold text-indigo-900">
                            Size
                          </th>
                          <th className="text-left p-4 font-semibold text-indigo-900">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {photos.map((photo, index) => (
                          <tr
                            key={photo.id}
                            className={`border-b border-indigo-50 hover:bg-gradient-to-r hover:from-blue-25 hover:to-indigo-25 transition-colors ${
                              index % 2 === 0 ? "bg-white" : "bg-indigo-25/30"
                            }`}
                          >
                            <td className="p-4">
                              <Checkbox className="border-indigo-300" />
                            </td>
                            <td className="p-4">
                              <div className="relative group">
                                <Image
                                  onClick={() => handleImageSelect(photo.src)}
                                  src={photo.src || "/placeholder.svg"}
                                  alt={photo.alt || "Photo"}
                                  height={48}
                                  width={48}
                                  className="object-cover rounded-lg cursor-pointer transition-transform "
                                />
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge
                                variant="secondary"
                                className={`
                                  ${
                                    photo.category === "portrait"
                                      ? "bg-pink-100 text-pink-700 border-pink-200"
                                      : ""
                                  }
                                  ${
                                    photo.category === "wedding"
                                      ? "bg-rose-100 text-rose-700 border-rose-200"
                                      : ""
                                  }
                                  ${
                                    photo.category === "event coverage"
                                      ? "bg-blue-100 text-blue-700 border-blue-200"
                                      : ""
                                  }
                                  ${
                                    photo.category === "funeral coverage"
                                      ? "bg-gray-100 text-gray-700 border-gray-200"
                                      : ""
                                  }
                                `}
                              >
                                {photo.category}
                              </Badge>
                            </td>
                            <td className="p-4 text-gray-700">{photo.alt}</td>
                            <td className="p-4 text-gray-600">
                              {new Date(photo.created_at).toLocaleDateString()}
                            </td>
                            <td className="p-4 text-gray-600">
                              {photo.size
                                ? `${(photo.size / 1024).toFixed(2)} KB`
                                : "—"}
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleImageSelect(photo.src)}
                                  className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>

                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="h-8 w-8 p-0 text-gray-600 hover:bg-gray-50"
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    align="end"
                                    className="w-48"
                                  >
                                    <DropdownMenuItem>
                                      <Share2 className="mr-2 h-4 w-4" />
                                      Share Photo
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleImageSelect(photo.src)
                                      }
                                    >
                                      <Download className="mr-2 h-4 w-4" />
                                      Download
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      // onClick={() => handleDeletePhoto(photo.id)}
                                      className="text-red-600 focus:text-red-600"
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete Photo
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
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {imageSelected && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl border border-indigo-100">
              <div className="relative">
                <Image
                  src={selectedPhotoSrc! || "/placeholder.svg"}
                  alt="Selected Photo"
                  width={800}
                  height={600}
                  className="object-contain rounded-lg w-full h-auto max-h-[70vh]"
                />
              </div>
              <div className="flex gap-2 mt-6">
                <Button
                  variant="outline"
                  className="flex-1 border-indigo-200 text-indigo-700 hover:bg-indigo-50 bg-transparent"
                  onClick={() => setImageSelected(false)}
                >
                  Close
                </Button>
                <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}

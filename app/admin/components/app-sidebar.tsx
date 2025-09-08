// // "use client";
// // import { ImageIcon, Home, Settings, ChevronDown, LogOut } from "lucide-react";
// // import { usePhotos } from "@/app/context/photoDataContext";
// // import { Badge } from "@/components/ui/badge";
// // import { Button } from "@/components/ui/button";

// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuSeparator,
// //   DropdownMenuTrigger,
// // } from "@/components/ui/dropdown-menu";
// // import {
// //   Sidebar,
// //   SidebarContent,
// //   SidebarFooter,
// //   SidebarGroup,
// //   SidebarGroupContent,
// //   SidebarGroupLabel,
// //   SidebarHeader,
// //   SidebarMenu,
// //   SidebarMenuButton,
// //   SidebarMenuItem,
// //   SidebarSeparator,
// // } from "@/components/ui/sidebar";
// // import {
// //   Collapsible,
// //   CollapsibleContent,
// //   CollapsibleTrigger,
// // } from "@/components/ui/collapsible";

// // interface Photo {
// //   id: string;
// //   name: string;
// //   category: string;
// //   url: string;
// //   uploadDate: string;
// //   size: string;
// //   description?: string;
// // }

// // interface AppSidebarProps {
// //   photos: Photo[];
// //   selectedCategory: string;
// //   onCategorySelect: (category: string) => void;
// // }

// // const categories = [
// //   "portrait",
// //   "wedding",
// //   "event coverage",
// //   "funeral coverage",
// // ];

// // export function AppSidebar({
// //   photos,
// //   selectedCategory,
// //   onCategorySelect,
// // }: AppSidebarProps) {
  
// //   const { photos: allPhotos } = usePhotos();
// //   const totalPhotos = allPhotos.length;

// //   const photoCategories = Array.from(
// //     new Set(photos.map((photo) => photo.category))
// //   );

// //   const categoryCounts = photoCategories.reduce((acc, category) => {
// //     acc[category] = photos.filter(
// //       (photo) => photo.category === category
// //     ).length;
// //     return acc;
// //   }, {} as Record<string, number>);

// //   return (
// //     <Sidebar>
// //       <SidebarHeader>
// //         <div className="flex items-center gap-2 px-4 py-2">
// //           <ImageIcon className="h-6 w-6 text-primary" />
// //           <h1 className="text-xl font-bold">FABBS Admin</h1>
// //         </div>
// //       </SidebarHeader>

// //       <SidebarContent>
// //         {/* Main Navigation */}
// //         <SidebarGroup>
// //           <SidebarGroupLabel>Navigation</SidebarGroupLabel>
// //           <SidebarGroupContent>
// //             <SidebarMenu>
// //               <SidebarMenuItem>
// //                 <SidebarMenuButton isActive>
// //                   <Home className="h-4 w-4" />
// //                   <span>Dashboard</span>
// //                 </SidebarMenuButton>
// //               </SidebarMenuItem>
// //               <SidebarMenuItem>
// //                 <SidebarMenuButton>
// //                   <ImageIcon className="h-4 w-4" />
// //                   <span>All Photos</span>
// //                   <Badge variant="secondary" className="ml-auto">
// //                     {totalPhotos}
// //                   </Badge>
// //                 </SidebarMenuButton>
// //               </SidebarMenuItem>

// //               <SidebarMenuItem>
// //                 <SidebarMenuButton>
// //                   <Settings className="h-4 w-4" />
// //                   <span>Settings</span>
// //                 </SidebarMenuButton>
// //               </SidebarMenuItem>
// //             </SidebarMenu>
// //           </SidebarGroupContent>
// //         </SidebarGroup>

// //         <SidebarSeparator />

// //         {/* Categories */}
// //         <SidebarGroup>
// //           <Collapsible defaultOpen className="group/collapsible">
// //             <SidebarGroupLabel asChild>
// //               <CollapsibleTrigger className="flex w-full items-center justify-between">
// //                 Categories
// //                 <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
// //               </CollapsibleTrigger>
// //             </SidebarGroupLabel>
// //             <CollapsibleContent>
// //               <SidebarGroupContent>
// //                 <SidebarMenu>
// //                   <SidebarMenuItem>
// //                     <SidebarMenuButton
// //                       isActive={selectedCategory === "all"}
// //                       onClick={() => onCategorySelect("all")}
// //                     >
// //                       <span>All Categories</span>
// //                       <Badge variant="secondary" className="ml-auto">
// //                         {photoCategories.length}
// //                       </Badge>
// //                     </SidebarMenuButton>
// //                   </SidebarMenuItem>
// //                   {categories.map((category) => (
// //                     <SidebarMenuItem key={category}>
// //                       <SidebarMenuButton
// //                         isActive={selectedCategory === category}
// //                         onClick={() => onCategorySelect(category)}
// //                       >
// //                         <span>{category}</span>
// //                         <Badge variant="secondary" className="ml-auto">
// //                           {categoryCounts[category] || 0}
// //                         </Badge>
// //                       </SidebarMenuButton>
// //                     </SidebarMenuItem>
// //                   ))}
// //                 </SidebarMenu>
// //               </SidebarGroupContent>
// //             </CollapsibleContent>
// //           </Collapsible>
// //         </SidebarGroup>

// //         {/* Quick Stats */}
// //       </SidebarContent>

// //       <SidebarFooter>
// //         <div className="p-4">
// //           <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-3">
// //             <Avatar>
// //               <AvatarImage src="/placeholder.svg?height=40&width=40" />
// //               <AvatarFallback>AD</AvatarFallback>
// //             </Avatar>
// //             <div className="flex-1 overflow-hidden">
// //               <p className="text-sm font-medium leading-none">Admin User</p>
// //               <p className="text-xs text-muted-foreground truncate">
// //                 admin@example.com
// //               </p>
// //             </div>
// //             <DropdownMenu>
// //               <DropdownMenuTrigger asChild>
// //                 <Button variant="ghost" size="icon" className="h-8 w-8">
// //                   <ChevronDown className="h-4 w-4" />
// //                   <span className="sr-only">Toggle user menu</span>
// //                 </Button>
// //               </DropdownMenuTrigger>
// //               <DropdownMenuContent align="end">
// //                 <DropdownMenuItem>Profile</DropdownMenuItem>
// //                 <DropdownMenuItem>Settings</DropdownMenuItem>
// //                 <DropdownMenuSeparator />
// //                 <DropdownMenuItem>
// //                   <LogOut className="mr-2 h-4 w-4" />
// //                   <span>Log out</span>
// //                 </DropdownMenuItem>
// //               </DropdownMenuContent>
// //             </DropdownMenu>
// //           </div>
// //         </div>
// //       </SidebarFooter>
// //     </Sidebar>
// //   );
// // }


// "use client";
// import { ImageIcon, Home, Settings, ChevronDown, LogOut } from "lucide-react";
// import { usePhotos } from "@/app/context/photoDataContext";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarSeparator,
// } from "@/components/ui/sidebar";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";

// interface AppSidebarProps {
//   selectedCategory: string;
//   onCategorySelect: (category: string) => void;
// }

// const categories = [
//   "portrait",
//   "wedding",
//   "event coverage",
//   "funeral coverage",
// ];

// export function AppSidebar({
//   selectedCategory,
//   onCategorySelect,
// }: AppSidebarProps) {
//   // ✅ Use global photos from context
//   const { photos: allPhotos } = usePhotos();

//   // ✅ Total photos
//   const totalPhotos = allPhotos.length;

//   // ✅ Unique categories present in the data
//   // Removed unused photoCategories variable

//   // ✅ Count photos per category
//   const categoryCounts = allPhotos.reduce((acc, photo) => {
//     acc[photo.category] = (acc[photo.category] || 0) + 1;
//     return acc;
//   }, {} as Record<string, number>);

//   return (
//     <Sidebar>
//       <SidebarHeader>
//         <div className="flex items-center gap-2 px-4 py-2">
//           <ImageIcon className="h-6 w-6 text-primary" />
//           <h1 className="text-xl font-bold">FABBS Admin</h1>
//         </div>
//       </SidebarHeader>

//       <SidebarContent>
//         {/* Main Navigation */}
//         <SidebarGroup>
//           <SidebarGroupLabel>Navigation</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               <SidebarMenuItem>
//                 <SidebarMenuButton isActive>
//                   <Home className="h-4 w-4" />
//                   <span>Dashboard</span>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//               <SidebarMenuItem>
//                 <SidebarMenuButton>
//                   <ImageIcon className="h-4 w-4" />
//                   <span>All Photos</span>
//                   <Badge variant="secondary" className="ml-auto">
//                     {totalPhotos}
//                   </Badge>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>

//               <SidebarMenuItem>
//                 <SidebarMenuButton>
//                   <Settings className="h-4 w-4" />
//                   <span>Settings</span>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>

//         <SidebarSeparator />

//         {/* Categories */}
//         <SidebarGroup>
//           <Collapsible defaultOpen className="group/collapsible">
//             <SidebarGroupLabel asChild>
//               <CollapsibleTrigger className="flex w-full items-center justify-between">
//                 Categories
//                 <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
//               </CollapsibleTrigger>
//             </SidebarGroupLabel>
//             <CollapsibleContent>
//               <SidebarGroupContent>
//                 <SidebarMenu>
//                   <SidebarMenuItem>
//                     <SidebarMenuButton
//                       isActive={selectedCategory === "all"}
//                       onClick={() => onCategorySelect("all")}
//                     >
//                       <span>All Categories</span>
//                       <Badge variant="secondary" className="ml-auto">
//                         {totalPhotos}
//                       </Badge>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                   {categories.map((category) => (
//                     <SidebarMenuItem key={category}>
//                       <SidebarMenuButton
//                         isActive={selectedCategory === category}
//                         onClick={() => onCategorySelect(category)}
//                       >
//                         <span>{category}</span>
//                         <Badge variant="secondary" className="ml-auto">
//                           {categoryCounts[category] || 0}
//                         </Badge>
//                       </SidebarMenuButton>
//                     </SidebarMenuItem>
//                   ))}
//                 </SidebarMenu>
//               </SidebarGroupContent>
//             </CollapsibleContent>
//           </Collapsible>
//         </SidebarGroup>
//       </SidebarContent>

//       <SidebarFooter>
//         <div className="p-4">
//           <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-3">
//             <Avatar>
//               <AvatarImage src="/placeholder.svg?height=40&width=40" />
//               <AvatarFallback>AD</AvatarFallback>
//             </Avatar>
//             <div className="flex-1 overflow-hidden">
//               <p className="text-sm font-medium leading-none">Admin User</p>
//               <p className="text-xs text-muted-foreground truncate">
//                 admin@example.com
//               </p>
//             </div>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" size="icon" className="h-8 w-8">
//                   <ChevronDown className="h-4 w-4" />
//                   <span className="sr-only">Toggle user menu</span>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuItem>Profile</DropdownMenuItem>
//                 <DropdownMenuItem>Settings</DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>
//                   <LogOut className="mr-2 h-4 w-4" />
//                   <span>Log out</span>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>
//       </SidebarFooter>
//     </Sidebar>
//   );
// }
"use client"

import { Camera, Users, Calendar, Settings, Home, ImageIcon } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"

interface AppSidebarProps {
  selectedCategory: string
  onCategorySelect: (category: string) => void
}

const categories = [
  { id: "all", label: "All Photos", icon: ImageIcon },
  { id: "portrait", label: "Portrait", icon: Users },
  { id: "wedding", label: "Wedding", icon: Calendar },
  { id: "event coverage", label: "Event Coverage", icon: Camera },
  { id: "funeral coverage", label: "Funeral Coverage", icon: Settings },
]

export function AppSidebar({ selectedCategory, onCategorySelect }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-indigo-100 bg-gradient-to-b from-indigo-50 to-purple-50">
      <SidebarHeader className="p-4 border-b border-indigo-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
            <Camera className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold text-indigo-900">FABBS</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-indigo-700 font-medium">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-indigo-700 hover:bg-indigo-100 hover:text-indigo-900">
                  <Home className="h-4 w-4" />
                  Dashboard
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-indigo-700 font-medium">Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <SidebarMenuItem key={category.id}>
                  <SidebarMenuButton
                    onClick={() => onCategorySelect(category.id)}
                    className={`
                      ${
                        selectedCategory === category.id
                          ? "bg-gradient-to-r from-purple-100 to-indigo-100 text-indigo-900 border-r-2 border-indigo-500"
                          : "text-indigo-700 hover:bg-indigo-100 hover:text-indigo-900"
                      }
                    `}
                  >
                    <category.icon className="h-4 w-4" />
                    {category.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-indigo-700 font-medium">Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-indigo-700 hover:bg-indigo-100 hover:text-indigo-900">
                  <Settings className="h-4 w-4" />
                  Preferences
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

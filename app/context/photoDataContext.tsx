"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "@/lib/supabaseClient";

type Photo = {
  id: number;
  src: string;
  alt: string;
  category: string;
  created_at: string;
  size?: number;
};

type PhotoContextType = {
  photos: Photo[];
  fetchPhotos: () => Promise<void>;
};

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export const PhotoProvider = ({ children }: { children: ReactNode }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const fetchPhotos = async () => {
    const { data, error } = await supabase
      .from("files")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching photos:", error);
    } else {
      setPhotos(data || []);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <PhotoContext.Provider value={{ photos, fetchPhotos }}>
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotos = () => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error("usePhotos must be used within a PhotoProvider");
  }
  return context;
};

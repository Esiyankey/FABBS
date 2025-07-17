"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { photographyImages, type PhotoData } from "../../../lib/data/photoData";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Component() {
  const params = useParams();

  const category = params.category as string;

  const filteredImages = photographyImages.filter(
    (photo: PhotoData) => photo.category === category
  );

  if (filteredImages.length === 0) {
    return (
      <div className="mt-24 text-center text-lg text-red-500">
        No photos found for {category}
      </div>
    );
  }

  return (
    <>
      {/* Header Section */}

      <div className=" bg-gray-50 pt-28 ">
        <Link href="/" >
          <button className="flex items-center  ml-4 my-4 text-gray-600 hover:text-gray-800 ">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
        </Link>

        <div className="text-center ">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
            Grid Lens  Photography
          </h1>
          <p className="text-base md:text-lg text-gray-600 sm:max-w-3xl  px-4 mx-auto">
            Capturing lifes most precious moments through the lens of creativity
            and passion.
          </p>
        </div>

        {/* Gallery Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-4 gap-4 auto-rows-[200px]">
            {filteredImages.map((photo: PhotoData) => (
              <div
                key={photo.id}
                className={`col-span-${photo.colSpan} row-span-${photo.rowSpan} group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300`}
                style={{
                  gridColumn: `span ${photo.colSpan}`,
                  gridRow: `span ${photo.rowSpan}`,
                }}
              >
                <Image
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300 font-medium">
              Load More Photos
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

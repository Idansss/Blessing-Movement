"use client";

import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";

interface CloudinaryUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: string;
}

export function CloudinaryUpload({
  value,
  onChange,
  label = "Image",
  folder = "blessings",
}: CloudinaryUploadProps) {
  return (
    <div>
      {label && (
        <p className="block text-sm font-medium text-stone-700 mb-1">{label}</p>
      )}

      {value ? (
        <div className="relative w-full h-48 rounded-xl overflow-hidden border border-stone-200 group">
          <Image
            src={value}
            alt="Uploaded image"
            fill
            className="object-cover"
            unoptimized
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          options={{
            folder,
            maxFiles: 1,
            resourceType: "image",
            clientAllowedFormats: ["jpg", "jpeg", "png", "webp", "avif"],
            maxFileSize: 5000000, // 5 MB
          }}
          onSuccess={(result) => {
            if (
              result.event === "success" &&
              typeof result.info === "object" &&
              result.info !== null &&
              "secure_url" in result.info
            ) {
              onChange(result.info.secure_url as string);
            }
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="w-full h-32 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-stone-300 hover:border-primary hover:bg-primary/5 transition-colors text-stone-500 hover:text-primary"
            >
              <ImagePlus className="h-6 w-6" />
              <span className="text-sm font-medium">Click to upload image</span>
              <span className="text-xs text-stone-400">JPG, PNG, WebP · max 5 MB</span>
            </button>
          )}
        </CldUploadWidget>
      )}

      {/* Hidden input so the URL is still accessible as a plain string */}
      <input type="hidden" value={value} readOnly />
    </div>
  );
}

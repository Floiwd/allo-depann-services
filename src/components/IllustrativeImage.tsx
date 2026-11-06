"use client";

import React from "react";
import Image from "next/image";
import { siteImages, SiteImage } from "@/data/images";

interface IllustrativeImageProps {
  imageId: string;
  className?: string;
  imageClassName?: string;
  fill?: boolean;
  priority?: boolean;
}

export default function IllustrativeImage({
  imageId,
  className = "",
  imageClassName = "",
  fill = true,
  priority = false,
}: IllustrativeImageProps) {
  const imgData: SiteImage | undefined = siteImages[imageId];

  if (!imgData) {
    return null;
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {fill ? (
        <Image
          src={imgData.src}
          alt={imgData.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className={`object-cover ${imageClassName}`}
        />
      ) : (
        <Image
          src={imgData.src}
          alt={imgData.alt}
          width={imgData.width}
          height={imgData.height}
          priority={priority}
          className={imageClassName}
        />
      )}

      {imgData.isIllustrative && (
        <span
          className="absolute bottom-1.5 right-1.5 z-10 px-1.5 py-0.5 rounded text-[9px] font-medium tracking-tight bg-black/75 text-white/95 backdrop-blur-xs select-none pointer-events-none"
          title="Photo illustrative en attente des photos réelles de l'artisan"
        >
          Photo illustrative
        </span>
      )}
    </div>
  );
}

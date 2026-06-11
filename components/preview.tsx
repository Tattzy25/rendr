// components/preview.tsx
"use client";

import Image from "next/image";
import { HugeiconsDownloadIcon } from "@/components/icons/download-icon";
import { HugeiconsHeartIcon } from "@/components/icons/heart-icon";
import { HugeiconsShareIcon } from "@/components/icons/share-icon";

type PreviewProps = {
  url: string;
  priority?: boolean;
  onOpen?: () => void;
};

export function Preview({ url, priority, onOpen }: PreviewProps) {
  if (!url || url.trim().length === 0) {
    // do not render broken <img>, avoids the empty src errors
    return null;
  }

  const handleDownload = async () => {
    const res = await fetch(url);
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = url.split("/").pop() || "image";
    a.click();
    URL.revokeObjectURL(objectUrl);
  };

  const handleShare = async () => {
    if (!navigator.share) {
      return;
    }
    try {
      await navigator.share({ url });
    } catch {
      // user cancelled or share failed — no fallback
    }
  };

  return (
    <div className="pt-[5px] pb-[5px] sm:pt-[50px] sm:pb-[50px]">
      <button
        className="block w-full cursor-zoom-in rounded-xl bg-card p-2 shadow-xl"
        onClick={onOpen}
        type="button"
      >
        <Image
          alt={url}
          className="aspect-square w-full rounded-md object-cover"
          height={630}
          priority={priority}
          sizes="630px"
          src={url}
          width={630}
        />
      </button>
      <div className="flex items-center justify-center gap-4 px-1 pt-3 text-muted-foreground">
        <HugeiconsDownloadIcon
          className="cursor-pointer"
          onClick={handleDownload}
          size={20}
        />
        <HugeiconsShareIcon
          className="cursor-pointer"
          onClick={handleShare}
          size={20}
        />
        <HugeiconsHeartIcon className="cursor-pointer" size={20} />
      </div>
    </div>
  );
}

// components/preview.tsx
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

  return (
    <div className="pt-[50px] pb-[50px]">
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
        <HugeiconsDownloadIcon className="cursor-pointer" size={20} />
        <HugeiconsShareIcon className="cursor-pointer" size={20} />
        <HugeiconsHeartIcon className="cursor-pointer" size={20} />
      </div>
    </div>
  );
}

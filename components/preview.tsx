// components/preview.tsx
import Image from "next/image";

type PreviewProps = {
  url: string;
  priority?: boolean;
};

export function Preview({ url, priority }: PreviewProps) {
  if (!url || url.trim().length === 0) {
    // do not render broken <img>, avoids the empty src errors
    return null;
  }

  return (
    <div className="mb-4 rounded-xl bg-card p-2 shadow-xl">
      <Image
        alt={url}
        className="rounded-md"
        height={630}
        priority={priority}
        sizes="630px"
        src={url}
        width={630}
      />
    </div>
  );
}

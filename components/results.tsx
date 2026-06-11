// components/results.tsx
import { imageIndex } from "@/lib/search";
import { ResultsClient } from "./results.client";

export type ImageItem = { id: string; url: string; style?: string };

async function fetchInitial(): Promise<ImageItem[]> {
  // One Upstash Search call every time the page is opened
  const res: any = await imageIndex.range({
    cursor: "0",
    limit: 50,
  });

  return (res.documents as any[])
    .map((doc) => ({
      id: String(doc.id),
      url: String(doc.content?.image_url ?? ""),
      style: doc.content?.style ? String(doc.content.style) : undefined,
    }))
    .filter((d) => d.url.trim().length > 0);
}

export const Results = async () => {
  const initialData = await fetchInitial();
  return <ResultsClient initialData={initialData} />;
};

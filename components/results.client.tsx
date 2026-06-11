// components/results.client.tsx
"use client";

import { ImageIcon } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { search } from "@/app/actions/search";
import { Preview } from "./preview";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "./ui/empty";
import type { ImageItem } from "./results";

type State = { data: ImageItem[] } | { error: string };

type Props = {
  initialData: ImageItem[];
};

const PRIORITY_COUNT = 12;
// 1 row × 4 columns (md:columns-4) = 4 images
const VISIBLE_COUNT = 4;

export function ResultsClient({ initialData }: Props) {
  const [state, _formAction, _isPending] = useActionState<State, FormData>(
    search,
    { data: [] },
  );

  useEffect(() => {
    if ("error" in state) {
      toast.error(state.error);
    }
  }, [state]);

  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const isSearching = "data" in state && state.data.length > 0;
  const items = (isSearching ? state.data : initialData).slice(0, VISIBLE_COUNT);
  const hasImages = items.length > 0;

  return (
    <>
      {hasImages ? (
        <div className="columns-2 gap-4 sm:columns-3 md:columns-4">
          {items.map((item, index) => (
            <Preview
              key={item.id}
              onOpen={() => setLightboxIndex(index)}
              priority={index < PRIORITY_COUNT}
              url={item.url}
            />
          ))}
        </div>
      ) : (
        <Empty className="h-full min-h-[50vh] rounded-lg border">
          <EmptyHeader className="max-w-none">
            <div className="relative isolate mb-8 flex">
              <div className="rounded-full border bg-background p-3 shadow-xs">
                <ImageIcon className="size-5 text-muted-foreground" />
              </div>
            </div>
            <EmptyTitle>No images found</EmptyTitle>
            <EmptyDescription>
              Upload images to your Cloudflare bucket and index them in Upstash.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      <Lightbox
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        open={lightboxIndex >= 0}
        slides={items.map((item) => ({ src: item.url }))}
      />
    </>
  );
}

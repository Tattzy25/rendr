// components/results.client.tsx
"use client";

import { ArrowLeftIcon, ImageIcon, Loader2Icon } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { search } from "@/app/actions/search";
import { Preview } from "./preview";
import { Button } from "./ui/button";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "./ui/empty";
import { Input } from "./ui/input";
import type { ImageItem } from "./results";

type State = { data: ImageItem[] } | { error: string };

type Props = {
  initialData: ImageItem[];
};

const PRIORITY_COUNT = 12;

export function ResultsClient({ initialData }: Props) {
  const [state, formAction, isPending] = useActionState<State, FormData>(
    search,
    { data: [] },
  );

  useEffect(() => {
    if ("error" in state) {
      toast.error(state.error);
    }
  }, [state]);

  const isSearching = "data" in state && state.data.length > 0;
  const items = isSearching ? state.data : initialData;
  const hasImages = items.length > 0;

  return (
    <>
      {hasImages ? (
        <div className="columns-2 gap-4 sm:columns-3 md:columns-4">
          {items.map((item, index) => (
            <Preview
              key={item.id}
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

      <form
        action={formAction}
        className="-translate-x-1/2 fixed bottom-8 left-1/2 flex w-full max-w-sm items-center gap-1 rounded-full bg-background p-1 shadow-xl sm:max-w-lg"
      >
        {isSearching && (
          <Button
            className="shrink-0 rounded-full"
            disabled={isPending}
            onClick={() => window.location.reload()}
            size="icon"
            type="button"
            variant="ghost"
          >
            <ArrowLeftIcon className="size-4" />
          </Button>
        )}

        <Input
          className="w-full rounded-full border-none bg-secondary shadow-none outline-none"
          disabled={isPending || !hasImages}
          id="search"
          name="search"
          placeholder="Search by description"
          required
        />

        {isPending ? (
          <Button className="shrink-0" disabled size="icon" variant="ghost">
            <Loader2Icon className="size-4 animate-spin" />
          </Button>
        ) : (
          <Button
            className="shrink-0 rounded-full"
            size="icon"
            type="submit"
            variant="ghost"
          >
            <ImageIcon className="size-4" />
          </Button>
        )}
      </form>
    </>
  );
}

"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { X, Expand } from "lucide-react";
import type { OutreachPhoto } from "@/data/photos";
export function PhotoGallery({ items }: { items: OutreachPhoto[] }) {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<OutreachPhoto | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const categories = [
    "All",
    ...Array.from(new Set(items.map((p) => p.category))),
  ];
  const visible =
    filter === "All" ? items : items.filter((p) => p.category === filter);
  function show(photo: OutreachPhoto) {
    setSelected(photo);
    dialog.current?.showModal();
  }
  return (
    <>
      <div className="filter-bar" aria-label="Filter photographs">
        {categories.map((category) => (
          <button
            key={category}
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <p className="eyebrow mb-8" role="status">
        {visible.length} moments from the movement
      </p>
      <div className="gallery-grid">
        {visible.map((photo) => (
          <figure key={photo.id}>
            <button
              onClick={() => show(photo)}
              aria-label={"Enlarge photo: " + photo.title}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={900}
                height={1100}
                sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
                unoptimized={photo.src.startsWith("https://")}
              />
              <figcaption>
                <span>
                  {photo.category} <Expand size={12} className="inline ml-2" />
                </span>
                <h2>{photo.title}</h2>
              </figcaption>
            </button>
          </figure>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="dialog photo-dialog"
        aria-label={selected?.title ?? "Enlarged photograph"}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <button
          className="dialog-close"
          onClick={() => dialog.current?.close()}
          aria-label="Close photograph"
        >
          <X size={20} />
        </button>
        {selected && (
          <>
            <Image
              src={selected.src}
              alt={selected.alt}
              width={1200}
              height={1500}
              unoptimized
            />
            <p>
              {selected.title} · {selected.category}
            </p>
          </>
        )}
      </dialog>
    </>
  );
}

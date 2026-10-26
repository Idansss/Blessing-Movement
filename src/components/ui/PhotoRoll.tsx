"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { photos } from "@/data/photos";
const selected = [photos[8], photos[2], photos[6], photos[10], photos[11]];
export function PhotoRoll() {
  const roll = useRef<HTMLDivElement>(null);
  const move = (direction: number) =>
    roll.current?.scrollBy({
      left: direction * 370,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  return (
    <section className="section-space photo-section">
      <div className="page-width section-heading">
        <div>
          <p className="eyebrow">From our family album</p>
          <h2 className="section-title">
            Small moments.
            <br />
            <em>Lasting meaning.</em>
          </h2>
        </div>
        <div className="roll-controls">
          <button onClick={() => move(-1)} aria-label="Previous photos">
            <ArrowLeft size={20} />
          </button>
          <button onClick={() => move(1)} aria-label="Next photos">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
      <div
        ref={roll}
        className="photo-roll"
        role="region"
        aria-label="Outreach photo timeline"
        tabIndex={0}
      >
        {selected.map((photo, i) => (
          <figure key={photo.id}>
            <div>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 600px) 80vw, 380px"
              />
            </div>
            <figcaption>
              <span>
                0{i + 1} / {photo.category}
              </span>
              <h3>{photo.title}</h3>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="page-width mt-8">
        <Link href="/media" className="text-link">
          Explore the full gallery <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}

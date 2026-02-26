"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Clock, Calendar, Mic, Radio, Film, Tv } from "lucide-react";
import type { Metadata } from "next";

// ---------------------------------------------------------------------------
// Static media data
// ---------------------------------------------------------------------------

type MediaType = "sermon" | "podcast" | "stream" | "reel";

interface MediaItem {
  id: string;
  type: MediaType;
  title: string;
  speaker: string;
  topic: string;
  date: string;
  thumbnail: string;
  url: string;
  duration: string;
}

const mediaItems: MediaItem[] = [
  {
    id: "1",
    type: "sermon",
    title: "Walking in Divine Purpose",
    speaker: "Pastor Emmanuel Bello",
    topic: "Purpose",
    date: "2026-02-15",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    url: "#",
    duration: "45 min",
  },
  {
    id: "2",
    type: "sermon",
    title: "The Power of Generosity",
    speaker: "Pastor Adaeze Okafor",
    topic: "Giving",
    date: "2026-01-20",
    thumbnail: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400",
    url: "#",
    duration: "38 min",
  },
  {
    id: "3",
    type: "podcast",
    title: "Faith & Career: Episode 12",
    speaker: "Tolu Adebayo",
    topic: "Career",
    date: "2026-02-01",
    thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400",
    url: "#",
    duration: "28 min",
  },
  {
    id: "4",
    type: "podcast",
    title: "Building Community in 2026",
    speaker: "Funmi Oladele",
    topic: "Community",
    date: "2026-01-15",
    thumbnail: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400",
    url: "#",
    duration: "22 min",
  },
  {
    id: "5",
    type: "stream",
    title: "Praise & Prophesy Night — Feb 2026",
    speaker: "Worship Team",
    topic: "Worship",
    date: "2026-02-08",
    thumbnail: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400",
    url: "#",
    duration: "2h 15min",
  },
  {
    id: "6",
    type: "reel",
    title: "Outreach Highlights — January",
    speaker: "Blessings Team",
    topic: "Outreach",
    date: "2026-01-30",
    thumbnail: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400",
    url: "#",
    duration: "2 min",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type FilterTab = "All" | "Sermons" | "Podcasts" | "Streams" | "Reels";

const filterTabs: FilterTab[] = ["All", "Sermons", "Podcasts", "Streams", "Reels"];

const typeKeyMap: Record<FilterTab, MediaType | null> = {
  All: null,
  Sermons: "sermon",
  Podcasts: "podcast",
  Streams: "stream",
  Reels: "reel",
};

const typeBadgeClass: Record<MediaType, string> = {
  sermon: "bg-primary text-white",
  podcast: "bg-accent text-accent-foreground",
  stream: "bg-stone-700 text-white",
  reel: "bg-pink-600 text-white",
};

const typeLabel: Record<MediaType, string> = {
  sermon: "Sermon",
  podcast: "Podcast",
  stream: "Stream",
  reel: "Reel",
};

const TypeIcon: Record<MediaType, React.FC<{ className?: string }>> = {
  sermon: ({ className }) => <Mic className={className} />,
  podcast: ({ className }) => <Radio className={className} />,
  stream: ({ className }) => <Tv className={className} />,
  reel: ({ className }) => <Film className={className} />,
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ---------------------------------------------------------------------------
// MediaCard
// ---------------------------------------------------------------------------

function MediaCard({ item, index }: { item: MediaItem; index: number }) {
  const Icon = TypeIcon[item.type];
  const isExternal = item.url !== "#";

  const cardContent = (
    <motion.div
      className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Type badge — top left */}
        <span
          className={`absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${typeBadgeClass[item.type]}`}
        >
          <Icon className="h-3 w-3" />
          {typeLabel[item.type]}
        </span>

        {/* Play overlay — centered on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20">
          <div className="h-14 w-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <Play className="h-6 w-6 text-primary fill-primary ml-0.5" />
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <h3 className="font-display text-base font-semibold text-stone-900 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{item.speaker}</p>

        <div className="mt-3 flex items-center justify-between">
          {/* Duration chip */}
          <span className="inline-flex items-center gap-1 text-xs text-stone-500 bg-muted px-2.5 py-1 rounded-full">
            <Clock className="h-3 w-3" />
            {item.duration}
          </span>

          {/* Date */}
          <span className="inline-flex items-center gap-1 text-xs text-stone-400">
            <Calendar className="h-3 w-3" />
            {formatDate(item.date)}
          </span>
        </div>
      </div>
    </motion.div>
  );

  if (isExternal) {
    return (
      <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
        {cardContent}
      </a>
    );
  }

  return <div>{cardContent}</div>;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function MediaPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");

  const filtered =
    activeFilter === "All"
      ? mediaItems
      : mediaItems.filter((item) => item.type === typeKeyMap[activeFilter]);

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-12 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h1
            className="font-display text-4xl md:text-5xl font-bold text-stone-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Media
          </motion.h1>
          <motion.p
            className="mt-4 text-xl text-muted-foreground max-w-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Sermons, podcasts, live streams, and highlights from Blessings Global.
          </motion.p>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="py-8 bg-white border-b border-stone-100 sticky top-16 z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === tab
                    ? "bg-primary text-white shadow-sm"
                    : "bg-muted text-stone-600 hover:bg-stone-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Media grid */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {filtered.length === 0 ? (
            <motion.div
              className="text-center py-20 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No {activeFilter.toLowerCase()} available yet. Check back soon.
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item, i) => (
                <MediaCard key={item.id} item={item} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

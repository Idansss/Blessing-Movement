import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Users, Star, ArrowRight, Bell } from "lucide-react";
import { prisma } from "@/lib/db";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Learn",
  description: "Free faith-integrated courses from Blessings Global Outreach",
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CourseData {
  id: string;
  title: string;
  description: string;
  modules: number;
  enrolled: number;
  image: string;
  tag: string;
}

// ---------------------------------------------------------------------------
// Static fallback courses
// ---------------------------------------------------------------------------

const staticCourses: CourseData[] = [
  {
    id: "1",
    title: "Faith & Career Foundations",
    description:
      "Discover God's purpose for your professional life. 8 modules covering calling, excellence, and Kingdom impact in the marketplace.",
    modules: 8,
    enrolled: 47,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400",
    tag: "Career",
  },
  {
    id: "2",
    title: "Blessings Bootcamp: Life Skills",
    description:
      "Practical life skills rooted in biblical wisdom. Covers budgeting, relationships, communication, and personal effectiveness.",
    modules: 6,
    enrolled: 32,
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400",
    tag: "Life Skills",
  },
  {
    id: "3",
    title: "Foundations of Faith",
    description:
      "A 4-week foundational course for new and growing believers. Perfect for anyone wanting to go deeper in their walk with God.",
    modules: 4,
    enrolled: 89,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    tag: "Faith",
  },
];

// ---------------------------------------------------------------------------
// Tag badge colors
// ---------------------------------------------------------------------------

const tagBadgeClass: Record<string, string> = {
  Career: "bg-primary/10 text-primary",
  Faith: "bg-accent/20 text-amber-800",
  "Life Skills": "bg-emerald-100 text-emerald-700",
  default: "bg-stone-100 text-stone-600",
};

function getTagBadge(tag: string): string {
  return tagBadgeClass[tag] ?? tagBadgeClass.default;
}

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

interface Stat {
  label: string;
  value: string;
  icon: React.FC<{ className?: string }>;
}

// ---------------------------------------------------------------------------
// CourseCard (server component — no interactivity needed)
// ---------------------------------------------------------------------------

function CourseCard({ course, index }: { course: CourseData; index: number }) {
  return (
    <div className="glass-dark overflow-hidden flex flex-col hover:shadow-[0_0_24px_rgba(212,175,55,0.35)] transition-shadow">
      {/* Thumbnail */}
      <div className="relative h-48 bg-[#1C1508] overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Tag chip */}
        <span
          className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${getTagBadge(course.tag)}`}
        >
          {course.tag}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-xl font-semibold text-[#F5F0E8] leading-snug">
          {course.title}
        </h3>
        <p className="mt-2 text-sm text-[#F5F0E8B3] leading-relaxed line-clamp-3">
          {course.description}
        </p>

        {/* Meta row */}
        <div className="mt-4 flex items-center gap-4 text-xs text-[#F5F0E8B3]">
          <span className="inline-flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            {course.modules} modules
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {course.enrolled} enrolled
          </span>
        </div>

        {/* CTA */}
        <div className="mt-5 pt-4 border-t border-[#2A1C0C]">
          <Link
            href="/portal/register"
            className="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 rounded-xl bg-accent text-accent-foreground text-sm font-semibold hover:bg-accent-light transition-colors"
            title="You need a free account to enroll"
          >
            Enroll (Free)
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-2 text-center text-xs text-[#F5F0E8B3]">
            A free account is required to enroll
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function LearnPage() {
  // Attempt to fetch courses from DB; fall back to static data if empty or
  // if the course model is not yet present in the schema.
  let courses: CourseData[] = [];
  let totalEnrolled = 0;

  try {
    const dbCourses = await (prisma as any).course?.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (Array.isArray(dbCourses) && dbCourses.length > 0) {
      courses = dbCourses.map((c: any) => ({
        id: String(c.id),
        title: c.title ?? "Untitled Course",
        description: c.description ?? "",
        modules: c.modules ?? c.moduleCount ?? 0,
        enrolled: c.enrolled ?? c.enrolledCount ?? 0,
        image: c.image ?? c.thumbnail ?? staticCourses[0].image,
        tag: c.tag ?? c.category ?? "General",
      }));
    } else {
      courses = staticCourses;
    }
  } catch {
    courses = staticCourses;
  }

  totalEnrolled = courses.reduce((sum, c) => sum + c.enrolled, 0);

  const stats: Stat[] = [
    {
      label: "Courses available",
      value: String(courses.length),
      icon: ({ className }) => <BookOpen className={className} />,
    },
    {
      label: "Students enrolled",
      value: `${totalEnrolled}+`,
      icon: ({ className }) => <Users className={className} />,
    },
    {
      label: "Cost to join",
      value: "Free",
      icon: ({ className }) => <Star className={className} />,
    },
  ];

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-[#1A1208] via-transparent to-[#050302]">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#F5F0E8]">
            Blessings Learning
          </h1>
          <p className="mt-5 text-xl text-[#F5F0E8B3] max-w-2xl">
            Faith-integrated courses for life, career, and purpose. Grow in
            knowledge and in God.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Stats bar                                                           */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-10 bg-[#0D0A07] border-b border-[#1C1508]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-6 text-center">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex flex-col items-center gap-2">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent/20">
                    <Icon className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <span className="font-display text-2xl font-bold text-[#F5F0E8]">
                    {stat.value}
                  </span>
                  <span className="text-xs text-[#F5F0E8B3]">{stat.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Courses grid                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 bg-[#0D0A07]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-10">
            <h2 className="font-display text-3xl font-bold text-[#F5F0E8]">
              Available Courses
            </h2>
            <p className="mt-2 text-[#F5F0E8B3]">
              All courses are self-paced and completely free.
            </p>
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              Courses are being prepared. Check back soon.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, i) => (
                <CourseCard key={course.id} course={course} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Coming soon banner                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 bg-gradient-to-b from-[#1A1208] via-[#0D0A07] to-black">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/20 mb-5">
            <Bell className="h-7 w-7 text-accent-foreground" />
          </div>
          <h2 className="font-display text-2xl font-bold text-[#F5F0E8]">
            More courses launching in 2026
          </h2>
          <p className="mt-3 text-[#F5F0E8B3] max-w-xl mx-auto">
            We&apos;re working on new courses covering leadership, mental health,
            discipleship, and more. Register to be notified when they go live.
          </p>
          <Link
            href="/portal/register"
            className="mt-7 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-accent text-accent-foreground font-semibold hover:bg-accent-light transition-colors"
          >
            Register for updates
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

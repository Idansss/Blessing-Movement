export type EventType = "outreach" | "praise" | "hangout" | "bootcamp";
export interface Event {
  id: string;
  slug: string;
  title: string;
  date: string;
  dateLabel?: string;
  datePrecision?: "day" | "month";
  time: string;
  location: string;
  type: EventType;
  description: string;
  fullDescription?: string;
  image: string;
  featured?: boolean;
  registerUrl?: string;
  capacity?: number;
  speakers?: string[];
  tags?: string[];
}
export function eventDateLabel(event: Event) {
  return (
    event.dateLabel ??
    new Date(event.date + "T12:00:00").toLocaleDateString("en-NG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  );
}
// Client message, 3 October 2026. Month anchors are for sorting, not exact dates.
export const events: Event[] = [
  {
    id: "prison-oct-2026",
    slug: "blessings-prison-outreach-october-2026",
    title: "The Blessings Prison Outreach",
    date: "2026-10-30",
    dateLabel: "30 October 2026",
    datePrecision: "day",
    time: "Time to be confirmed",
    location: "Venue to be confirmed",
    type: "outreach",
    description:
      "Join The Blessings for the next prison outreach on 30 October 2026.",
    fullDescription:
      "The next Blessings Prison Outreach is scheduled for 30 October 2026. Register your interest to hear from the team about the time, venue and ways to take part. The photograph shows a past outreach.",
    image: "/images/outreach/listening.jpg",
    featured: true,
    tags: ["outreach", "prayer", "service"],
  },
  {
    id: "glory-walk-nov-2026",
    slug: "blessings-glory-walk-november-2026",
    title: "The Blessings Glory Walk",
    date: "2026-11-01",
    dateLabel: "November 2026",
    datePrecision: "month",
    time: "Day and time to be confirmed",
    location: "Lagos, Abuja, Ibadan, USA, UK, Canada and other locations",
    type: "hangout",
    description:
      "Glory Walk comes to Nigeria, the USA, UK, Canada and other locations this November.",
    fullDescription:
      "The Blessings Glory Walk is planned for November 2026 in Lagos, Abuja, Ibadan, the USA, UK, Canada and other locations. Exact dates, meeting points and local arrangements will be shared by the team. Register your interest for updates. The photograph shows a past gathering.",
    image: "/images/outreach/movement-family.jpg",
    tags: ["community", "glory walk"],
  },
  {
    id: "general-dec-2026",
    slug: "general-outreach-december-2026",
    title: "General Outreach",
    date: "2026-12-01",
    dateLabel: "December 2026",
    datePrecision: "month",
    time: "Day and time to be confirmed",
    location: "Location to be confirmed",
    type: "outreach",
    description:
      "Another opportunity to serve, give and share the love of Christ at the December general outreach.",
    fullDescription:
      "A general outreach is planned for December 2026. The team will confirm the date, venue and programme details. Register your interest to learn how you can be involved. The photograph shows a past outreach.",
    image: "/images/outreach/welfare-visit.jpg",
    tags: ["outreach", "welfare", "community"],
  },
];

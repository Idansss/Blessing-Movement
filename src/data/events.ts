export type EventType = "outreach" | "praise" | "hangout" | "bootcamp";

export interface Event {
  id: string;
  slug: string;
  title: string;
  date: string;
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

export const events: Event[] = [
  {
    id: "1",
    slug: "march-2026-community-outreach",
    title: "March 2026 Community Outreach",
    date: "2026-03-15",
    time: "9:00 AM",
    location: "Lagos, Nigeria",
    type: "outreach",
    description: "Free medical screening, welfare packs, and prayer at our flagship community outreach. Join us as we spread the love of Christ.",
    fullDescription: "Our March Community Outreach is our flagship event bringing together volunteers, medical professionals, and community members. We provide free medical screenings including blood pressure, glucose, and eye checks, distribute welfare packs with food and hygiene essentials, and pray with every person we meet. This is love in action.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800",
    featured: true,
    capacity: 500,
    speakers: ["Dr. Adaeze Okafor", "Pastor Emmanuel Bello"],
    tags: ["medical", "welfare", "prayer", "community"],
  },
  {
    id: "2",
    slug: "praise-prophesy-night-march-2026",
    title: "Praise & Prophesy Night",
    date: "2026-03-08",
    time: "6:00 PM",
    location: "Online + Lagos",
    type: "praise",
    description: "An evening of worship, prophetic ministry, and encounter with God. Live stream available for our global family.",
    fullDescription: "Join us for an electrifying night of worship and prophetic ministry. Whether you join us physically in Lagos or via live stream, expect an atmosphere charged with the presence of God. We will worship, receive prophetic words, and leave refreshed and renewed in faith.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    capacity: 300,
    speakers: ["Worship Team", "Prophet Seun Adeyemi"],
    tags: ["worship", "prophecy", "online"],
  },
  {
    id: "3",
    slug: "blessings-hangout-young-professionals",
    title: "Blessings Hangout — Young Professionals",
    date: "2026-03-01",
    time: "4:00 PM",
    location: "Victoria Island, Lagos",
    type: "hangout",
    description: "Connect, share, and grow with fellow believers. Casual fellowship and encouragement.",
    fullDescription: "The Blessings Hangout is a relaxed gathering for young professionals to connect over faith, career, and life. Come as you are, bring a friend, and experience the warmth of a community that believes God has great plans for your career and life.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
    capacity: 60,
    tags: ["fellowship", "networking", "young professionals"],
  },
  {
    id: "4",
    slug: "career-bootcamp-cv-interview-prep",
    title: "Career Bootcamp: CV & Interview Prep",
    date: "2026-03-22",
    time: "10:00 AM",
    location: "Hybrid (Lagos + Zoom)",
    type: "bootcamp",
    description: "Faith-integrated professional development. CV review, interview skills, and prayer for your career journey.",
    fullDescription: "Our Career Bootcamp combines professional development with faith. You will get hands-on CV review sessions, interview skills coaching, and industry insights from experienced professionals — all grounded in the belief that God has called you to excellence in your career. Virtual attendance via Zoom available.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
    capacity: 100,
    speakers: ["Tolu Adebayo MBA", "Funmi Oladele (HR Director)", "Coach Emmanuel"],
    tags: ["career", "CV", "interview", "professional development", "zoom"],
  },
  {
    id: "5",
    slug: "easter-food-drive-prayer",
    title: "Easter Food Drive & Prayer",
    date: "2026-04-12",
    time: "8:00 AM",
    location: "Multiple Communities",
    type: "outreach",
    description: "Easter outreach with food packs and the message of resurrection hope.",
    fullDescription: "Celebrate Easter the Blessings way — by giving. Our Easter Food Drive brings resurrection hope to families across multiple communities in Lagos. We distribute food packs, pray with families, and share the good news of Christ's victory. Volunteer slots available.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
    capacity: 200,
    tags: ["easter", "food", "welfare", "prayer"],
  },
];

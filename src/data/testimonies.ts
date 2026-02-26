export interface Testimony {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
  story?: string;
}

export const testimonies: Testimony[] = [
  {
    id: "1",
    name: "Chioma O.",
    role: "Outreach beneficiary",
    quote:
      "I came for the free medical check-up and left with more than medicine — I met Jesus. My family has been blessed with food packs and follow-up prayer.",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400",
  },
  {
    id: "2",
    name: "Emeka N.",
    role: "Volunteer",
    quote:
      "Serving at Blessings outreaches has changed my perspective on ministry. We don't just preach — we touch lives with practical love and the Word.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  },
  {
    id: "3",
    name: "Amina K.",
    role: "Praise & Prophesy attendee",
    quote:
      "At the Praise Night I received prayer for healing. I'm not the same. The atmosphere was so full of God's presence — I brought three friends to the next one.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
  },
  {
    id: "4",
    name: "David T.",
    role: "Career Bootcamp graduate",
    quote:
      "The Bootcamp helped me refine my CV and prepare for interviews. I got a job within two months. More than that, I found a community that prays with me.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
  },
];

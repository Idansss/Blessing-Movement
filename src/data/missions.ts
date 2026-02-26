export interface Mission {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  scripture: string;
  reference: string;
  icon: string;
  highlights: string[];
  image: string;
}

export const missions: Mission[] = [
  {
    id: "1",
    title: "Physical Blessings",
    subtitle: "The Blessings — Medical & Welfare Outreaches",
    description:
      "We show people the love of Jesus Christ by meeting their physical needs. Free medical screenings, welfare packs, food distribution, and follow-up care in underserved communities.",
    scripture:
      "Command those who are rich in this present world not to be arrogant nor to put their hope in wealth, but to put their hope in God, who richly provides us with everything for our enjoyment. Command them to do good, to be rich in good deeds, and to be generous and willing to share.",
    reference: "1 Timothy 6:17-19",
    icon: "Heart",
    highlights: [
      "Free medical screenings & referrals",
      "Welfare packs & food distribution",
      "Partnership with clinics and NGOs",
      "Follow-up and prayer with beneficiaries",
    ],
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800",
  },
  {
    id: "2",
    title: "Spiritual Blessings",
    subtitle: "Praise & Prophesy Events",
    description:
      "We bring people to the knowledge of Jesus Christ which births salvation, and declare God's abundant grace of deliverance. Worship, prophetic ministry, and altar response in an atmosphere of encounter.",
    scripture:
      "He said to them, 'Go into all the world and preach the gospel to all creation. Whoever believes and is baptized will be saved... And these signs will accompany those who believe: In my name they will drive out demons; they will speak in new tongues.'",
    reference: "Mark 16:15-18",
    icon: "Music",
    highlights: [
      "Monthly Praise & Prophesy nights",
      "Live stream for global audience",
      "Prayer teams & altar ministry",
      "Salvation, healing & discipleship follow-up",
    ],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
  },
  {
    id: "3",
    title: "Edify Believers",
    subtitle: "Blessings Movement — Hangouts, Retreats, Bootcamps",
    description:
      "We create a rich spiritual environment with well-organized programs that foster growth physically and spiritually. Community, career development, and discipleship in one family.",
    scripture:
      "Dear friend, I pray that you may enjoy good health and that all may go well with you, even as your soul gets along well.",
    reference: "3 John 2",
    icon: "Users",
    highlights: [
      "Hangouts & fellowship by city",
      "Career Bootcamps (CV, interviews, referrals)",
      "Blessings Pods — local chapters",
      "Mentorship and leadership development",
    ],
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
  },
];

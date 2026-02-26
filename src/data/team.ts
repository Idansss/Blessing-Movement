export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Leadership",
    role: "Founder & Vision Bearer",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
    bio: "Leading the charge to spread the love of Christ through practical and spiritual blessings.",
  },
  {
    id: "2",
    name: "Ministry Lead",
    role: "Praise & Prophesy",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    bio: "Creating spaces where people encounter God through worship and prophetic ministry.",
  },
  {
    id: "3",
    name: "Outreach Director",
    role: "Medical & Welfare",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    bio: "Coordinating medical and welfare outreaches to meet physical needs in Jesus' name.",
  },
  {
    id: "4",
    name: "Community Lead",
    role: "Blessings Movement",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
    bio: "Building the global network of Pods, Hangouts, and discipleship communities.",
  },
];

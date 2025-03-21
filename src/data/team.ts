export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

export const leadershipTeam: TeamMember[] = [
  {
    id: 1,
    name: "Rev. Pastor Vikram Shinde",
    role: "Senior Pastor",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=300"
  },
  {
    id: 2,
    name: "Dr. Hithakshi Shinde",
    role: "Senior Pastor",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300&h=300"
  },
  {
    id: 3,
    name: "Gitanjali Pillai",
    role: "Worship Leader",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300&h=300"
  },
  {
    id: 4,
    name: "Anish Pillai",
    role: "Youth Pastor",
    image: "https://images.unsplash.com/photo-1525130413817-d45c1d127c42?auto=format&fit=crop&q=80&w=300&h=300"
  }
];

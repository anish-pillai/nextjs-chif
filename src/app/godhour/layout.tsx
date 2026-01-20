import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "God's Hour",
  description: "Join us for our daily prayer and fellowship meeting.",
};

export default function GodHourLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

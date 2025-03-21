export interface Sermon {
  id: number;
  title: string;
  date: string;
  pastor: string;
  series: string;
  image: string;
}

export const sermons: Sermon[] = [
  {
    id: 1,
    title: 'Walking in Faith',
    date: 'March 10, 2024',
    pastor: 'Pastor John Smith',
    series: 'Faith Foundations',
    image: '/images/worship-lights.jpg',
  },
  {
    id: 2,
    title: 'The Power of Prayer',
    date: 'March 3, 2024',
    pastor: 'Pastor Sarah Johnson',
    series: 'Prayer Life',
    image: '/images/network.jpg',
  },
  {
    id: 3,
    title: 'Living with Purpose',
    date: 'February 25, 2024',
    pastor: 'Pastor Michael Chen',
    series: 'Purpose Driven Life',
    image: '/images/purpose.jpg',
  },
];

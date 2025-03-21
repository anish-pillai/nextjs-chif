export interface SmallGroup {
  id: number;
  name: string;
  day: string;
  time: string;
  location: string;
}

export const smallGroups: SmallGroup[] = [
  {
    id: 1,
    name: 'Young Adults',
    day: 'Tuesday',
    time: '7:00 PM',
    location: 'Various Homes',
  },
  {
    id: 2,
    name: 'Family Group',
    day: 'Wednesday',
    time: '6:30 PM',
    location: 'Church Fellowship Hall',
  },
  {
    id: 3,
    name: 'Senior Adults',
    day: 'Thursday',
    time: '10:00 AM',
    location: 'Church Library',
  },
];

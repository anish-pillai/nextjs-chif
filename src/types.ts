import { Event as PrismaEvent, EventType as PrismaEventType, Sermon as PrismaSermon, User } from '@prisma/client';

// Define the Event type to match what's expected by the client components
export type Event = Omit<PrismaEvent, 'startTime' | 'endTime'> & {
  startTime: number; // Unix timestamp in seconds
  endTime: number; // Unix timestamp in seconds
  organizer: {
    id: string;
    name: string;
  };
};

// Define the Sermon type to match what's expected by the client components
export type Sermon = Omit<PrismaSermon, 'date'> & {
  date: number; // Unix timestamp in seconds
  preacher: {
    id: string;
    name: string;
  };
};

// Define the SermonWithPreacher type that's used in the client component
export type SermonWithPreacher = Omit<Sermon, 'date' | 'createdAt' | 'updatedAt'> & {
  date: Date; // JavaScript Date object
  createdAt: Date; // JavaScript Date object
  updatedAt: Date; // JavaScript Date object
  preacher: {
    id: string;
    name: string;
  };
};

// Re-export EventType from the Prisma client
export type EventType = PrismaEventType;

// Define type for Event filter queries
export type EventWhereInput = {
  type?: EventType;
  startTime?: { gte?: number };
  endTime?: { lte?: number };
};

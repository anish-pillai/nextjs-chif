import { Event as PrismaEvent, User as PrismaUser, Prisma } from '@prisma/client';

export type EventType = PrismaEvent['type'];
export type UserRole = PrismaUser['role'];

export type User = PrismaUser;

export type Event = PrismaEvent & {
  organizer: Pick<User, 'id' | 'name'>;
};

export type EventWhereInput = Prisma.EventWhereInput;

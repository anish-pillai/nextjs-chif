import { z } from 'zod';
import { EventType, Role } from '@prisma/client';

// User validation schemas
export const createUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.nativeEnum(Role).optional().default('MEMBER'),
  createdAt: z.number().int().min(0).optional().default(() => Math.floor(Date.now() / 1000)),
  updatedAt: z.number().int().min(0).optional().default(() => Math.floor(Date.now() / 1000)),
});

export const updateUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  role: z.nativeEnum(Role).optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update'
});

// Event validation schemas
export const createEventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  startTime: z.number().int().min(0),
  endTime: z.number().int().min(0),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  type: z.nativeEnum(EventType).optional().default('OTHER'),
  organizerId: z.string().uuid().or(z.string().cuid()),
  createdAt: z.number().int().min(0).optional(),
  updatedAt: z.number().int().min(0).optional(),
}).refine((data) => data.endTime > data.startTime, {
  message: 'End time must be after start time',
  path: ['endTime'],
});

export const updateEventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').optional(),
  description: z.string().min(10, 'Description must be at least 10 characters').optional(),
  startTime: z.number().int().min(0).optional(),
  endTime: z.number().int().min(0).optional(),
  location: z.string().min(3, 'Location must be at least 3 characters').optional(),
  type: z.nativeEnum(EventType).optional(),
  organizerId: z.string().uuid().or(z.string().cuid()).optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update'
});

// Sermon validation schemas
export const createSermonSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  date: z.coerce.date(),
  videoUrl: z.string().url('Invalid video URL').optional().nullable(),
  audioUrl: z.string().url('Invalid audio URL').optional().nullable(),
  preacherId: z.string().uuid().or(z.string().cuid()),
  scripture: z.string().min(3, 'Scripture reference must be at least 3 characters'),
  series: z.string().optional().nullable(),
});

export const updateSermonSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').optional(),
  description: z.string().min(10, 'Description must be at least 10 characters').optional(),
  date: z.coerce.date().optional(),
  videoUrl: z.string().url('Invalid video URL').optional().nullable(),
  audioUrl: z.string().url('Invalid audio URL').optional().nullable(),
  preacherId: z.string().uuid().or(z.string().cuid()).optional(),
  scripture: z.string().min(3, 'Scripture reference must be at least 3 characters').optional(),
  series: z.string().optional().nullable(),
}).refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update'
});

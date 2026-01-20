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
  startDateTime: z.string().datetime(),
  endDateTime: z.string().datetime(),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  type: z.nativeEnum(EventType).optional().default('OTHER'),
  organizerId: z.string().uuid().or(z.string().cuid()).optional(),
  createdAt: z.number().int().min(0).optional(),
  updatedAt: z.number().int().min(0).optional(),
}).refine((data) => new Date(data.endDateTime) > new Date(data.startDateTime), {
  message: 'End time must be after start time',
  path: ['endDateTime'],
});

export const updateEventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').optional(),
  description: z.string().min(10, 'Description must be at least 10 characters').optional(),
  startDateTime: z.string().datetime().optional(),
  endDateTime: z.string().datetime().optional(),
  location: z.string().min(3, 'Location must be at least 3 characters').optional(),
  type: z.nativeEnum(EventType).optional(),
  organizerId: z.string().uuid().or(z.string().cuid()).optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update'
}).refine((data) => {
  // Only validate time relationship if both start and end times are provided
  if (data.startDateTime && data.endDateTime) {
    return new Date(data.endDateTime) > new Date(data.startDateTime);
  }
  return true;
}, {
  message: 'End time must be after start time',
  path: ['endDateTime'],
});

// Sermon validation schemas
export const createSermonSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  date: z.union([
    // Accept Unix timestamp as number
    z.number().int().min(0),
    // Or coerce string/Date to Date object
    z.coerce.date().transform(date => {
      // Ensure date is valid
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
      // Return the Unix timestamp in seconds
      return Math.floor(date.getTime() / 1000);
    })
  ]),
  videoUrl: z.string().url('Invalid video URL').optional().nullable(),
  preacherId: z.string().min(1, 'Preacher ID is required'),
});

export const updateSermonSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').optional(),
  date: z.union([
    // Accept Unix timestamp as number
    z.number().int().min(0).optional(),
    // Or coerce string/Date to Date object
    z.coerce.date().transform(date => {
      // Ensure date is valid
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
      // Return the Unix timestamp in seconds
      return Math.floor(date.getTime() / 1000);
    }).optional()
  ]).optional(),
  videoUrl: z.string().url('Invalid video URL').optional().nullable(),
  preacherId: z.string().min(1, 'Preacher ID is required').optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update'
});

// Site validation schemas
export const createSiteSchema = z.object({
  domain: z.string().min(3, 'Domain must be at least 3 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  titleHeader: z.string().min(2, 'Title header must be at least 2 characters'),
  titleSubHeader: z.string().min(2, 'Title subheader must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  logo: z.string().optional().default('/images/logo.png'),
  isActive: z.boolean().optional().default(true),
  isDefault: z.boolean().optional().default(false),
});

export const updateSiteSchema = z.object({
  domain: z.string().min(3, 'Domain must be at least 3 characters').optional(),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  titleHeader: z.string().min(2, 'Title header must be at least 2 characters').optional(),
  titleSubHeader: z.string().min(2, 'Title subheader must be at least 2 characters').optional(),
  description: z.string().min(10, 'Description must be at least 10 characters').optional(),
  logo: z.string().optional(),
  isActive: z.boolean().optional(),
  isDefault: z.boolean().optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update'
});

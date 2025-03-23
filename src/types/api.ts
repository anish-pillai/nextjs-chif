import { Event, Sermon, User, Role, EventType } from '@prisma/client';

// Common response structure
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// User API types
export interface CreateUserRequest {
  email: string;
  name: string;
  role?: Role;
}

export interface UpdateUserRequest {
  name?: string;
  role?: Role;
}

// Event API types
export interface CreateEventRequest {
  title: string;
  description: string;
  startTime: Date | string;
  endTime: Date | string;
  location: string;
  type?: EventType;
  organizerId: string;
}

export interface UpdateEventRequest {
  title?: string;
  description?: string;
  startTime?: Date | string;
  endTime?: Date | string;
  location?: string;
  type?: EventType;
  organizerId?: string;
}

export interface EventFilters {
  type?: EventType;
  startAfter?: Date | string;
  endBefore?: Date | string;
}

// Sermon API types
export interface CreateSermonRequest {
  title: string;
  description: string;
  date: Date | string;
  videoUrl?: string;
  audioUrl?: string;
  preacherId: string;
  scripture: string;
  series?: string;
}

export interface UpdateSermonRequest {
  title?: string;
  description?: string;
  date?: Date | string;
  videoUrl?: string;
  audioUrl?: string;
  preacherId?: string;
  scripture?: string;
  series?: string;
}

export interface SermonFilters {
  preacherId?: string;
  series?: string;
}

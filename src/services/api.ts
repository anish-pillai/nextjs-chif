import { 
  ApiResponse, 
  CreateEventRequest, 
  CreateSermonRequest, 
  CreateUserRequest,
  UpdateEventRequest,
  UpdateSermonRequest,
  UpdateUserRequest 
} from '@/types/api';
import { Event, EventType, Role, Sermon, User } from '@prisma/client';

// API base URL
const API_BASE = '/api';

// Generic fetch function
async function fetchAPI<T>(
  endpoint: string, 
  method: string = 'GET', 
  data?: any
): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, options);
  const result = await response.json() as ApiResponse<T>;

  if (!result.success) {
    throw new Error(result.error || 'An unknown error occurred');
  }

  return result.data as T;
}

// User API services
export const UserService = {
  // Get all users
  getUsers: () => fetchAPI<User[]>('/users'),

  // Get user by ID
  getUser: (id: string) => fetchAPI<User>(`/users/${id}`),

  // Create a new user
  createUser: (data: CreateUserRequest) => fetchAPI<User>('/users', 'POST', data),

  // Update user
  updateUser: (id: string, data: UpdateUserRequest) => fetchAPI<User>(`/users/${id}`, 'PUT', data),

  // Delete user
  deleteUser: (id: string) => fetchAPI<{ deleted: boolean }>(`/users/${id}`, 'DELETE'),
};

// Event API services
export const EventService = {
  // Get all events with optional filtering
  getEvents: (type?: EventType, startAfter?: Date | string, endBefore?: Date | string) => {
    let url = '/events';
    const params = new URLSearchParams();
    
    if (type) params.append('type', type);
    if (startAfter) params.append('startAfter', startAfter.toString());
    if (endBefore) params.append('endBefore', endBefore.toString());
    
    const queryString = params.toString();
    if (queryString) url += `?${queryString}`;
    
    return fetchAPI<Event[]>(url);
  },

  // Get event by ID
  getEvent: (id: string) => fetchAPI<Event>(`/events/${id}`),

  // Create a new event
  createEvent: (data: CreateEventRequest) => fetchAPI<Event>('/events', 'POST', data),

  // Update event
  updateEvent: (id: string, data: UpdateEventRequest) => fetchAPI<Event>(`/events/${id}`, 'PUT', data),

  // Delete event
  deleteEvent: (id: string) => fetchAPI<{ deleted: boolean }>(`/events/${id}`, 'DELETE'),
};

// Sermon API services
export const SermonService = {
  // Get all sermons with optional filtering
  getSermons: (preacherId?: string, series?: string, limit: number = 10, offset: number = 0) => {
    let url = '/sermons';
    const params = new URLSearchParams();
    
    if (preacherId) params.append('preacherId', preacherId);
    if (series) params.append('series', series);
    params.append('limit', limit.toString());
    params.append('offset', offset.toString());
    
    const queryString = params.toString();
    if (queryString) url += `?${queryString}`;
    
    return fetchAPI<{
      sermons: Sermon[],
      pagination: {
        total: number,
        limit: number,
        offset: number,
        hasMore: boolean
      }
    }>(url);
  },

  // Get sermon by ID
  getSermon: (id: string) => fetchAPI<Sermon>(`/sermons/${id}`),

  // Create a new sermon
  createSermon: (data: CreateSermonRequest) => fetchAPI<Sermon>('/sermons', 'POST', data),

  // Update sermon
  updateSermon: (id: string, data: UpdateSermonRequest) => fetchAPI<Sermon>(`/sermons/${id}`, 'PUT', data),

  // Delete sermon
  deleteSermon: (id: string) => fetchAPI<{ deleted: boolean }>(`/sermons/${id}`, 'DELETE'),
};

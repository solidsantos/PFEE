import type { Event } from './event';

export interface Registration {
  id: number;
  userId: number;
  eventId: number;
  event?: Event;
  createdAt?: string;
}
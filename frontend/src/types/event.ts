export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  organizer: string;
  capacity: number;
}

export interface EventFilters {
  search?: string;
  category?: string;
  date?: string;
  location?: string;
}
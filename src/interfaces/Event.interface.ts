export interface TicketTier {
  id: string;
  name: string;
  price: number;
  description: string;
  available: number;
  total: number;
  perks: string[];
}

export interface IEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description?: string;
  location: string;
  coverImage: string;
  priceRange: {
    min: number;
    max: number;
  };
  category: string;
  isFeatured: boolean;
  organizer: string;
  attendees: number;
  isBookmarked: boolean;
  distance: number;
  ticketTiers: TicketTier[];
}

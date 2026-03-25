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

export interface VenueSpace {
  id: string;
  venue_id: string;
  space_name: string;
  capacity: number;
  max_capacity: number;
  created_by: number;
  created_at: string;
  updated_by: number;
  updated_at: string;
  deleted_at: string | null;
  deleted_by: number | null;
  is_deleted: boolean;
}

export interface VenuePolicy {
  id: string;
  venue_id: string;
  key: string;
  value: string;
  icon: string;
  content_type: "Policy" | "Other Info";
  created_by: number;
  created_at: string;
  updated_by: number;
  updated_at: string;
  deleted_at: string | null;
  deleted_by: number | null;
  is_deleted: boolean;
}

export interface IVenue {
  id: string;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  venue_images: string[];
  keywords: string[];
  created_by: number;
  created_at: string;
  updated_by: number;
  updated_at: string;
  deleted_at: string | null;
  deleted_by: number | null;
  is_deleted: boolean;
  status: "Draft" | "Active" | "Inactive";
  spaces?: VenueSpace[];
  policies?: VenuePolicy[];
  rating?: number;
  reviewCount?: number;
  upcomingEvents?: number;
}

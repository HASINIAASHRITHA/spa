
export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  image?: string;
  createdAt: Date;
}

export interface Stylist {
  id: string;
  name: string;
  profileImage: string;
  experience: string; // Changed from number to string to match form usage
  specializations: string[];
  portfolio: string[];
  bio: string;
  available: boolean;
  title: string;
  rating: number;
}

export interface Appointment {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceId: string;
  stylistId?: string;
  dateTime: Date;
  duration: number;
  notes?: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  addOns: string[];
  totalPrice: number;
  checkedIn: boolean;
  checkedOut: boolean;
  createdAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth?: Date;
  address?: string;
  preferences: string[];
  visitHistory: string[];
  totalVisits: number;
  createdAt: Date;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  services: string[];
  originalPrice: number;
  discountedPrice: number;
  validUntil: Date;
  image: string;
}

export interface Promotion {
  id: string;
  name: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  type: 'percentage' | 'fixed'; // Add this for backward compatibility
  value: number; // Add this for backward compatibility
  code?: string;
  validFrom: Date;
  validUntil: Date;
  endDate: Date; // Add this for backward compatibility
  active: boolean;
  applicableServices: string[];
  usageLimit?: number;
  usageCount: number;
  createdAt: Date;
}

export interface Membership {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in months
  benefits: string[];
  discountPercentage: number;
  active: boolean;
}

export interface Feedback {
  id: string;
  customerName: string;
  customerEmail: string;
  rating: number; // 1-5 stars
  message: string;
  serviceRating?: number;
  staffRating?: number;
  facilityRating?: number;
  createdAt: Date;
  status: 'new' | 'read' | 'responded';
  response?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: 'facilities' | 'treatments' | 'spa' | 'treatment' | 'relaxation' | 'amenities' | 'exterior';
  description?: string;
  createdAt: Date;
}

// Utility functions for Indian localization
export const formatIndianPrice = (price: number): string => {
  return `₹${price.toLocaleString('en-IN')}`;
};

export const formatIndianPhone = (phone: string): string => {
  if (phone.startsWith('+91')) return phone;
  if (phone.startsWith('91')) return `+${phone}`;
  return `+91${phone}`;
};


export type Language = 'EN' | 'DE' | 'IT' | 'ES' | 'FR' | 'RU' | 'HU' | 'RO' | 'SK';

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  subcategories: string[];
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  subcategory: string;
  author: string;
  date: string;
  updatedDate?: string;
  readingTime: string;
  tags: string[];
  language: Language;
  isPremium?: boolean;
}

export interface DigitalProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  type: 'PDF' | 'Template' | 'Bundle';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'OWNER' | 'ADMIN' | 'EDITOR' | 'AUTHOR' | 'USER';
  isPremium: boolean;
}

export interface Collection {
  id: string;
  title: string;
  slug: string;
  description: string;
  posts: string[]; // Post IDs
}

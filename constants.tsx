
import { Category, Post, DigitalProduct, Language } from './types';

export const PILLARS: Category[] = [
  {
    id: 'money',
    name: 'Money & Work',
    slug: 'money-work',
    icon: '💰',
    description: 'Expert advice on side hustles, saving, and career growth.',
    subcategories: ['Side Hustles', 'Saving', 'Investment', 'Careers']
  },
  {
    id: 'tech',
    name: 'Tech & AI',
    slug: 'tech-ai',
    icon: '🤖',
    description: 'Master the latest apps, AI tools, and troubleshooting guides.',
    subcategories: ['Software', 'Artificial Intelligence', 'Hardware', 'Mobile']
  },
  {
    id: 'health',
    name: 'Health & Wellness',
    slug: 'health-wellness',
    icon: '🌱',
    description: 'Practical habits for a balanced mind and body.',
    subcategories: ['Mental Health', 'Fitness', 'Nutrition', 'Sleep']
  },
  {
    id: 'home',
    name: 'Home & Lifestyle',
    slug: 'home-lifestyle',
    icon: '🏠',
    description: 'DIY organization and family life hacks.',
    subcategories: ['Organization', 'DIY', 'Family', 'Gardening']
  },
  {
    id: 'travel',
    name: 'Travel & Local',
    slug: 'travel-local',
    icon: '✈️',
    description: 'Unforgettable itineraries and travel gear reviews.',
    subcategories: ['Itineraries', 'Gear', 'Budget Travel', 'Solo Travel']
  },
  {
    id: 'food',
    name: 'Food & Cooking',
    slug: 'food-cooking',
    icon: '🍳',
    description: 'Recipes and essential guides for home cooks.',
    subcategories: ['Recipes', 'Kitchen Tools', 'Meal Prep', 'Baking']
  },
  {
    id: 'learning',
    name: 'Learning & Skills',
    slug: 'learning-skills',
    icon: '📚',
    description: 'Productivity tips and language learning resources.',
    subcategories: ['Productivity', 'Study Tips', 'Languages', 'Online Courses']
  },
  {
    id: 'culture',
    name: 'Entertainment & Culture',
    slug: 'entertainment-culture',
    icon: '🎬',
    description: 'Streaming picks, books, and creative hobbies.',
    subcategories: ['Streaming', 'Books', 'Hobbies', 'Movies']
  }
];

// Mocking a set of 30+ posts across all pillars
export const POSTS: Post[] = Array.from({ length: 40 }).map((_, i) => ({
  id: `post-${i}`,
  title: [
    'How to Start a Side Hustle in 2024',
    '10 Best Free AI Tools for Productivity',
    'Morning Routine Habits for Mental Clarity',
    'The Ultimate Guide to Minimalist Packing',
    '5 Easy Recipes for Busy Weeknights',
    'Mastering Python: A Beginners Path',
    'Best Budget Smartphones This Year',
    'Gardening Tips for Small Balconies'
  ][i % 8] + (i > 8 ? ` (Part ${Math.ceil(i/8)})` : ''),
  slug: `post-slug-${i}`,
  excerpt: 'A comprehensive guide exploring practical strategies to improve your daily life and achieve long-term success in this niche.',
  content: `
    ## Introduction
    In today's fast-paced world, finding the right balance between productivity and personal growth is essential. This guide dives deep into practical steps you can take today.
    
    ## Why This Matters
    Understanding the core principles of this topic allows you to build a foundation for long-term mastery. Whether you are a beginner or looking to refine your skills, we've got you covered.
    
    ### Key Takeaways
    1. Consistency is key to any successful habit.
    2. Leverage tools that automate repetitive tasks.
    3. Never stop learning from diverse sources.
    
    ## Detailed Breakdown
    Lorum ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    
    | Feature | Benefit |
    |---------|---------|
    | Speed   | Faster results |
    | Cost    | High ROI |
    
    > "The best way to predict the future is to create it." - Peter Drucker
  `,
  coverImage: `https://picsum.photos/seed/${i}/800/600`,
  category: PILLARS[i % PILLARS.length].id,
  subcategory: PILLARS[i % PILLARS.length].subcategories[0],
  author: 'Jordan Smith',
  date: '2024-05-15',
  updatedDate: i % 3 === 0 ? '2024-06-01' : undefined,
  readingTime: '8 min read',
  tags: ['featured', 'guide', 'popular'],
  language: 'EN',
  isPremium: i % 10 === 0
}));

export const PRODUCTS: DigitalProduct[] = [
  { id: 'p1', name: '2024 Side Hustle Planner', description: 'Complete PDF guide and tracking sheets.', price: 19.99, image: 'https://picsum.photos/seed/p1/400/400', type: 'PDF' },
  { id: 'p2', name: 'Notion Life Operating System', description: 'Advanced template for your daily tasks.', price: 49.00, image: 'https://picsum.photos/seed/p2/400/400', type: 'Template' },
  { id: 'p3', name: 'Meal Prep Masterclass', description: 'Video bundle + recipe book.', price: 29.99, image: 'https://picsum.photos/seed/p3/400/400', type: 'Bundle' },
];

export const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'EN', label: 'English' },
  { code: 'DE', label: 'Deutsch' },
  { code: 'IT', label: 'Italiano' },
  { code: 'ES', label: 'Español' },
  { code: 'FR', label: 'Français' },
  { code: 'RU', label: 'Русский' },
  { code: 'HU', label: 'Magyar' },
  { code: 'RO', label: 'Română' },
  { code: 'SK', label: 'Slovenčina' }
];

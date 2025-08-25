// Environment variable type definitions
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Supabase
      NEXT_PUBLIC_SUPABASE_URL: string
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string

      // Add other environment variables here as needed
      // DATABASE_URL?: string
      // API_KEY?: string
      // APP_SECRET?: string
    }
  }
}

export type Member = {
  id: string;
  name: string;
  role: string;
  category: 'leader' | 'board';
  imageUrl: string;
  email: string;
  linkedinUrl: string;
};

export type Activity = {
  id: string;
  action: 'created' | 'updated' | 'deleted';
  entity: 'member' | 'event' | 'blog' | 'glossary' | 'contact message';
  entityName: string;
  timestamp: string;
  details?: string;
};

export type Event = {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  location: string;
  gallery: Array<{ src: string; alt: string; }>;
};

export type BlogPost = {
  id: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  imageUrl: string;
};

export type GlossaryTerm = {
  id: string;
  term: string;
  definition: string;
  category: string;
  featured?: boolean;
  icon?: string;
};

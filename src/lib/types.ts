export type Member = {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  dataAiHint: string;
  email: string;
  linkedinUrl: string;
};

export type Event = {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  dataAiHint: string;
  location: string;
  gallery: Array<{ src: string; alt: string; dataAiHint: string; }>;
};

export type BlogPost = {
  id: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  dataAiHint: string;
};

export type GlossaryTerm = {
  id: string;
  term: string;
  definition: string;
  category: string;
  featured?: boolean;
  icon?: string;
};

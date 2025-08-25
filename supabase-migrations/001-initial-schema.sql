-- QAIU Website Database Schema
-- Initial schema creation for Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE member_category AS ENUM ('leader', 'board');
CREATE TYPE activity_action AS ENUM ('created', 'updated', 'deleted');
CREATE TYPE activity_entity AS ENUM ('member', 'event', 'blog', 'glossary');

-- Create members table
CREATE TABLE IF NOT EXISTS members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    category member_category NOT NULL,
    "imageUrl" TEXT,
    email VARCHAR(255) NOT NULL UNIQUE,
    "linkedinUrl" TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    description TEXT NOT NULL,
    "imageUrl" TEXT,
    location VARCHAR(255),
    gallery JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    "imageUrl" TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create glossary_terms table
CREATE TABLE IF NOT EXISTS glossary_terms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    term VARCHAR(255) NOT NULL UNIQUE,
    definition TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    featured BOOLEAN DEFAULT FALSE,
    icon VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action activity_action NOT NULL,
    entity activity_entity NOT NULL,
    "entityName" VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_members_category ON members(category);
CREATE INDEX IF NOT EXISTS idx_members_name ON members(name);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_events_title ON events(title);
CREATE INDEX IF NOT EXISTS idx_blog_posts_date ON blog_posts(date);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author ON blog_posts(author);
CREATE INDEX IF NOT EXISTS idx_glossary_terms_category ON glossary_terms(category);
CREATE INDEX IF NOT EXISTS idx_glossary_terms_featured ON glossary_terms(featured);
CREATE INDEX IF NOT EXISTS idx_activities_timestamp ON activities(timestamp);
CREATE INDEX IF NOT EXISTS idx_activities_entity ON activities(entity);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_members_updated_at 
    BEFORE UPDATE ON members 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at 
    BEFORE UPDATE ON events 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at 
    BEFORE UPDATE ON blog_posts 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_glossary_terms_updated_at 
    BEFORE UPDATE ON glossary_terms 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for testing
INSERT INTO members (name, role, category, "imageUrl", email, "linkedinUrl") VALUES
('Ahmed Mohamed', 'Team Leader', 'leader', '/images/ahmed.jpg', 'ahmed@qaiu.com', 'https://linkedin.com/in/ahmed'),
('Fatima Ali', 'Board Member', 'board', '/images/fatima.jpg', 'fatima@qaiu.com', 'https://linkedin.com/in/fatima'),
('Mohammed Hassan', 'Developer', 'leader', '/images/mohammed.jpg', 'mohammed@qaiu.com', 'https://linkedin.com/in/mohammed')
ON CONFLICT (email) DO NOTHING;

INSERT INTO events (title, date, description, "imageUrl", location) VALUES
('AI Conference 2024', '2024-12-15 09:00:00+00', 'Annual conference on latest AI developments', '/images/ai-conference.jpg', 'Main Conference Hall'),
('Machine Learning Workshop', '2024-12-20 14:00:00+00', 'Practical workshop on ML fundamentals', '/images/ml-workshop.jpg', 'Learning Lab')
ON CONFLICT DO NOTHING;

INSERT INTO blog_posts (title, author, date, excerpt, content, "imageUrl") VALUES
('Future of AI in Education', 'Ahmed Mohamed', '2024-12-01 10:00:00+00', 'Exploring AI role in transforming education', 'Full article content here...', '/images/ai-education.jpg'),
('Deep Learning Fundamentals', 'Fatima Ali', '2024-11-25 15:00:00+00', 'Comprehensive guide to understanding deep learning', 'Full article content here...', '/images/deep-learning.jpg')
ON CONFLICT DO NOTHING;

INSERT INTO glossary_terms (term, definition, category, featured, icon) VALUES
('Artificial Intelligence', 'Simulation of human intelligence in machines', 'Core Concepts', true, '🤖'),
('Machine Learning', 'AI branch focused on developing systems that learn from data', 'Machine Learning', true, '📊'),
('Neural Networks', 'System simulating brain neurons', 'Machine Learning', false, '🧠')
ON CONFLICT (term) DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE glossary_terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access to members" ON members
    FOR SELECT USING (true);

CREATE POLICY "Public read access to events" ON events
    FOR SELECT USING (true);

CREATE POLICY "Public read access to blog_posts" ON blog_posts
    FOR SELECT USING (true);

CREATE POLICY "Public read access to glossary_terms" ON glossary_terms
    FOR SELECT USING (true);

-- Create policies for authenticated users (admin access)
CREATE POLICY "Admin full access to members" ON members
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access to events" ON events
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access to blog_posts" ON blog_posts
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access to glossary_terms" ON glossary_terms
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access to activities" ON activities
    FOR ALL USING (auth.role() = 'authenticated');

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

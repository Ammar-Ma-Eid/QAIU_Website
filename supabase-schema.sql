
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create members table
CREATE TABLE members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('leader', 'board')),
    image_url TEXT,
    data_ai_hint TEXT,
    email VARCHAR(255),
    linkedin_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    description TEXT,
    image_url TEXT,
    data_ai_hint TEXT,
    location VARCHAR(255),
    gallery JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    image_url TEXT,
    data_ai_hint TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create glossary_terms table
CREATE TABLE glossary_terms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    term VARCHAR(255) NOT NULL,
    definition TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    featured BOOLEAN DEFAULT FALSE,
    icon VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create activities table
CREATE TABLE activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action VARCHAR(50) NOT NULL CHECK (action IN ('created', 'updated', 'deleted')),
    entity VARCHAR(50) NOT NULL CHECK (entity IN ('member', 'event', 'blog', 'glossary')),
    entity_name VARCHAR(255) NOT NULL,
    details TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_members_category ON members(category);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_blog_posts_date ON blog_posts(date);
CREATE INDEX idx_glossary_terms_category ON glossary_terms(category);
CREATE INDEX idx_glossary_terms_featured ON glossary_terms(featured);
CREATE INDEX idx_activities_timestamp ON activities(timestamp);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_glossary_terms_updated_at BEFORE UPDATE ON glossary_terms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE glossary_terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Policies for public read access
CREATE POLICY "Allow public read access on members" ON members FOR SELECT USING (true);
CREATE POLICY "Allow public read access on events" ON events FOR SELECT USING (true);
CREATE POLICY "Allow public read access on blog_posts" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Allow public read access on glossary_terms" ON glossary_terms FOR SELECT USING (true);
CREATE POLICY "Allow public read access on activities" ON activities FOR SELECT USING (true);

-- Policies for authenticated admin access (you can customize these based on your auth setup)
CREATE POLICY "Allow admin full access on members" ON members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access on events" ON events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access on blog_posts" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access on glossary_terms" ON glossary_terms FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access on activities" ON activities FOR ALL USING (auth.role() = 'authenticated');

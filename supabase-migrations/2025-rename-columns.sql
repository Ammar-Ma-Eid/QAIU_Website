-- Migration: rename snake_case columns to camelCase to match app code
-- Safe to run multiple times with IF EXISTS checks where supported

-- MEMBERS
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'members' AND column_name = 'image_url'
    ) THEN
        EXECUTE 'ALTER TABLE members RENAME COLUMN image_url TO "imageUrl"';
    END IF;

    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'members' AND column_name = 'linkedin_url'
    ) THEN
        EXECUTE 'ALTER TABLE members RENAME COLUMN linkedin_url TO "linkedinUrl"';
    END IF;

    -- Drop dataAiHint column if it exists
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'members' AND column_name = 'dataAiHint'
    ) THEN
        EXECUTE 'ALTER TABLE members DROP COLUMN "dataAiHint"';
    END IF;

    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'members' AND column_name = 'data_ai_hint'
    ) THEN
        EXECUTE 'ALTER TABLE members DROP COLUMN data_ai_hint';
    END IF;
END $$;

-- EVENTS
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'events' AND column_name = 'image_url'
    ) THEN
        EXECUTE 'ALTER TABLE events RENAME COLUMN image_url TO "imageUrl"';
    END IF;

    -- Drop dataAiHint column if it exists
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'events' AND column_name = 'dataAiHint'
    ) THEN
        EXECUTE 'ALTER TABLE events DROP COLUMN "dataAiHint"';
    END IF;

    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'events' AND column_name = 'data_ai_hint'
    ) THEN
        EXECUTE 'ALTER TABLE events DROP COLUMN data_ai_hint';
    END IF;
END $$;

-- BLOG POSTS
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'blog_posts' AND column_name = 'image_url'
    ) THEN
        EXECUTE 'ALTER TABLE blog_posts RENAME COLUMN image_url TO "imageUrl"';
    END IF;

    -- Drop dataAiHint column if it exists
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'blog_posts' AND column_name = 'dataAiHint'
    ) THEN
        EXECUTE 'ALTER TABLE blog_posts DROP COLUMN "dataAiHint"';
    END IF;

    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'blog_posts' AND column_name = 'data_ai_hint'
    ) THEN
        EXECUTE 'ALTER TABLE blog_posts DROP COLUMN data_ai_hint';
    END IF;
END $$;

-- ACTIVITIES
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'activities' AND column_name = 'entity_name'
    ) THEN
        EXECUTE 'ALTER TABLE activities RENAME COLUMN entity_name TO "entityName"';
    END IF;
END $$;

-- Note: created_at / updated_at kept in snake_case as code does not reference them directly.


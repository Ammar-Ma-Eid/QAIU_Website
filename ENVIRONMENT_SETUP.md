# Environment Variables Setup

## Required Environment Variables

Add the following environment variables to your `.env` file:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Service Role Key (for admin operations that bypass RLS)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_secret_key
```

## Service Role Secret

The service role secret provided should be added as the `SUPABASE_SERVICE_ROLE_KEY` environment variable:

```bash
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrY3BmYW1ocXhtbGhzaGNyeWxtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjAyMTE0MywiZXhwIjoyMDcxNTk3MTQzfQ.PHh7DZLnk2cVbwFAy76OFDMgS2COz_3Ep_u6fwk4w1I
```

## How It Works

1. **Admin User Detection**: When `ammar.ahmed.2024@aiu.edu.eg` logs in, the system detects this as an admin user
2. **Service Role Usage**: All CRUD operations performed by the admin user will use the service role client
3. **RLS Bypass**: The service role client bypasses Row Level Security policies for administrative operations
4. **Regular Users**: Non-admin users continue to use the regular anon key client with RLS enforcement

## Security Notes

- The service role key should be kept secure and not exposed to the client
- Only use the service role for trusted administrative operations
- Regular user operations still respect RLS policies for security

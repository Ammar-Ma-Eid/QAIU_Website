
# QAIU 

A modern admin dashboard for managing QAIU website content with Supabase backend.

## Features

- Secure authentication system
- Member management with role hierarchy (Leader: President/Supervisor, Board members)
- Event management
- Blog post management
- Glossary term management
- Activity logging with real-time tracking
- Responsive design
- Supabase database integration

## Database Setup

### Supabase Setup
1. Create a new project at [https://supabase.com](https://supabase.com)
2. Run the SQL from `supabase-schema.sql` in your Supabase SQL editor
3. Get your project URL and anon key from Settings → API
4. Add them to your environment variables

### Environment Variables
Create a `.env.local` file with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your environment variables (see above)

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Access the admin panel:
   - URL: http://localhost:9002/login
   - Username: adminQAIU_2025
   - Password: QAIU_adminpassword_2025

## Deployment

### Replit Deployment (Recommended)
1. Set up environment variables in Replit Secrets
2. Use the Deploy button to create a new deployment

### Manual Deployment
1. Build the project: `npm run build`
2. Deploy to your preferred platform with the environment variables configured

## Admin Features

- **Member Management**: Add/edit team members with roles (President, Supervisor, Board Member)
- **Role Hierarchy**: Leaders (President/Supervisor) and Board members
- **Event Management**: Create and manage upcoming/past events
- **Blog Management**: Publish and manage blog posts
- **Glossary Management**: Maintain quantum computing terms
- **Activity Logging**: Track all admin actions with timestamps
- **Fast Action Buttons**: Quick actions for common tasks

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Shadcn/ui components
- Supabase (PostgreSQL)

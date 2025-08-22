
# QAIU Admin System - Deployment Guide

This guide will walk you through deploying your QAIU Admin System on Replit with Supabase as the backend database.

## Prerequisites

- Replit account (free or paid)
- Supabase account (free tier available)
- Your project already set up in Replit

## Part 1: Supabase Setup

### 1.1 Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Fill in project details:
   - **Name**: `qaiu-admin-system`
   - **Database Password**: Generate a strong password (save this!)
   - **Region**: Choose closest to your users
6. Click "Create new project"
7. Wait for the project to be created (2-3 minutes)

### 1.2 Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the entire contents of `supabase-schema.sql` from your Replit project
3. Paste it into the SQL Editor
4. Click **Run** to execute the schema
5. Verify tables are created in **Table Editor**

### 1.3 Get Supabase Credentials

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (starts with `https://`)
   - **Project API Key** (anon/public key)

## Part 2: Replit Configuration

### 2.1 Set Environment Variables

1. In your Replit project, open the **Secrets** tool (lock icon in sidebar)
2. Add these environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```
3. Replace the values with your actual Supabase credentials

### 2.2 Test Your Application

1. Click the **Run** button in Replit
2. Your app should start on port 9002
3. Navigate to `/login` and test with:
   - Username: `adminQAIU_2025`
   - Password: `QAIU_adminpassword_2025`
4. Verify database connections work by testing CRUD operations

## Part 3: Deployment on Replit

### 3.1 Static Deployment (Recommended for Frontend)

If you want to deploy as a static site:

1. Open **Deployments** tab in Replit
2. Select **Static** deployment type
3. Configure:
   - **Build Command**: `npm run build`
   - **Public Directory**: `out` or `.next` (depending on your Next.js export config)
4. Click **Deploy**

### 3.2 Reserved VM Deployment (For Full-Stack)

For a full Next.js application with API routes:

1. Open **Deployments** tab in Replit
2. Select **Reserved VM** deployment type
3. Configure:
   - **Build Command**: `npm run build`
   - **Run Command**: `npm start`
4. Set environment variables in deployment settings
5. Click **Deploy**

### 3.3 Autoscale Deployment (For High Traffic)

For applications expecting variable traffic:

1. Open **Deployments** tab in Replit
2. Select **Autoscale** deployment type
3. Configure same as Reserved VM
4. Set scaling parameters based on your needs
5. Click **Deploy**

## Part 4: Post-Deployment Configuration

### 4.1 Update Supabase Settings

1. In Supabase dashboard, go to **Authentication** → **URL Configuration**
2. Add your Replit deployment URL to:
   - **Site URL**: `https://your-deployment-url.replit.app`
   - **Redirect URLs**: `https://your-deployment-url.replit.app/**`

### 4.2 Configure CORS (if needed)

If you encounter CORS issues:

1. In Supabase, go to **Settings** → **API**
2. Add your deployment domain to **CORS origins**

### 4.3 SSL Certificate

Replit automatically provides SSL certificates for all deployments, so your app will be accessible via HTTPS.

## Part 5: Monitoring and Maintenance

### 5.1 Monitor Deployment

1. Use Replit's **Deployments** tab to monitor:
   - Deployment status
   - Build logs
   - Runtime logs
   - Resource usage

### 5.2 Database Monitoring

1. In Supabase dashboard:
   - Monitor **Database** → **Logs**
   - Check **Reports** for usage statistics
   - Set up **Database Webhooks** if needed

### 5.3 Backup Strategy

1. **Supabase**: Automatic backups included in free tier
2. **Code**: Use Replit's Git integration or export to GitHub

## Part 6: Custom Domain (Optional)

### 6.1 Replit Custom Domain

1. In Deployments tab, click on your deployment
2. Go to **Domains** section
3. Add your custom domain
4. Update DNS records as instructed

## Part 7: Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Ensure variables are set in Replit Secrets
   - Restart your deployment
   - Check variable names match exactly

2. **Database Connection Errors**
   - Verify Supabase URL and key
   - Check Supabase project status
   - Ensure schema is properly applied

3. **Build Failures**
   - Check build logs in Deployments tab
   - Ensure all dependencies are in package.json
   - Verify TypeScript compilation

4. **Authentication Issues**
   - Check Supabase Auth settings
   - Verify redirect URLs
   - Test with hardcoded credentials first

### Performance Optimization

1. **Next.js Optimization**
   - Enable static generation where possible
   - Use Next.js Image optimization
   - Implement proper caching headers

2. **Supabase Optimization**
   - Use proper indexes (already in schema)
   - Implement row-level security
   - Monitor query performance

## Part 8: Cost Considerations

### Replit Pricing
- **Free**: Limited to public repls, basic deployment features
- **Core ($7/month)**: Private repls, faster deployments, more storage
- **Teams**: Advanced collaboration features

### Supabase Pricing
- **Free Tier**: 2 projects, 500MB database, 50MB file storage
- **Pro ($25/month)**: Unlimited projects, 8GB database, 100GB storage
- **Team**: Advanced features and support

## Security Checklist

- [ ] Environment variables are stored securely in Replit Secrets
- [ ] Supabase RLS policies are enabled
- [ ] Strong passwords used for admin accounts
- [ ] HTTPS enforced (automatic with Replit)
- [ ] Regular security updates applied
- [ ] Database backups verified

## Getting Help

- **Replit Support**: [https://support.replit.com](https://support.replit.com)
- **Supabase Docs**: [https://supabase.com/docs](https://supabase.com/docs)
- **Community**: Replit Discord, Supabase Discord

---

*Last updated: January 2025*
*This guide is specific to the QAIU Admin System deployment workflow.*

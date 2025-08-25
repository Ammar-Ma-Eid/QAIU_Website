# Service Role Implementation Guide

## Overview

This document describes the service role implementation for the QAIU website, which allows admin users to bypass Row Level Security (RLS) policies for administrative operations.

## Key Components

### 1. Service Role Client Configuration

**File**: `src/lib/supabase.ts`

The service role client is configured alongside the regular Supabase client:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey)
```

### 2. Admin Context Management

**File**: `src/lib/admin-context.ts`

Provides functions to detect admin users and manage admin sessions:

```typescript
const ADMIN_USER_EMAIL = 'ammar.ahmed.2024@aiu.edu.eg';

export function isAdminUser(email: string): boolean {
    return email === ADMIN_USER_EMAIL;
}

export function setAdminSession(isAdmin: boolean): void {
    // Implementation for server-side admin session management
}

export function getAdminSession(): boolean {
    // Implementation for server-side admin session retrieval
}
```

### 3. Enhanced Auth Check Endpoint

**File**: `src/app/api/auth/check/route.ts`

Supports both Authorization header tokens and cookie-based sessions:

```typescript
// Check for Authorization header first
const authHeader = request.headers.get('Authorization');
if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const { data: { user }, error } = await supabase.auth.getUser(token);
    // ... admin detection logic
}
```

### 4. Service Role Usage in Data Operations

**File**: `src/lib/data.ts`

Database operations use the appropriate client based on admin context:

```typescript
// Example operation that could use service role for admin users
export async function addMember(member: Omit<Member, 'id'>): Promise<Member | null> {
    const client = shouldUseServiceRole() ? supabaseAdmin : supabase;
    const { data, error } = await client
        .from('members')
        .insert([member])
        .select()
        .single();
    // ... rest of implementation
}
```

## Environment Variables

Required environment variables in `.env` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Testing

### Service Role Test

```bash
node test-service-role.js
```

Tests service role client connection and RLS bypass capabilities.

### Admin Context Test

```bash
node test-admin-context.js
```

Tests admin detection logic and service role switching.

### Auth Endpoint Test

```bash
node test-auth-endpoint-admin.js
```

Tests the auth check endpoint with admin user.

### Complete Flow Test

```bash
node test-complete-flow.js
```

Tests the complete end-to-end service role flow.

## Security Considerations

1. **Service Role Key Protection**: The service role key should be kept secure and never exposed to the client-side
2. **Admin Detection**: Admin status is determined by email address comparison
3. **RLS Policies**: Regular users are still subject to RLS policies
4. **Session Management**: Admin sessions are managed server-side

## Usage Examples

### 1. Server-side Admin Operations

```typescript
import { supabaseAdmin } from '@/lib/supabase';

// Bypass RLS for admin operations
const { data, error } = await supabaseAdmin
    .from('members')
    .insert([newMember]);
```

### 2. Admin Detection in API Routes

```typescript
import { isAdminUser } from '@/lib/admin-context';

export async function POST(request: NextRequest) {
    const { email } = await request.json();
    const isAdmin = isAdminUser(email);
    // Use service role if admin
}
```

## Troubleshooting

### Common Issues

1. **401 Unauthorized**: Check if service role key is correctly set in environment variables
2. **RLS Violation**: Ensure service role client is being used for admin operations
3. **Admin Detection Failure**: Verify admin email address in admin-context.ts

### Debugging

Enable debug logging in Supabase client:

```typescript
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
        persistSession: false,
        autoRefreshToken: false,
    },
    global: {
        headers: {
            'x-debug': 'true',
        },
    },
});
```

## Best Practices

1. Use service role only for server-side operations
2. Limit service role usage to administrative functions
3. Regularly rotate service role keys
4. Monitor service role usage in Supabase dashboard
5. Implement proper error handling for service role operations

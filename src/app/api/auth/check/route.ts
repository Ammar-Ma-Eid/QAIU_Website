import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { setAdminSession, isAdminUser } from '@/lib/admin-context';

export async function GET(request: NextRequest) {
  try {
    // Check for Authorization header first
    const authHeader = request.headers.get('Authorization');
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      
      // Verify the token using Supabase
      const { data: { user }, error } = await supabase.auth.getUser(token);
      
      if (!error && user) {
        // Check if this is the admin user
        const isAdmin = isAdminUser(user.email!);
        setAdminSession(isAdmin);
        
        return NextResponse.json({ 
          authenticated: true, 
          user: user,
          isAdmin: isAdmin
        });
      }
    }

    // Check if user is authenticated via Supabase session (cookie-based)
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Supabase auth error:', error);
      return NextResponse.json({ authenticated: false, error: error.message }, { status: 401 });
    }

    if (session) {
      // Check if this is the admin user
      const isAdmin = isAdminUser(session.user.email!);
      setAdminSession(isAdmin);
      
      return NextResponse.json({ 
        authenticated: true, 
        user: session.user,
        isAdmin: isAdmin
      });
    }

    // If no Supabase session exists
    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ authenticated: false, error: 'Internal server error' }, { status: 500 });
  }
}

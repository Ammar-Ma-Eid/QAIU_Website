// Admin context management for service role operations

const ADMIN_USER_EMAILS = [
    'ammar.ahmed.2024@aiu.edu.eg',
    'ammar.ahmed.2025@aiu.edu.eg'
];

// Store admin session state (in-memory for server-side operations)
let isAdminSession = false;

export function setAdminSession(isAdmin: boolean) {
  isAdminSession = isAdmin;
}

export function getAdminSession(): boolean {
  return isAdminSession;
}

export function isAdminUser(email: string): boolean {
  return ADMIN_USER_EMAILS.includes(email);
}

export function shouldUseServiceRole(email?: string): boolean {
  // Use service role if we have an admin session or if the email matches admin user
  return isAdminSession || (email ? isAdminUser(email) : false);
}

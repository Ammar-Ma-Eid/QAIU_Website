import { redirect } from 'next/navigation';

export default async function AdminPage() {
    // Redirect to dashboard
    redirect('/admin/dashboard');
}

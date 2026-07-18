import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/ai/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminEngineLayout({ children }: { children: React.ReactNode }) {
  const isAuth = await getAdminSession();
  if (!isAuth) {
    redirect('/admin/ai-engine/login');
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

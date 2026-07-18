'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Search,
  BookOpen,
  Bot,
  Settings,
  LogOut,
  Zap,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/admin/ai-content', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/ai-content/articles', label: 'Artigos', icon: FileText },
  { href: '/admin/ai-content/sources', label: 'Fontes', icon: Search },
  { href: '/admin/ai-content/knowledge', label: 'Conhecimento', icon: BookOpen },
  { href: '/admin/ai-content/agents', label: 'Agentes', icon: Bot },
  { href: '/admin/ai-content/settings', label: 'Configurações', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  async function handleLogout() {
    await fetch('/api/admin/ai-content/auth', { method: 'DELETE' });
    window.location.href = '/admin/ai-content/login';
  }

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-brand-accent" />
          <div>
            <h1 className="font-bold text-lg">ZYVO AI Engine</h1>
            <p className="text-xs text-gray-400">Content Platform</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? 'bg-brand-primary text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white w-full transition-colors"
          type="button"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </aside>
  );
}

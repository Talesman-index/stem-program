'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logout, getAdminUser, AdminUser } from '../actions/authActions';
import { StemLogo } from '../../components/StemLogo';
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  FolderKanban,
  CalendarCheck,
  Truck,
  HeartPulse,
  Award,
  BarChart3,
  Handshake,
  Settings,
  LogOut,
  User,
  Menu,
  X
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const u = await getAdminUser();
      if (u) {
        setAdmin(u);
      }
    }
    loadUser();
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  const menuItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Participants', href: '/admin/participants', icon: Users },
    { label: 'Registrations', href: '/admin/registrations', icon: ClipboardList },
    { label: 'Groups', href: '/admin/groups', icon: FolderKanban },
    { label: 'Attendance', href: '/admin/attendance', icon: CalendarCheck },
    { label: 'Arrival & Pickup', href: '/admin/pickup', icon: Truck },
    { label: 'Health & Safety', href: '/admin/health', icon: HeartPulse },
    { label: 'Certificates', href: '/admin/certificates', icon: Award },
    { label: 'Reports & Stats', href: '/admin/reports', icon: BarChart3 },
    { label: 'Partnerships', href: '/admin/partners', icon: Handshake },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-body">
      
      {/* Mobile Header Bar */}
      <header className="bg-dark text-white p-4 flex items-center justify-between md:hidden border-b border-white/10 relative z-30">
        <Link href="/admin" className="flex items-center gap-2.5">
          <StemLogo size="sm" variant="white" />
          <span className="font-display font-bold text-xs tracking-wider uppercase bg-white/10 px-2 py-0.5 rounded text-white/90">ADMIN</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white hover:text-stem-green focus:outline-none"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Left Sidebar Fixed (Desktop) & Drawer (Mobile) */}
      <aside
        className={`fixed md:sticky top-0 bottom-0 left-0 z-20 w-64 bg-dark text-white flex flex-col justify-between border-r border-white/5 transition-transform duration-300 transform md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } md:h-screen`}
      >
        <div>
          {/* Logo Brand */}
          <div className="p-6 border-b border-white/5 flex items-center gap-3.5">
            <StemLogo size="sm" variant="white" />
            <div className="flex flex-col text-left border-l border-white/10 pl-3">
              <span className="font-mono text-white/60 text-[9px] font-bold tracking-widest leading-none">ADMIN</span>
              <span className="font-mono text-white/40 text-[8px] tracking-widest leading-none mt-1">PORTAL</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[70vh] no-scrollbar">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 font-body text-sm px-4 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? 'bg-stem-blue-mid text-white font-semibold shadow-inner'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-white/60'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info card & logout */}
        <div className="p-4 border-t border-white/5 bg-black/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-stem-green/15 text-stem-green flex items-center justify-center border border-stem-green/20">
              <User className="w-4 h-4" />
            </div>
            <div className="flex flex-col text-left max-w-[140px]">
              <span className="text-xs font-semibold text-white truncate">{admin?.name || 'Dr. Smith'}</span>
              <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest truncate">{admin?.role || 'super_admin'}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 text-white/80 hover:text-red-400 font-body text-xs font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-10 bg-black/50 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Main Content Pane */}
      <div className="flex-grow flex flex-col min-w-0 md:h-screen md:overflow-y-auto">
        <main className="flex-grow p-6 sm:p-10">
          {children}
        </main>
      </div>

    </div>
  );
}

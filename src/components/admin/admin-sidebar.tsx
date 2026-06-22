"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UsersRound,
  CalendarDays,
  ClipboardCheck,
  GraduationCap,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/site/logo";
import { currentUser, getInitials } from "@/lib/data";
import { cn } from "@/lib/utils";

export const adminNav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/talabalar", label: "Talabalar", icon: Users },
  { href: "/admin/guruhlar", label: "Guruhlar", icon: UsersRound },
  { href: "/admin/jadval", label: "Jadval", icon: CalendarDays },
  { href: "/admin/davomat", label: "Davomat", icon: ClipboardCheck },
  { href: "/admin/oqituvchilar", label: "O'qituvchilar", icon: GraduationCap },
];

export function AdminNavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <nav className="flex flex-1 flex-col gap-0.5 px-3 py-4">
      <p className="mb-2 px-3 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
        Asosiy
      </p>
      {adminNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            isActive(item.href)
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <item.icon className="size-4" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function AdminUserCard() {
  return (
    <div className="flex items-center gap-3 border-t p-4">
      <Avatar className="size-9">
        <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
        <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{currentUser.name}</p>
        <p className="truncate text-xs text-muted-foreground">{currentUser.role}</p>
      </div>
      <Link
        href="/login"
        aria-label="Chiqish"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        <LogOut className="size-4" />
      </Link>
    </div>
  );
}

export function AdminSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r bg-background lg:flex">
      <div className="flex h-16 items-center border-b px-5">
        <Logo href="/admin" />
      </div>
      <AdminNavLinks />
      <AdminUserCard />
    </aside>
  );
}

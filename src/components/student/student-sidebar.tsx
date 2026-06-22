"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Award,
  BarChart3,
  BookOpen,
  Grid2x2,
  Home,
  LogOut,
  Settings,
  UserRound,
  Wallet,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";

function LogoutDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Tizimdan chiqasizmi?</h2>
          <button onClick={onClose} className="rounded-md p-1 text-slate-400 hover:text-slate-600">
            <X className="size-5" />
          </button>
        </div>
        <p className="mt-3 text-sm text-slate-500">
          {"Hisobingizdan chiqmoqchimisiz? Davom etish uchun qaytadan login va parolingiz bilan tizimga kirishingiz kerak bo'ladi."}
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <Button variant="outline" size="sm" onClick={onClose}>
            Bekor qilish
          </Button>
          <Button
            size="sm"
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={() => router.push("/login")}
          >
            Ha, chiqish
          </Button>
        </div>
      </div>
    </div>
  );
}

const mainNav = [
  { href: "/student", label: "Dashboard", icon: Home },
  { href: "/student/kurslarim", label: "Mening kurslarim", icon: BookOpen },
  { href: "/student/katalog", label: "Kurslar katalogi", icon: Grid2x2 },
  { href: "/student/natijalarim", label: "Natijalarim", icon: BarChart3 },
  { href: "/student/sertifikatlarim", label: "Sertifikatlarim", icon: Award },
];

const accountNav = [
  { href: "/student/profil", label: "Profil", icon: UserRound },
  { href: "/student/tolovlar", label: "To'lovlar", icon: Wallet },
  { href: "/student/sozlamalar", label: "Sozlamalar", icon: Settings },
];

export const studentNav = [...mainNav, ...accountNav];

export function StudentNavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname() ?? "";

  const isActive = (href: string) =>
    href === "/student" ? pathname === "/student" : pathname.startsWith(href);

  return (
    <nav className="flex flex-1 flex-col gap-0.5 px-3 py-4">
      <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {"Online ta'lim"}
      </p>
      {mainNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            isActive(item.href)
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          <item.icon className="size-4" />
          {item.label}
        </Link>
      ))}

      <p className="mb-2 mt-6 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        Hisob
      </p>
      {accountNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            isActive(item.href)
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          <item.icon className="size-4" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function StudentUserCard({ name = "Talaba", role = "Online talaba" }: { name?: string; role?: string }) {
  const [showLogout, setShowLogout] = useState(false);

  return (
    <>
      <div className="flex items-center gap-3 border-t p-4">
        <Avatar className="size-9">
          <AvatarFallback className="bg-emerald-100 text-xs font-semibold text-emerald-700">
            {name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{name}</p>
          <p className="truncate text-xs text-muted-foreground">{role}</p>
        </div>
        <button
          onClick={() => setShowLogout(true)}
          aria-label="Chiqish"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <LogOut className="size-4" />
        </button>
      </div>
      <LogoutDialog open={showLogout} onClose={() => setShowLogout(false)} />
    </>
  );
}

export function StudentSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r bg-background lg:flex">
      <div className="flex h-16 items-center border-b px-5">
        <Logo href="/student" />
      </div>
      <StudentNavLinks />
      <StudentUserCard />
    </aside>
  );
}

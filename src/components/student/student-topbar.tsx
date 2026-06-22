"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Bell, Menu, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Logo } from "@/components/site/logo";
import { StudentNavLinks, StudentUserCard, studentNav } from "./student-sidebar";

function usePageTitle(): string {
  const pathname = usePathname();
  const match = [...studentNav]
    .sort((a, b) => b.href.length - a.href.length)
    .find((item) =>
      item.href === "/student" ? pathname === "/student" : pathname.startsWith(item.href),
    );
  return match?.label ?? "Dashboard";
}

export function StudentTopbar({ studentName = "Talaba" }: { studentName?: string }) {
  const [open, setOpen] = useState(false);
  const title = usePageTitle();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        aria-label="Menyu"
        onClick={() => setOpen(true)}
      >
        <Menu className="size-5" />
      </Button>

      <h1 className="truncate text-sm font-semibold sm:text-base">{title}</h1>

      <div className="ml-auto flex items-center gap-3">
        <div className="relative hidden w-56 md:block">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Qidirish..." className="rounded-full pl-9" />
        </div>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-5" />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500" />
        </Button>

        <div className="flex items-center gap-2.5">
          <Avatar className="size-9">
            <AvatarFallback className="bg-blue-100 text-xs font-semibold text-blue-700">
              {studentName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold leading-tight">{studentName}</p>
            <p className="text-xs leading-tight text-muted-foreground">Talaba</p>
          </div>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetHeader className="border-b">
            <SheetTitle>
              <Logo href="/student" />
            </SheetTitle>
            <SheetDescription className="sr-only">Talaba navigatsiyasi</SheetDescription>
          </SheetHeader>
          <StudentNavLinks onNavigate={() => setOpen(false)} />
          <StudentUserCard name={studentName} />
        </SheetContent>
      </Sheet>
    </header>
  );
}

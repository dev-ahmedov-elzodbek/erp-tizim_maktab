"use client";

import { useState } from "react";
import {
  Bell,
  ChevronDown,
  Globe,
  Lock,
  Monitor,
  Smartphone,
  Upload,
  User,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "profil", label: "Profil", icon: User },
  { id: "bildirishnomalar", label: "Bildirishnomalar", icon: Bell },
  { id: "xavfsizlik", label: "Xavfsizlik", icon: Lock },
  { id: "til", label: "Til va mintaqa", icon: Globe },
];

const notifications = [
  { id: "dars", label: "Dars eslatmasi", desc: "Dars boshlanishidan 1 soat oldin eslatma", default: true },
  { id: "baho", label: "Yangi baho qo'yilganda", desc: "Imtihon yoki vazifa baholanganda xabar", default: true },
  { id: "tolov", label: "To'lov eslatmasi", desc: "To'lov muddatidan 3 kun oldin eslatma", default: true },
  { id: "imtihon", label: "Imtihon e'lonlari", desc: "Yangi imtihon belgilanganda xabar", default: true },
  { id: "yangilik", label: "Markaz yangiliklari", desc: "Tadbirlar va yangi kurslar haqida", default: false },
];

const sessions = [
  { device: "Redmi Note 13 · Chrome", location: "Toshkent · Bugun 08:45", current: true, icon: Smartphone },
  { device: "Acer Aspire · Firefox", location: "Toshkent · Kecha 19:12", current: false, icon: Monitor },
];

function Toggle({ defaultChecked = false }: { defaultChecked?: boolean }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn(!on)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
        on ? "bg-blue-600" : "bg-slate-200"
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block size-5 rounded-full bg-white shadow-sm ring-0 transition-transform",
          on ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
}

export default function SozlamalarPage() {
  const [activeTab, setActiveTab] = useState("profil");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Sozlamalar</h1>
        <p className="mt-1 text-sm text-slate-500">
          Hisobingiz, bildirishnomalar va xavfsizlik sozlamalari.
        </p>
      </div>

      <div className="flex gap-6">
        {/* Left tabs */}
        <nav className="hidden w-40 shrink-0 flex-col gap-1 md:flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-left",
                activeTab === tab.id
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              )}
            >
              <tab.icon className="size-4" />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="min-w-0 flex-1 space-y-6">
          {/* Profil section */}
          {activeTab === "profil" && (
            <>
              {/* Avatar */}
              <Card className="rounded-xl border-slate-200 shadow-xs">
                <CardContent className="p-6">
                  <h2 className="text-base font-bold text-slate-900">Profil rasmi</h2>
                  <p className="mt-0.5 text-sm text-slate-500">
                    {"Mentorlar va boshqa o'quvchilar sizni shunday ko'radi"}
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <Avatar className="size-16">
                      <AvatarImage src="https://i.pravatar.cc/150?img=11" />
                      <AvatarFallback>BT</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs text-slate-500">JPG yoki PNG · Max 2 MB</p>
                      <div className="mt-2 flex gap-2">
                        <Button variant="outline" size="sm">
                          <Upload className="mr-1.5 size-3.5" />
                          {"Rasmni o'zgartirish"}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-500">
                          {"O'chirish"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal info */}
              <Card className="rounded-xl border-slate-200 shadow-xs">
                <CardContent className="p-6">
                  <h2 className="text-base font-bold text-slate-900">{"Shaxsiy ma'lumotlar"}</h2>
                  <p className="mt-0.5 text-sm text-slate-500">
                    {"Telefon raqamingiz o'zgargan bo'lsa, yangilab qo'ying"}
                  </p>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label className="text-sm font-medium text-slate-700">Ism</Label>
                      <Input className="mt-1.5" defaultValue="Bobur" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-700">Familiya</Label>
                      <Input className="mt-1.5" defaultValue="Tojiev" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-700">Email</Label>
                      <Input className="mt-1.5" defaultValue="bobur@example.uz" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-700">Telefon</Label>
                      <Input className="mt-1.5" defaultValue="+998 90 123 45 67" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label className="text-sm font-medium text-slate-700">Manzil</Label>
                    <Input className="mt-1.5" defaultValue="Toshkent sh., Chilonzor tumani, 19-mavze" />
                  </div>
                  <div className="mt-4">
                    <Label className="text-sm font-medium text-slate-700">Talaba ID</Label>
                    <Input className="mt-1.5" defaultValue="ST-0123" disabled />
                    <p className="mt-1 text-xs text-slate-400">
                      {"Talaba ID tizim tomonidan beriladi va o'zgartirilmaydi."}
                    </p>
                  </div>
                  <div className="mt-5 flex justify-end">
                    <Button size="sm">Saqlash</Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Bildirishnomalar */}
          {activeTab === "bildirishnomalar" && (
            <Card className="rounded-xl border-slate-200 shadow-xs">
              <CardContent className="p-6">
                <h2 className="text-base font-bold text-slate-900">Bildirishnoma sozlamalari</h2>
                <p className="mt-0.5 text-sm text-slate-500">
                  {"Qaysi voqealar haqida xabardor bo'lasiz"}
                </p>
                <div className="mt-5 divide-y divide-slate-100">
                  {notifications.map((n) => (
                    <div key={n.id} className="flex items-center justify-between py-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{n.label}</p>
                        <p className="mt-0.5 text-sm text-slate-500">{n.desc}</p>
                      </div>
                      <Toggle defaultChecked={n.default} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Xavfsizlik */}
          {activeTab === "xavfsizlik" && (
            <>
              <Card className="rounded-xl border-slate-200 shadow-xs">
                <CardContent className="p-6">
                  <h2 className="text-base font-bold text-slate-900">{"Parolni o'zgartirish"}</h2>
                  <p className="mt-0.5 text-sm text-slate-500">
                    Hisobingizni himoyalash uchun kuchli parol tanlang
                  </p>
                  <div className="mt-5 space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-slate-700">Joriy parol</Label>
                      <Input className="mt-1.5" type="password" defaultValue="12345678" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label className="text-sm font-medium text-slate-700">Yangi parol</Label>
                        <Input className="mt-1.5" type="password" placeholder="Kamida 8 ta belgi" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-slate-700">Tasdiqlash</Label>
                        <Input className="mt-1.5" type="password" placeholder="Yangi parol qaytadan" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex justify-end">
                    <Button size="sm">Parolni yangilash</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-xl border-slate-200 shadow-xs">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-bold text-slate-900">Aktiv sessiyalar</h2>
                      <p className="mt-0.5 text-sm text-slate-500">Hisobingizga ulangan qurilmalar</p>
                    </div>
                    <Button variant="destructive" size="sm">Hammasidan chiqish</Button>
                  </div>
                  <div className="mt-5 divide-y divide-slate-100">
                    {sessions.map((s, i) => (
                      <div key={i} className="flex items-center gap-3 py-3.5">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                          <s.icon className="size-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-900">
                            {s.device}
                            {s.current && (
                              <Badge className="ml-2 bg-blue-50 text-blue-700 shadow-none hover:bg-blue-50">
                                Joriy
                              </Badge>
                            )}
                          </p>
                          <p className="text-xs text-slate-500">{s.location}</p>
                        </div>
                        {!s.current && (
                          <button className="text-sm font-medium text-slate-500 hover:text-slate-700">
                            Chiqish
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Til va mintaqa */}
          {activeTab === "til" && (
            <Card className="rounded-xl border-slate-200 shadow-xs">
              <CardContent className="p-6">
                <h2 className="text-base font-bold text-slate-900">Til va mintaqa</h2>
                <p className="mt-0.5 text-sm text-slate-500">Interfeys tili va vaqt mintaqasi</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label className="text-sm font-medium text-slate-700">Interfeys tili</Label>
                    <div className="relative mt-1.5">
                      <select className="flex h-9 w-full appearance-none rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                        <option>O&apos;zbek</option>
                        <option>Русский</option>
                        <option>English</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-700">Vaqt mintaqasi</Label>
                    <div className="relative mt-1.5">
                      <select className="flex h-9 w-full appearance-none rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                        <option>Toshkent (UTC+5)</option>
                        <option>Moskva (UTC+3)</option>
                        <option>London (UTC+0)</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{"Qorong'u rejim"}</p>
                    <p className="mt-0.5 text-sm text-slate-500">{"Interfeysni qorong'u temada ko'rsatish"}</p>
                  </div>
                  <Toggle defaultChecked={false} />
                </div>
                <div className="mt-5 flex justify-end">
                  <Button size="sm">Saqlash</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
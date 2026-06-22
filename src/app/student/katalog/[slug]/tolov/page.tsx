"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const paymentMethods = [
  { id: "payme", label: "Payme", desc: "Payme ilovasi orqali tez to'lov", badge: "Payme" },
  { id: "click", label: "Click", desc: "Click orqali to'lov", badge: "Click" },
  { id: "karta", label: "Plastik karta", desc: "UzCard / Humo / Visa", badge: "Karta" },
];

const orderSummary = {
  courseName: "JavaScript dasturlash",
  teacher: "Akmal Karimov",
  image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&q=80",
  originalPrice: 690000,
  discount: 200000,
  total: 490000,
};

function formatMoney(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

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
      <span className={cn("pointer-events-none inline-block size-5 rounded-full bg-white shadow-sm ring-0 transition-transform", on ? "translate-x-5" : "translate-x-0")} />
    </button>
  );
}

export default function TolovPage() {
  const [selectedMethod, setSelectedMethod] = useState("payme");

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/student/katalog" className="hover:text-slate-700">Katalog</Link>
        <span>&nbsp;&nbsp;</span>
        <Link href="/student/katalog/1" className="hover:text-slate-700">{orderSummary.courseName}</Link>
        <span>&nbsp;&nbsp;</span>
        <span className="font-semibold text-slate-900">To&apos;lov</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* Left - Payment form */}
        <div className="space-y-6">
          {/* Payment method selection */}
          <Card className="rounded-xl border-slate-200 shadow-xs">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-slate-900">To&apos;lov usulini tanlang</h2>
              <div className="mt-5 space-y-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={cn(
                      "flex w-full items-center gap-4 rounded-xl border-2 px-5 py-4 text-left transition-colors",
                      selectedMethod === method.id
                        ? "border-blue-500 bg-blue-50/50"
                        : "border-slate-200 hover:border-slate-300"
                    )}
                  >
                    <div className={cn(
                      "flex size-5 items-center justify-center rounded-full border-2",
                      selectedMethod === method.id ? "border-blue-500" : "border-slate-300"
                    )}>
                      {selectedMethod === method.id && (
                        <div className="size-2.5 rounded-full bg-blue-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={cn("text-sm font-semibold", selectedMethod === method.id ? "text-blue-700" : "text-slate-900")}>{method.label}</p>
                      <p className="mt-0.5 text-xs text-slate-500">{method.desc}</p>
                    </div>
                    <Badge variant="outline" className="rounded-md border-slate-200 text-slate-600">
                      {method.badge}
                    </Badge>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Card details */}
          <Card className="rounded-xl border-slate-200 shadow-xs">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-slate-900">Karta ma&apos;lumotlari</h2>
              <div className="mt-5 space-y-4">
                <div>
                  <Label className="text-sm font-medium text-slate-700">Karta raqami</Label>
                  <Input className="mt-1.5" placeholder="8600 0000 0000 0000" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label className="text-sm font-medium text-slate-700">Amal qilish muddati</Label>
                    <Input className="mt-1.5" placeholder="OO/YY" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-700">SMS kod / CVV</Label>
                    <Input className="mt-1.5" type="password" placeholder="&bull;&bull;&bull;" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Toggle />
                  <span className="text-sm text-slate-600">Kartani keyingi to&apos;lovlar uchun saqlash</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right - Order summary */}
        <div>
          <Card className="sticky top-20 rounded-xl border-slate-200 shadow-xs">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-slate-900">Buyurtma xulosasi</h2>
              <div className="mt-5 flex items-center gap-3">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-lg">
                  <Image src={orderSummary.image} alt={orderSummary.courseName} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{orderSummary.courseName}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{orderSummary.teacher}</p>
                </div>
              </div>

              <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Kurs narxi</span>
                  <span className="text-slate-900">{formatMoney(orderSummary.originalPrice)} so&apos;m</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Chegirma</span>
                  <span className="font-medium text-emerald-600">&minus;{formatMoney(orderSummary.discount)} so&apos;m</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-base font-bold text-slate-900">Jami</span>
                <span className="text-lg font-bold text-slate-900">{formatMoney(orderSummary.total)} so&apos;m</span>
              </div>

              <Button className="mt-5 w-full" size="lg">
                To&apos;lovni tasdiqlash
              </Button>

              <p className="mt-3 flex items-center gap-1.5 text-center text-xs text-slate-400">
                <Lock className="size-3.5" />
                To&apos;lov xavfsiz himoyalangan. Umrbod kirish.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
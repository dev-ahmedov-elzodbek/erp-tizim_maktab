"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Check, Circle, Play, Star, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const course = {
  name: "JavaScript dasturlash",
  category: "Frontend",
  categoryColor: "border-blue-500 text-blue-600",
  rating: 4.9,
  reviews: 312,
  students: 540,
  lessons: 28,
  duration: "40 soat",
  language: "O'zbek tilida",
  teacher: "Akmal Karimov",
  teacherRole: "JavaScript Lead",
  teacherAvatar: "https://i.pravatar.cc/150?img=12",
  image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
  price: 490000,
  oldPrice: 690000,
  description: "JavaScript — zamonaviy web ilovalarning asosi. Bu kurs noldan boshlab to'liq frontend dasturchisigacha olib boradi. Har bir mavzu amaliy mashqlar va real loyihalar bilan mustahkamlanadi.",
  outcomes: [
    "JavaScript asoslari va sintaksisi",
    "ES6+: arrow, destructuring, spread",
    "DOM va sahifa bilan ishlash",
    "Asinxronlik va Promise",
    "Fetch API va REST",
    "Git va GitHub bilan ishlash",
  ],
  features: [
    "28 ta video dars",
    "5 ta amaliy loyiha",
    "Umrbod kirish",
    "Tugatgach sertifikat",
    "Mentor bilan aloqa",
  ],
};

function formatMoney(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [activeTab, setActiveTab] = useState("tavsif");

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/student/katalog" className="hover:text-slate-700">Katalog</Link>
        <span>&nbsp;&nbsp;</span>
        <span className="font-semibold text-slate-900">{course.name}</span>
      </nav>

      {/* Course header */}
      <Card className="rounded-xl border-slate-200 shadow-xs">
        <CardContent className="flex flex-col gap-6 p-6 sm:flex-row">
          <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl sm:h-auto sm:w-64">
            <Image src={course.image} alt={course.name} fill className="object-cover" />
          </div>
          <div className="flex-1">
            <Badge variant="outline" className={`rounded-md ${course.categoryColor}`}>
              {course.category}
            </Badge>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">{course.name}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-slate-900">{course.rating}</span>
                <span>({course.reviews} sharh)</span>
              </span>
              <span className="flex items-center gap-1">
                <Users className="size-4" />{course.students} talaba
              </span>
              <span className="flex items-center gap-1">
                <Play className="size-4" />{course.lessons} dars &middot; {course.duration}
              </span>
              <span className="flex items-center gap-1">
                <Circle className="size-4" />{course.language}
              </span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarImage src={course.teacherAvatar} />
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
              <span className="text-sm font-semibold text-slate-900">
                {course.teacher} &mdash; {course.teacherRole}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Left - Tabs */}
        <div>
          <div className="border-b border-slate-200">
            <div className="flex gap-6">
              {[
                { id: "tavsif", label: "Tavsif" },
                { id: "dastur", label: "Dastur" },
                { id: "oqituvchi", label: "O'qituvchi" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "border-b-2 pb-3 text-sm font-medium transition-colors",
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "tavsif" && (
            <Card className="mt-6 rounded-xl border-slate-200 shadow-xs">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-slate-900">Kurs haqida</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{course.description}</p>

                <h3 className="mt-6 text-lg font-bold text-slate-900">Nimalarni o&apos;rganasiz?</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {course.outcomes.map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <Check className="size-5 shrink-0 text-emerald-500" />
                      <span className="text-sm text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "dastur" && (
            <Card className="mt-6 rounded-xl border-slate-200 shadow-xs">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-slate-900">Kurs dasturi</h2>
                <p className="mt-2 text-sm text-slate-500">
                  {course.lessons} ta dars &middot; {course.duration}
                </p>
                <div className="mt-4 space-y-2">
                  {["Kirish va sozlash", "O'zgaruvchilar va turlar", "Funksiyalar", "Massivlar va obyektlar", "DOM bilan ishlash", "Hodisalar (Events)", "Asinxron JavaScript", "API bilan ishlash"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg border border-slate-100 px-4 py-3">
                      <span className="flex size-7 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">{i + 1}</span>
                      <span className="text-sm font-medium text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "oqituvchi" && (
            <Card className="mt-6 rounded-xl border-slate-200 shadow-xs">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="size-16">
                    <AvatarImage src={course.teacherAvatar} />
                    <AvatarFallback>AK</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{course.teacher}</h2>
                    <p className="text-sm text-slate-500">{course.teacherRole} &middot; 8 yillik tajriba</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  {"Frontend yo'nalishida 8 yillik amaliy tajriba. EPAM va Uzcard kompaniyalarida ishlagan. 540+ talabaga dars bergan, o'rtacha reytingi 4.9."}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right - Price card */}
        <div>
          <Card className="sticky top-20 rounded-xl border-slate-200 shadow-xs">
            <CardContent className="p-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-slate-900">{formatMoney(course.price)}</span>
                <span className="text-lg text-slate-400 line-through">{formatMoney(course.oldPrice)}</span>
              </div>
              <p className="text-lg font-bold text-slate-900">so&apos;m</p>

              <div className="mt-5 space-y-3">
                {course.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <Check className="size-5 shrink-0 text-emerald-500" />
                    <span className="text-sm text-slate-700">{f}</span>
                  </div>
                ))}
              </div>

              <Button asChild className="mt-6 w-full" size="lg">
                <Link href={`/student/katalog/${slug}/tolov`}>Sotib olish</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
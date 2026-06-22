"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Award,
  CheckSquare,
  Play,
  Search,
  Flame,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiFetch } from "@/lib/api";

const activeCourses = [
  {
    id: "1",
    name: "React.js — zamonaviy frontend",
    teacher: "Akmal Karimov",
    teacherAvatar: "https://i.pravatar.cc/150?img=12",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
    category: "Frontend",
    categoryColor: "bg-blue-500",
    totalLessons: 32,
    completedLessons: 14,
    progress: 62,
  },
  {
    id: "2",
    name: "Python asoslari",
    teacher: "Dilnoza Yusupova",
    teacherAvatar: "https://i.pravatar.cc/150?img=45",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&q=80",
    category: "Dasturlash",
    categoryColor: "bg-red-500",
    totalLessons: 24,
    completedLessons: 8,
    progress: 33,
  },
  {
    id: "3",
    name: "UX/UI dizayn asoslari",
    teacher: "Sardor Aliyev",
    teacherAvatar: "https://i.pravatar.cc/150?img=53",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
    category: "Dizayn",
    categoryColor: "bg-emerald-500",
    totalLessons: 20,
    completedLessons: 19,
    progress: 95,
  },
  {
    id: "4",
    name: "SMM va raqamli marketing",
    teacher: "Madina Rashidova",
    teacherAvatar: "https://i.pravatar.cc/150?img=47",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80",
    category: "Marketing",
    categoryColor: "bg-violet-500",
    totalLessons: 18,
    completedLessons: 3,
    progress: 17,
  },
];

const recommendedCourses = [
  { name: "TypeScript chuqur", lessons: 32, hours: 18, category: "Frontend", categoryColor: "bg-blue-500", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80" },
  { name: "Node.js va Express", lessons: 40, hours: 24, category: "Backend", categoryColor: "bg-emerald-500", image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&q=80" },
  { name: "Figma bilan prototiplash", lessons: 26, hours: 14, category: "Dizayn", categoryColor: "bg-violet-500", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80" },
  { name: "SQL va ma'lumotlar bazasi", lessons: 22, hours: 12, category: "Data", categoryColor: "bg-slate-700", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80" },
];

const weekDays = ["Du", "Se", "Cho", "Pa", "Ju", "Sh", "Ya"];
const streakDays = [true, true, true, true, true, false, false];

const currentCourse = activeCourses[0];

function ProgressBar({ value, className = "" }: { value: number; className?: string }) {
  const barColor = value >= 90 ? "bg-emerald-500" : value >= 50 ? "bg-blue-500" : "bg-red-500";
  return (
    <div className={`h-1.5 w-full overflow-hidden rounded-full bg-slate-100 ${className}`}>
      <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${value}%` }} />
    </div>
  );
}

export default function StudentDashboard() {
  const [userName, setUserName] = useState("Bobur");

  useEffect(() => {
    async function load() {
      try {
        const me = await apiFetch<{ data: { firstName: string } }>("/auth/me");
        setUserName(me.data.firstName);
      } catch { /* */ }
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Salom, {userName}! 👋
          </h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Online o&rsquo;qishingizni davom ettiring. Bugun yangi narsa o&rsquo;rganish uchun ajoyib kun!
          </p>
        </div>
        <Button variant="outline" size="sm" className="hidden sm:flex">
          <Search className="mr-2 size-4" />
          Yangi kurs tanlash
        </Button>
      </div>

      {/* Hero — Continue Learning */}
      <Card className="overflow-hidden rounded-xl border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row">
          <div className="relative h-48 w-full md:h-auto md:w-80 shrink-0">
            <Image
              src={currentCourse.image}
              alt={currentCourse.name}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 320px, 100vw"
            />
            <Badge className="absolute top-3 left-3 bg-blue-500 text-white">Davom etmoqda</Badge>
          </div>
          <CardContent className="flex flex-1 flex-col justify-center p-5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-600">
              O&rsquo;qishni davom ettiring
            </p>
            <h2 className="mt-1 text-lg font-bold text-slate-900">{currentCourse.name}</h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Modul 4 · 12-dars: useState va useEffect hooklari
            </p>
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-700">Kurs progressi</span>
                <span className="font-bold text-blue-600">{currentCourse.progress}%</span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${currentCourse.progress}%` }} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <Button size="sm">
                <Play className="mr-2 size-3.5" />
                Darsni davom ettirish
              </Button>
              <span className="text-xs text-slate-500">
                {currentCourse.completedLessons} / {currentCourse.totalLessons} dars tugallandi
              </span>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="rounded-xl border-slate-200 shadow-xs">
          <CardContent className="p-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <BookOpen className="size-5" />
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">{activeCourses.length}</p>
            <p className="mt-0.5 text-sm text-slate-500">Faol online kurslar</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-amber-200 shadow-xs">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex size-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <Clock className="size-5" />
              </div>
              <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
                <ArrowUpRight className="size-3" />+4s
              </span>
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">47</p>
            <p className="mt-0.5 text-sm text-slate-500">O&rsquo;rganilgan soat</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-slate-200 shadow-xs">
          <CardContent className="p-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <CheckSquare className="size-5" />
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">2</p>
            <p className="mt-0.5 text-sm text-slate-500">Tugallangan</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-slate-200 shadow-xs">
          <CardContent className="p-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
              <Award className="size-5" />
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">2</p>
            <p className="mt-0.5 text-sm text-slate-500">Sertifikatlar</p>
          </CardContent>
        </Card>
      </div>

      {/* Active courses + Weekly goal */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Active courses */}
        <Card className="rounded-xl border-slate-200 shadow-xs xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Faol online kurslarim</CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-xs text-blue-600">
              <Link href="/student/kurslarim">Hammasi <ChevronRight className="ml-0.5 size-3" /></Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {activeCourses.map((course) => (
                <div key={course.id} className="overflow-hidden rounded-lg border border-slate-100">
                  <div className="relative h-36">
                    <Image
                      src={course.image}
                      alt={course.name}
                      fill
                      className="object-cover"
                      sizes="(min-width: 640px) 50%, 100%"
                    />
                    <Badge className={`absolute top-2.5 left-2.5 ${course.categoryColor} text-white text-[10px]`}>
                      {course.category}
                    </Badge>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-slate-900 truncate">{course.name}</h3>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <Avatar className="size-5">
                        <AvatarImage src={course.teacherAvatar} alt={course.teacher} />
                        <AvatarFallback className="text-[8px]">
                          {course.teacher.split(" ").map((w) => w[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-[11px] text-slate-500">{course.teacher}</span>
                    </div>
                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500">
                      <span>{course.completedLessons} / {course.totalLessons} dars</span>
                      <span className="font-semibold text-slate-900">{course.progress}%</span>
                    </div>
                    <ProgressBar value={course.progress} className="mt-1" />
                    <Button className="mt-3 w-full" size="sm">
                      <Play className="mr-1.5 size-3" />
                      Davom ettirish
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly goal */}
        <Card className="rounded-xl border-slate-200 shadow-xs">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Haftalik maqsad</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-slate-900">5</span>
              <span className="text-sm text-slate-500">/ 7 kun ketma-ket o&rsquo;qildi</span>
              <Flame className="ml-1 size-5 text-amber-500" />
            </div>

            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-slate-700">Haftalik maqsad: 10 soat</span>
              <span className="font-semibold text-emerald-600">7s 20daq</span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: "73%" }} />
            </div>

            <div className="mt-5 grid grid-cols-7 gap-1.5 text-center">
              {weekDays.map((day, i) => (
                <div key={day} className="flex flex-col items-center gap-1.5">
                  <span className="text-[10px] text-slate-400">{day}</span>
                  {streakDays[i] ? (
                    <div className="flex size-8 items-center justify-center rounded-full bg-emerald-500">
                      {i === 4 ? (
                        <span className="text-xs font-bold text-white">5</span>
                      ) : (
                        <CheckCircle2 className="size-4 text-white" />
                      )}
                    </div>
                  ) : (
                    <div className="size-8 rounded-full bg-slate-100" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended courses */}
      <Card className="rounded-xl border-slate-200 shadow-xs">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold">Siz uchun tavsiya etiladi</CardTitle>
          <Button asChild variant="ghost" size="sm" className="text-xs text-blue-600">
            <Link href="/kurslar">Barcha kurslar <ChevronRight className="ml-0.5 size-3" /></Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recommendedCourses.map((course) => (
              <div key={course.name} className="overflow-hidden rounded-lg border border-slate-100">
                <div className="relative h-32">
                  <Image
                    src={course.image}
                    alt={course.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 25%, (min-width: 640px) 50%, 100%"
                  />
                  <Badge className={`absolute top-2.5 left-2.5 ${course.categoryColor} text-white text-[10px]`}>
                    {course.category}
                  </Badge>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-slate-900 truncate">{course.name}</h3>
                  <p className="mt-1 text-[11px] text-slate-500">
                    {course.lessons} dars · {course.hours} soat
                  </p>
                  <Button variant="outline" className="mt-3 w-full" size="sm">
                    Batafsil
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Award,
  BookOpen,
  CheckSquare,
  Clock,
  Download,
  Play,
  Plus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Course {
  id: string;
  name: string;
  teacher: string;
  teacherAvatar: string;
  image: string;
  category: string;
  categoryColor: string;
  totalLessons: number;
  completedLessons: number;
  progress: number;
  status: "active" | "completed";
  finalGrade?: number;
  gradeLabel?: string;
}

const courses: Course[] = [
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
    status: "active",
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
    status: "active",
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
    status: "active",
  },
  {
    id: "4",
    name: "JavaScript asoslari",
    teacher: "Akmal Karimov",
    teacherAvatar: "https://i.pravatar.cc/150?img=12",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
    category: "Tugallangan",
    categoryColor: "bg-slate-500",
    totalLessons: 60,
    completedLessons: 60,
    progress: 100,
    status: "completed",
    finalGrade: 94,
    gradeLabel: "A'lo",
  },
  {
    id: "5",
    name: "Git va GitHub",
    teacher: "Jasur Rahimov",
    teacherAvatar: "https://i.pravatar.cc/150?img=60",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&q=80",
    category: "Tugallangan",
    categoryColor: "bg-slate-500",
    totalLessons: 20,
    completedLessons: 20,
    progress: 100,
    status: "completed",
    finalGrade: 88,
    gradeLabel: "Yaxshi",
  },
];

const activeCourses = courses.filter((c) => c.status === "active");
const completedCourses = courses.filter((c) => c.status === "completed");
const totalHours = 47;

function ProgressBar({ value, color = "bg-blue-500" }: { value: number; color?: string }) {
  const barColor =
    value >= 90 ? "bg-emerald-500" :
    value >= 50 ? "bg-blue-500" :
    "bg-red-500";

  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        className={`h-full rounded-full transition-all ${color === "auto" ? barColor : color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function MyCoursesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Mening online kurslarim
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Yozilgan barcha online kurslaringiz, progress va sertifikatlaringiz.
          </p>
        </div>
        <Button asChild>
          <Link href="/kurslar">
            <Plus className="mr-2 size-4" />
            Yangi kurs olish
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="rounded-xl border-slate-200 shadow-xs">
          <CardContent className="p-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <BookOpen className="size-5" />
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">{activeCourses.length}</p>
            <p className="mt-0.5 text-sm text-slate-500">Davom etayotgan</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-slate-200 shadow-xs">
          <CardContent className="p-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <CheckSquare className="size-5" />
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">{completedCourses.length}</p>
            <p className="mt-0.5 text-sm text-slate-500">Tugallangan</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-slate-200 shadow-xs">
          <CardContent className="p-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Award className="size-5" />
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">{completedCourses.length}</p>
            <p className="mt-0.5 text-sm text-slate-500">Sertifikatlar</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-slate-200 shadow-xs">
          <CardContent className="p-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
              <Clock className="size-5" />
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">{totalHours}</p>
            <p className="mt-0.5 text-sm text-slate-500">O&rsquo;rganilgan soat</p>
          </CardContent>
        </Card>
      </div>

      {/* Active courses */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Davom etayotgan kurslar ({activeCourses.length})
        </h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {activeCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden rounded-xl border-slate-200 shadow-xs">
              <div className="relative h-44">
                <Image
                  src={course.image}
                  alt={course.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <Badge className={`absolute top-3 left-3 ${course.categoryColor} text-white`}>
                  {course.category}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold text-slate-900">{course.name}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <Avatar className="size-6">
                    <AvatarImage src={course.teacherAvatar} alt={course.teacher} />
                    <AvatarFallback className="text-[10px]">
                      {course.teacher.split(" ").map((w) => w[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-slate-500">{course.teacher}</span>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span>{course.completedLessons} / {course.totalLessons} dars</span>
                  <span className="font-semibold text-slate-900">{course.progress}%</span>
                </div>
                <div className="mt-1.5">
                  <ProgressBar value={course.progress} color="auto" />
                </div>

                <Button className="mt-4 w-full" size="sm">
                  <Play className="mr-2 size-3.5" />
                  Davom ettirish
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Completed courses */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Tugallangan kurslar ({completedCourses.length})
        </h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {completedCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden rounded-xl border-slate-200 shadow-xs">
              <div className="relative h-44">
                <Image
                  src={course.image}
                  alt={course.name}
                  fill
                  className="object-cover brightness-75"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <Badge className="absolute top-3 left-3 bg-slate-700/80 text-white">
                  Tugallangan
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold text-slate-900">{course.name}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <Avatar className="size-6">
                    <AvatarImage src={course.teacherAvatar} alt={course.teacher} />
                    <AvatarFallback className="text-[10px]">
                      {course.teacher.split(" ").map((w) => w[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-slate-500">{course.teacher}</span>
                </div>

                <p className="mt-3 text-sm">
                  Yakuniy natija:{" "}
                  <span className={`font-bold ${
                    (course.finalGrade ?? 0) >= 90 ? "text-emerald-600" : "text-blue-600"
                  }`}>
                    {course.finalGrade}% ({course.gradeLabel})
                  </span>
                </p>

                <Button variant="outline" className="mt-4 w-full" size="sm">
                  <Download className="mr-2 size-3.5" />
                  Sertifikatni yuklash
                </Button>
              </CardContent>
            </Card>
          ))}

          {/* Add new course card */}
          <Link href="/kurslar">
            <Card className="flex h-full min-h-[300px] items-center justify-center rounded-xl border-2 border-dashed border-slate-200 shadow-xs transition-colors hover:border-blue-300 hover:bg-blue-50/30">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-slate-100">
                  <Plus className="size-6 text-slate-400" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  Yangi online kurs olish
                </h3>
                <p className="mt-1.5 max-w-[200px] text-xs text-slate-500">
                  Katalogdan kurs tanlang va darrov o&rsquo;qishni boshlang.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}

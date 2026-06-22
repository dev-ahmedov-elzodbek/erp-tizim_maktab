"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight, Search, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Course {
  id: string;
  name: string;
  teacher: string;
  lessons: number;
  rating: number;
  reviews: number;
  price: number;
  oldPrice?: number;
  category: string;
  categoryColor: string;
  image: string;
}

const allCourses: Course[] = [
  {
    id: "1",
    name: "JavaScript dasturlash",
    teacher: "Akmal Karimov",
    lessons: 28,
    rating: 4.9,
    reviews: 312,
    price: 490000,
    oldPrice: 690000,
    category: "Frontend",
    categoryColor: "bg-blue-600",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
  },
  {
    id: "2",
    name: "React.js asoslari",
    teacher: "Nodira Yusupova",
    lessons: 32,
    rating: 4.8,
    reviews: 245,
    price: 790000,
    category: "Frontend",
    categoryColor: "bg-blue-600",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
  },
  {
    id: "3",
    name: "UX/UI dizayn",
    teacher: "Madina Ergasheva",
    lessons: 26,
    rating: 4.9,
    reviews: 189,
    price: 890000,
    category: "Dizayn",
    categoryColor: "bg-purple-600",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
  },
  {
    id: "4",
    name: "Python dasturchilik",
    teacher: "Sherzod Rahimov",
    lessons: 40,
    rating: 4.7,
    reviews: 421,
    price: 790000,
    oldPrice: 990000,
    category: "Backend",
    categoryColor: "bg-green-600",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&q=80",
  },
  {
    id: "5",
    name: "Flutter mobil ilovalar",
    teacher: "Otabek Salimov",
    lessons: 36,
    rating: 4.8,
    reviews: 167,
    price: 990000,
    category: "Mobil",
    categoryColor: "bg-cyan-600",
    image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=600&q=80",
  },
  {
    id: "6",
    name: "Data Science va ML",
    teacher: "Sevara Tursunova",
    lessons: 44,
    rating: 4.6,
    reviews: 98,
    price: 1200000,
    category: "Data Science",
    categoryColor: "bg-orange-600",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  },
  {
    id: "7",
    name: "DevOps muhandisi",
    teacher: "Jasur Mahmudov",
    lessons: 38,
    rating: 4.7,
    reviews: 112,
    price: 1500000,
    category: "DevOps",
    categoryColor: "bg-slate-700",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&q=80",
  },
  {
    id: "8",
    name: "Raqamli marketing",
    teacher: "Diloraxon Nazarova",
    lessons: 18,
    rating: 4.8,
    reviews: 203,
    price: 690000,
    category: "Marketing",
    categoryColor: "bg-pink-600",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
];

function formatMoney(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const PAGE_SIZE = 8;

export default function KatalogPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = allCourses.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-xl bg-slate-900 px-6 py-8">
        <h1 className="text-2xl font-bold text-white">Kurslar katalogi</h1>
        <p className="mt-1.5 text-sm text-slate-400">
          {"Yangi kurs tanlang va bir martalik to'lov bilan umrbod kirish oling."}
        </p>
      </div>

      {/* Filters */}
      <Card className="rounded-xl border-slate-200 shadow-xs">
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Kurs nomi bo'yicha qidiring..."
              className="pl-9"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-slate-600">
              Barcha kategoriyalar <ChevronDown className="ml-1.5 size-3.5" />
            </Button>
            <Button variant="outline" size="sm" className="text-slate-600">
              Daraja: barchasi <ChevronDown className="ml-1.5 size-3.5" />
            </Button>
            <Button variant="outline" size="sm" className="text-slate-600">
              Saralash: mashhur <ChevronDown className="ml-1.5 size-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Course grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {paginated.map((course) => (
          <Card key={course.id} className="overflow-hidden rounded-xl border-slate-200 shadow-xs">
            <div className="relative h-48">
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
              <h3 className="text-base font-bold text-slate-900">{course.name}</h3>
              <p className="mt-1 text-sm text-slate-500">
                {course.teacher} &middot; {course.lessons} dars
              </p>
              <div className="mt-2 flex items-center gap-1">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-semibold text-slate-900">{course.rating}</span>
                <span className="text-sm text-slate-400">({course.reviews})</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-lg font-bold text-slate-900">
                  {formatMoney(course.price)} so&apos;m
                </span>
                {course.oldPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatMoney(course.oldPrice)}
                  </span>
                )}
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link href={`/student/katalog/${course.id}`}>Batafsil</Link>
                </Button>
                <Button size="sm" className="flex-1" asChild>
                  <Link href={`/student/katalog/${course.id}/tolov`}>Sotib olish</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Ko&apos;rsatilmoqda{" "}
            <span className="font-semibold text-blue-600">{(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, filtered.length)}</span>
            {" / "}
            <span className="font-semibold text-blue-600">{filtered.length}</span> kurs
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="size-9"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeft className="size-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                variant={p === page ? "default" : "outline"}
                size="icon"
                className="size-9"
                onClick={() => setPage(p)}
              >
                {p}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              className="size-9"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
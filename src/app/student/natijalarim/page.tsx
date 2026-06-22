"use client";

import {
  BarChart3,
  CheckCircle2,
  CheckSquare,
  RefreshCw,
  Trophy,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TestResult {
  id: string;
  name: string;
  course: string;
  date: string;
  score: number;
  status: "passed" | "retake";
}

const results: TestResult[] = [
  {
    id: "1",
    name: "Modul 4 testi: Hooklar",
    course: "React.js — zamonaviy frontend",
    date: "12-noyabr, 2025",
    score: 88,
    status: "passed",
  },
  {
    id: "2",
    name: "Amaliyot: Komponentlar",
    course: "React.js — zamonaviy frontend",
    date: "28-oktabr, 2025",
    score: 95,
    status: "passed",
  },
  {
    id: "3",
    name: "Funksiyalar va sikllar testi",
    course: "Python asoslari",
    date: "15-oktabr, 2025",
    score: 64,
    status: "retake",
  },
  {
    id: "4",
    name: "Yakuniy loyiha: Figma maket",
    course: "UX/UI dizayn asoslari",
    date: "03-oktabr, 2025",
    score: 92,
    status: "passed",
  },
  {
    id: "5",
    name: "Boshlang'ich test: JS asoslari",
    course: "Python asoslari",
    date: "21-sentabr, 2025",
    score: 78,
    status: "passed",
  },
  {
    id: "6",
    name: "Modul 2 testi: State boshqaruvi",
    course: "React.js — zamonaviy frontend",
    date: "10-sentabr, 2025",
    score: 91,
    status: "passed",
  },
  {
    id: "7",
    name: "Amaliyot: Wireframe yaratish",
    course: "UX/UI dizayn asoslari",
    date: "28-avgust, 2025",
    score: 85,
    status: "passed",
  },
  {
    id: "8",
    name: "Ma'lumotlar tuzilmasi testi",
    course: "Python asoslari",
    date: "15-avgust, 2025",
    score: 72,
    status: "passed",
  },
];

const avgScore = Math.round(results.reduce((s, r) => s + r.score, 0) / results.length);
const solvedTests = results.length;
const passedTests = results.filter((r) => r.status === "passed").length;
const highestScore = Math.max(...results.map((r) => r.score));

function ScoreColor({ score }: { score: number }) {
  const color =
    score >= 90
      ? "text-emerald-600"
      : score >= 70
        ? "text-blue-600"
        : "text-orange-500";
  return <span className={`font-bold ${color}`}>{score}%</span>;
}

export default function NatijalarimPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Natijalarim
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Kurs testlari va amaliy topshiriqlar bo&apos;yicha natijalaringiz.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="rounded-xl border-slate-200 shadow-xs">
          <CardContent className="p-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <BarChart3 className="size-5" />
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">{avgScore}%</p>
            <p className="mt-0.5 text-sm text-slate-500">O&apos;rtacha natija</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-slate-200 shadow-xs">
          <CardContent className="p-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <CheckSquare className="size-5" />
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">{solvedTests}</p>
            <p className="mt-0.5 text-sm text-slate-500">Yechilgan testlar</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-slate-200 shadow-xs">
          <CardContent className="p-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <CheckCircle2 className="size-5" />
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">{passedTests}</p>
            <p className="mt-0.5 text-sm text-slate-500">O&apos;tilgan</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-slate-200 shadow-xs">
          <CardContent className="p-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
              <Zap className="size-5" />
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">{highestScore}</p>
            <p className="mt-0.5 text-sm text-slate-500">Eng yuqori ball</p>
          </CardContent>
        </Card>
      </div>

      {/* Results table */}
      <Card className="rounded-xl border-slate-200 shadow-xs">
        <CardContent className="p-0">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Test va topshiriq natijalari
            </h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Test / Topshiriq
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Kurs
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Sana
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Natija
                </TableHead>
                <TableHead className="pr-5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Holat
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="pl-5 font-medium text-slate-900">
                    {result.name}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {result.course}
                  </TableCell>
                  <TableCell className="text-slate-500">
                    {result.date}
                  </TableCell>
                  <TableCell>
                    <ScoreColor score={result.score} />
                  </TableCell>
                  <TableCell className="pr-5">
                    {result.status === "passed" ? (
                      <Badge className="bg-emerald-50 text-emerald-700 shadow-none hover:bg-emerald-50">
                        <CheckCircle2 className="mr-1 size-3" />
                        O&apos;tdi
                      </Badge>
                    ) : (
                      <Badge className="bg-orange-50 text-orange-700 shadow-none hover:bg-orange-50">
                        <RefreshCw className="mr-1 size-3" />
                        Qayta topshirish mumkin
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

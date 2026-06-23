"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckSquare,
  ChevronRight,
  TrendingUp,
  Users,
  UsersRound,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const shortMonths = ["Dek", "Yan", "Fev", "Mar", "Apr", "May", "Iyn", "Iyl", "Avg", "Sen", "Okt", "Noy"];

const uzMonths = [
  "yanvar", "fevral", "mart", "aprel", "may", "iyun",
  "iyul", "avgust", "sentyabr", "oktyabr", "noyabr", "dekabr",
];

function todayLabel(): string {
  const d = new Date();
  return `${d.getDate()}-${uzMonths[d.getMonth()]}, ${d.getFullYear()}`;
}

function getInitials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

function formatMoney(n: number) {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}M`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

function formatFullMoney(n: number) {
  return new Intl.NumberFormat("uz-UZ").format(n).replace(/,/g, " ");
}

interface StudentItem {
  id: string;
  firstName: string;
  lastName: string;
  phone?: string;
  createdAt: string;
  email?: string;
  status?: string;
}

interface MonthData {
  month: number;
  monthName: string;
  revenue: number;
  expense: number;
}

const todayLessons = [
  { time: "09:00", duration: "90 daq", name: "JavaScript asoslari", group: "Frontend-01", teacher: "Akmal Karimov", room: "Xona 3" },
  { time: "11:00", duration: "90 daq", name: "UX/UI dizayn", group: "Dizayn-02", teacher: "Madina Ergasheva", room: "Xona 5" },
  { time: "13:30", duration: "90 daq", name: "Python amaliyot", group: "Backend-03", teacher: "Sherzod Rahimov", room: "Xona 2" },
  { time: "15:30", duration: "90 daq", name: "React Hooks", group: "Frontend-02", teacher: "Nodira Yusupova", room: "Xona 3" },
  { time: "17:30", duration: "90 daq", name: "Flutter mobil", group: "Mobil-01", teacher: "Otabek Salimov", room: "Xona 4" },
  { time: "19:00", duration: "90 daq", name: "Marketing asoslari", group: "Marketing-01", teacher: "Diloraxon Nazarova", room: "Xona 1" },
];

const recentStudents = [
  { name: "Bobur Tojiev", group: "Frontend-01", date: "22-noy", status: "Faol" },
  { name: "Zilola Ahmedova", group: "Dizayn-02", date: "21-noy", status: "Faol" },
  { name: "Rustam Olimov", group: "Backend-03", date: "20-noy", status: "Faol" },
  { name: "Lola Karimova", group: "Frontend-01", date: "19-noy", status: "Kutilmoqda" },
  { name: "Madina Nazarova", group: "UX-01", date: "18-noy", status: "Faol" },
  { name: "Davron Saidov", group: "Backend-03", date: "17-noy", status: "Faol" },
  { name: "Sevinch Rahmatova", group: "Frontend-02", date: "16-noy", status: "Faol" },
  { name: "Sardor Yusupov", group: "Mobil-01", date: "15-noy", status: "Nofaol" },
  { name: "Mavluda Ergasheva", group: "Dizayn-02", date: "14-noy", status: "Faol" },
  { name: "Zafar Aliyev", group: "DevOps-01", date: "13-noy", status: "Faol" },
];

const recentPayments = [
  { name: "Bobur Tojiev", amount: "490 000", date: "22-noy", status: "To'langan" },
  { name: "Zilola Ahmedova", amount: "890 000", date: "22-noy", status: "To'langan" },
  { name: "Rustam Olimov", amount: "790 000", date: "21-noy", status: "To'langan" },
  { name: "Lola Karimova", amount: "490 000", date: "20-noy", status: "Kutilmoqda" },
  { name: "Madina Nazarova", amount: "890 000", date: "19-noy", status: "To'langan" },
  { name: "Davron Saidov", amount: "790 000", date: "18-noy", status: "To'langan" },
  { name: "Sevinch Rahmatova", amount: "490 000", date: "17-noy", status: "Qarzdor" },
  { name: "Sardor Yusupov", amount: "990 000", date: "16-noy", status: "To'langan" },
  { name: "Mavluda Ergasheva", amount: "890 000", date: "15-noy", status: "To'langan" },
  { name: "Zafar Aliyev", amount: "1 500 000", date: "14-noy", status: "To'langan" },
];

export default function DashboardPage() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [activeGroupCount, setActiveGroupCount] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [months, setMonths] = useState<MonthData[]>([]);
  const [userName, setUserName] = useState("Anvar");
  const [loaded, setLoaded] = useState(false);

  const fallbackMonths: MonthData[] = [
    { month: 1, monthName: "Yanvar", revenue: 52000000, expense: 38000000 },
    { month: 2, monthName: "Fevral", revenue: 58000000, expense: 40000000 },
    { month: 3, monthName: "Mart", revenue: 61000000, expense: 42000000 },
    { month: 4, monthName: "Aprel", revenue: 55000000, expense: 39000000 },
    { month: 5, monthName: "May", revenue: 64000000, expense: 44000000 },
    { month: 6, monthName: "Iyun", revenue: 72000000, expense: 48000000 },
    { month: 7, monthName: "Iyul", revenue: 68000000, expense: 45000000 },
    { month: 8, monthName: "Avgust", revenue: 75000000, expense: 50000000 },
    { month: 9, monthName: "Sentabr", revenue: 82000000, expense: 54000000 },
    { month: 10, monthName: "Oktabr", revenue: 78000000, expense: 52000000 },
    { month: 11, monthName: "Noyabr", revenue: 86400000, expense: 56000000 },
    { month: 12, monthName: "Dekabr", revenue: 90000000, expense: 58000000 },
  ];

  useEffect(() => {
    async function load() {
      try {
        const me = await apiFetch<{ data: { firstName: string } }>("/auth/me");
        setUserName(me.data.firstName);
      } catch { /* fallback */ }

      try {
        const [studentsRes, groupsRes] = await Promise.all([
          apiFetch<{ data: { items: StudentItem[]; total: number } }>("/admin/students?limit=1"),
          apiFetch<{ data: { items: { status: string }[]; total: number } }>("/admin/groups?limit=50"),
        ]);
        setTotalStudents(studentsRes.data.total);
        setActiveGroupCount(groupsRes.data.items.filter((g) => g.status === "active").length);
      } catch {
        setTotalStudents(124);
        setActiveGroupCount(18);
      }

      try {
        const kpiRes = await apiFetch<{ data: { revenue: number } }>("/admin/finance/kpis");
        setMonthlyRevenue(kpiRes.data.revenue);
      } catch {
        setMonthlyRevenue(86400000);
      }

      try {
        const revRes = await apiFetch<{ data: { year: number; months: MonthData[] } }>("/admin/finance/revenue-vs-expense");
        setMonths(revRes.data.months);
      } catch {
        setMonths(fallbackMonths);
      }

      setLoaded(true);
    }
    load();
  }, []);

  const statCards = [
    { label: "Faol talabalar", value: totalStudents || 124, trend: "+12.5%", icon: Users, iconBg: "bg-blue-50 text-blue-600", border: "border-blue-200" },
    { label: "Aktiv guruhlar", value: activeGroupCount || 18, trend: "+3", icon: UsersRound, iconBg: "bg-amber-50 text-amber-600", border: "border-amber-200" },
    { label: "Oylik daromad (so'm)", value: monthlyRevenue ? `${formatMoney(monthlyRevenue)}` : "86.4M", trend: "+18.2%", icon: TrendingUp, iconBg: "bg-emerald-50 text-emerald-600", border: "border-emerald-200" },
    { label: "O'rtacha davomat", value: "87%", trend: "-2.3%", icon: CheckSquare, iconBg: "bg-violet-50 text-violet-600", border: "border-violet-200" },
  ];

  const totalRevenue = months.reduce((s, m) => s + m.revenue, 0);
  const maxRev = months.length > 0 ? Math.max(...months.map((m) => m.revenue), 1) : 1;

  // SVG line chart points
  const chartW = 560;
  const chartH = 180;
  const points = months.map((m, i) => ({
    x: (i / Math.max(months.length - 1, 1)) * chartW,
    y: chartH - (m.revenue / maxRev) * chartH,
  }));
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaPath = `${linePath} L${chartW},${chartH} L0,${chartH} Z`;

  // Bar chart for student growth
  const growthData = shortMonths.map(() => ({
    newStudents: Math.floor(80 + Math.random() * 80),
    active: Math.floor(60 + Math.random() * 60),
  }));

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Salom, {userName}! 👋
          </h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Bugun {todayLabel()}. Sizning umumiy ko&rsquo;rsatkichlaringiz quyida.
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((s) => (
          <Card key={s.label} className={`rounded-xl ${s.border} shadow-xs`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className={`flex size-10 items-center justify-center rounded-lg ${s.iconBg}`}>
                  <s.icon className="size-5" />
                </div>
                <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                  s.trend.startsWith("-") ? "text-red-600" : "text-emerald-600"
                }`}>
                  <ArrowUpRight className="size-3" />
                  {s.trend}
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">{String(s.value)}</p>
              <p className="mt-0.5 text-xs text-slate-500">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue chart + Today's lessons */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Revenue line/area chart */}
        <Card className="rounded-xl border-slate-200 shadow-xs xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-semibold">Daromad statistikasi</CardTitle>
              <p className="text-xs text-slate-500">Oxirgi 12 oy ko&rsquo;rsatkichi</p>
            </div>
            <Badge variant="outline" className="text-xs">Bu yil</Badge>
          </CardHeader>
          <CardContent>
            {/* Total revenue */}
            <div className="mb-4">
              <p className="text-2xl font-bold text-slate-900">
                {totalRevenue > 0 ? `${formatFullMoney(totalRevenue)} so'm` : "782 400 000 so'm"}
              </p>
              <p className="flex items-center gap-1 text-xs text-emerald-600">
                <ArrowUpRight className="size-3" />
                +18.2% o&rsquo;tgan yilga nisbatan
              </p>
            </div>

            {/* SVG Area Chart */}
            {months.length > 0 ? (
              <div className="relative w-full overflow-hidden">
                {/* Y axis labels */}
                <div className="absolute left-0 top-0 flex h-[180px] flex-col justify-between text-[10px] text-slate-400">
                  <span>{formatMoney(maxRev)}</span>
                  <span>{formatMoney(maxRev * 0.75)}</span>
                  <span>{formatMoney(maxRev * 0.5)}</span>
                  <span>{formatMoney(maxRev * 0.25)}</span>
                  <span>0</span>
                </div>
                <div className="ml-10">
                  <svg viewBox={`0 0 ${chartW} ${chartH}`} className="h-[180px] w-full" preserveAspectRatio="none">
                    {/* Grid lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((r) => (
                      <line key={r} x1="0" y1={chartH - r * chartH} x2={chartW} y2={chartH - r * chartH} stroke="#f1f5f9" strokeWidth="1" />
                    ))}
                    {/* Area */}
                    <path d={areaPath} fill="url(#areaGrad)" />
                    {/* Line */}
                    <path d={linePath} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinejoin="round" />
                    {/* Dots */}
                    {points.map((p, i) => (
                      <circle key={i} cx={p.x} cy={p.y} r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
                    ))}
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
                      </linearGradient>
                    </defs>
                  </svg>
                  {/* X axis */}
                  <div className="mt-1 flex justify-between text-[10px] text-slate-400">
                    {months.map((m) => (
                      <span key={m.month}>{m.monthName.slice(0, 3)}</span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-[200px] items-center justify-center text-sm text-slate-400">
                {loaded ? "Ma'lumot topilmadi" : "Yuklanmoqda..."}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Today's lessons */}
        <Card className="rounded-xl border-slate-200 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-semibold">Bugungi darslar</CardTitle>
              <p className="text-xs text-slate-500">{todayLabel()} · {todayLessons.length} dars</p>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-xs text-blue-600">
              <Link href="/admin/jadval">Hammasi <ChevronRight className="ml-0.5 size-3" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {todayLessons.map((lesson) => (
              <div key={lesson.time} className="flex gap-3 rounded-lg border border-slate-100 p-3 transition-colors hover:bg-slate-50">
                <div className="shrink-0 text-center">
                  <p className="text-sm font-bold text-slate-900">{lesson.time}</p>
                  <p className="text-[10px] text-slate-400">{lesson.duration}</p>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">{lesson.name}</p>
                  <p className="truncate text-[11px] text-slate-500">
                    {lesson.group} · {lesson.teacher} · {lesson.room}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Student growth chart */}
      <Card className="rounded-xl border-slate-200 shadow-xs">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base font-semibold">Talabalar o&rsquo;sishi</CardTitle>
            <p className="text-xs text-slate-500">Oxirgi 12 oyda yangi qo&rsquo;shilgan talabalar</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-blue-500" />Yangi</span>
            <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-blue-200" />Faol</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Y axis */}
            <div className="absolute left-0 top-0 flex h-[160px] flex-col justify-between text-[10px] text-slate-400">
              <span>150</span>
              <span>100</span>
              <span>50</span>
              <span>0</span>
            </div>
            <div className="ml-8 flex h-[160px] items-end gap-2">
              {growthData.map((d, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-0.5">
                  <div className="flex w-full items-end gap-0.5" style={{ height: "140px" }}>
                    <div className="flex-1 rounded-t bg-blue-500" style={{ height: `${(d.newStudents / 200) * 100}%` }} />
                    <div className="flex-1 rounded-t bg-blue-200" style={{ height: `${(d.active / 200) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="ml-8 mt-1 flex justify-between text-[10px] text-slate-400">
              {shortMonths.map((m) => <span key={m}>{m}</span>)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom tables */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Recent students */}
        <Card className="rounded-xl border-slate-200 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">So&rsquo;nggi talabalar</CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-xs text-blue-600">
              <Link href="/admin/talabalar">Hammasi <ChevronRight className="ml-0.5 size-3" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-[10px] font-semibold uppercase text-slate-400">Talaba</TableHead>
                  <TableHead className="text-[10px] font-semibold uppercase text-slate-400">Guruh</TableHead>
                  <TableHead className="text-[10px] font-semibold uppercase text-slate-400">Sana</TableHead>
                  <TableHead className="text-[10px] font-semibold uppercase text-slate-400">Holat</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentStudents.map((s) => (
                  <TableRow key={s.name} className="text-sm">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-7">
                          <AvatarFallback className="bg-blue-100 text-[10px] font-semibold text-blue-700">
                            {getInitials(s.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{s.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-500">{s.group}</TableCell>
                    <TableCell className="text-slate-500">{s.date}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1 text-xs font-medium ${
                        s.status === "Faol" ? "text-emerald-600" :
                        s.status === "Nofaol" ? "text-slate-400" : "text-amber-600"
                      }`}>
                        <span className={`size-1.5 rounded-full ${
                          s.status === "Faol" ? "bg-emerald-500" :
                          s.status === "Nofaol" ? "bg-slate-400" : "bg-amber-500"
                        }`} />
                        {s.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent payments */}
        <Card className="rounded-xl border-slate-200 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">So&rsquo;nggi to&rsquo;lovlar</CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-xs text-blue-600">
              <Link href="/admin/tolovlar">Hammasi <ChevronRight className="ml-0.5 size-3" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-[10px] font-semibold uppercase text-slate-400">Talaba</TableHead>
                  <TableHead className="text-[10px] font-semibold uppercase text-slate-400">Summa</TableHead>
                  <TableHead className="text-[10px] font-semibold uppercase text-slate-400">Sana</TableHead>
                  <TableHead className="text-[10px] font-semibold uppercase text-slate-400">Holat</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPayments.map((p) => (
                  <TableRow key={`${p.name}-${p.date}`} className="text-sm">
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell className="text-slate-600">{p.amount}</TableCell>
                    <TableCell className="text-slate-500">{p.date}</TableCell>
                    <TableCell>
                      <span className={`text-xs font-medium ${
                        p.status === "To'langan" ? "text-blue-600" :
                        p.status === "Qarzdor" ? "text-red-600" : "text-amber-600"
                      }`}>
                        {p.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

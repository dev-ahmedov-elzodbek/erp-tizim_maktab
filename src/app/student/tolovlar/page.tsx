"use client";

import Link from "next/link";
import {
  BookOpen,
  Calendar,
  CreditCard,
  DollarSign,
  Download,
  Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Payment {
  id: string;
  date: string;
  course: string;
  amount: number;
  method: string;
  status: "paid" | "pending";
}

const payments: Payment[] = [
  {
    id: "1",
    date: "14-noyabr, 2025",
    course: "React.js — zamonaviy frontend",
    amount: 790000,
    method: "Payme",
    status: "paid",
  },
  {
    id: "2",
    date: "02-oktabr, 2025",
    course: "Python asoslari",
    amount: 590000,
    method: "Uzcard",
    status: "paid",
  },
  {
    id: "3",
    date: "18-avgust, 2025",
    course: "UX/UI dizayn asoslari",
    amount: 490000,
    method: "Click",
    status: "paid",
  },
];

const totalSpent = payments.reduce((s, p) => s + p.amount, 0);
const totalCourses = payments.length;
const thisYearSpent = payments.reduce((s, p) => s + p.amount, 0);

function formatMoney(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const paymentMethods = ["Payme", "Click", "Uzcard", "Visa / Mastercard"];

export default function TolovlarPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Mening to&apos;lovlarim
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Sotib olingan kurslar va to&apos;lov tarixi. Har bir kurs &mdash; bir martalik to&apos;lov, umrbod kirish.
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
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="rounded-xl border-slate-200 shadow-xs">
          <CardContent className="p-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <DollarSign className="size-5" />
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">
              {formatMoney(totalSpent)}
            </p>
            <p className="mt-0.5 text-sm text-slate-500">Jami sarflangan (so&apos;m)</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-slate-200 shadow-xs">
          <CardContent className="p-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <BookOpen className="size-5" />
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">{totalCourses}</p>
            <p className="mt-0.5 text-sm text-slate-500">Sotib olingan kurslar</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-slate-200 shadow-xs">
          <CardContent className="p-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Calendar className="size-5" />
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">
              {formatMoney(thisYearSpent)}
            </p>
            <p className="mt-0.5 text-sm text-slate-500">Bu yil sarflangan (so&apos;m)</p>
          </CardContent>
        </Card>
      </div>

      {/* Table + Sidebar */}
      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        {/* Payment history table */}
        <Card className="rounded-xl border-slate-200 shadow-xs">
          <CardContent className="p-0">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="text-lg font-semibold text-slate-900">To&apos;lov tarixi</h2>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="pl-5 text-xs font-semibold uppercase tracking-wider text-slate-400">Sana</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400">Kurs</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400">Summa</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400">Usul</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400">Holat</TableHead>
                  <TableHead className="pr-5 text-xs font-semibold uppercase tracking-wider text-slate-400">Chek</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="pl-5 text-slate-500">{p.date}</TableCell>
                    <TableCell className="font-medium text-slate-900">{p.course}</TableCell>
                    <TableCell className="text-slate-700">{formatMoney(p.amount)}</TableCell>
                    <TableCell className="text-slate-500">{p.method}</TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-50 text-emerald-700 shadow-none hover:bg-emerald-50">
                        To&apos;langan
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-5">
                      <Button variant="ghost" size="sm" className="h-auto p-1 text-slate-500 hover:text-slate-900">
                        <Download className="mr-1 size-3.5" />
                        PDF
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Payment method card */}
          <Card className="rounded-xl border-slate-200 shadow-xs">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-slate-900">To&apos;lov usuli</h2>
              <div className="mt-4 flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3">
                <div className="flex h-8 items-center justify-center rounded bg-blue-600 px-2">
                  <span className="text-xs font-bold text-white">VISA</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 4242</p>
                  <p className="text-xs text-slate-500">Amal qiladi: 08/27</p>
                </div>
              </div>
              <Button variant="outline" className="mt-3 w-full" size="sm">
                Kartani o&apos;zgartirish
              </Button>
              <div className="mt-4 flex flex-wrap gap-2">
                {paymentMethods.map((m) => (
                  <Badge key={m} variant="outline" className="rounded-full border-slate-200 text-slate-600">
                    {m}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA card */}
          <Card className="rounded-xl border-0 bg-blue-50 shadow-xs">
            <CardContent className="p-6">
              <h3 className="text-base font-bold text-slate-900">Yana kurs qo&apos;shing</h3>
              <p className="mt-1.5 text-sm text-slate-600">
                Katalogdan yangi kurs tanlang &mdash; to&apos;lovdan so&apos;ng darrov kirish ochiladi.
              </p>
              <Button asChild className="mt-4 w-full" size="sm">
                <Link href="/kurslar">Kurslar katalogi</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
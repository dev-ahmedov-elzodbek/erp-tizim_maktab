"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  BookOpen,
  Lock,
  Play,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  status: "completed" | "current" | "locked";
}

interface Module {
  id: string;
  title: string;
  completedInfo: string;
  lessons: Lesson[];
}

const modules: Module[] = [
  {
    id: "3",
    title: "Modul 3 · Komponentlar",
    completedInfo: "8 dars · tugallandi",
    lessons: [],
  },
  {
    id: "4",
    title: "Modul 4 · Hooklar",
    completedInfo: "6 dars · 2 tugallandi",
    lessons: [
      { id: "1", title: "Hooklarga kirish", duration: "10:05", status: "completed" },
      { id: "2", title: "useRef asoslari", duration: "09:30", status: "completed" },
      { id: "3", title: "useState va useEffect hooklari", duration: "18:24", status: "current" },
      { id: "4", title: "useContext va Context API", duration: "16:00", status: "locked" },
      { id: "5", title: "Custom hook yaratish", duration: "14:20", status: "locked" },
      { id: "6", title: "Amaliyot: To-do ilovasi", duration: "22:15", status: "locked" },
    ],
  },
  {
    id: "5",
    title: "Modul 5 · Router va Redux",
    completedInfo: "7 dars · qulflangan",
    lessons: [],
  },
];

const currentLesson = {
  title: "useState va useEffect hooklari",
  module: "MODUL 4 · 12-DARS",
  duration: "18 daqiqa",
  progress: "14 / 32 dars",
  teacher: "Akmal Karimov",
  teacherAvatar: "https://i.pravatar.cc/150?img=12",
  thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80",
};

const topics = [
  "useState bilan holatni boshqarish",
  "useEffect va bog’liqliklar massivi (dependency array)",
  "Komponent hayot sikli (lifecycle)",
  "Keng tarqalgan xatolar va ulardan qochish",
];

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-700">
      <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${value}%` }} />
    </div>
  );
}

export default function LessonPage() {
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({ "4": true });
  const [activeTab, setActiveTab] = useState("tavsif");

  const toggleModule = (id: string) => {
    setOpenModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 p-4 lg:p-6">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-900">
              <Image src={currentLesson.thumbnail} alt={currentLesson.title} fill className="object-cover brightness-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="flex size-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition hover:bg-white/30">
                  <Play className="size-7 fill-white text-white" />
                </button>
              </div>
              <div className="absolute right-3 bottom-3 rounded bg-black/70 px-2 py-1 text-xs font-medium">18:24</div>
            </div>

            <div className="mt-5">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-400">{currentLesson.module}</p>
              <h1 className="mt-1.5 text-xl font-bold text-white sm:text-2xl">{currentLesson.title}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1.5"><Clock className="size-4" />{currentLesson.duration}</span>
                <span className="flex items-center gap-1.5"><BookOpen className="size-4" />{currentLesson.progress}</span>
                <span className="flex items-center gap-1.5">
                  <Avatar className="size-5"><AvatarImage src={currentLesson.teacherAvatar} /><AvatarFallback className="text-[8px]">AK</AvatarFallback></Avatar>
                  {currentLesson.teacher}
                </span>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button variant="outline" size="sm" className="border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white">
                <ChevronLeft className="mr-1.5 size-4" />Oldingi dars
              </Button>
              <Button size="sm" className="bg-emerald-600 text-white hover:bg-emerald-700">
                <Check className="mr-1.5 size-4" />Tugatdim
              </Button>
              <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                Keyingi dars<ChevronRight className="ml-1.5 size-4" />
              </Button>
            </div>

            <div className="mt-8 border-b border-slate-800">
              <div className="flex gap-6">
                {[{ id: "tavsif", label: "Tavsif" }, { id: "materiallar", label: "Materiallar" }, { id: "izohlar", label: "Izohlar (8)" }].map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={cn("border-b-2 pb-3 text-sm font-medium transition-colors", activeTab === tab.id ? "border-blue-500 text-blue-400" : "border-transparent text-slate-500 hover:text-slate-300")}>{tab.label}</button>
                ))}
              </div>
            </div>

            {activeTab === "tavsif" && (
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-400">
                <p>{"Bu darsda React’ning eng muhim ikki hookasi — "}<span className="text-blue-400">useState</span>{" va "}<span className="text-blue-400">useEffect</span>{" bilan ishlashni o’rganamiz. Komponent holatini (state) qanday saqlash, yangilash va yon ta’sirlarni (side effects) boshqarishni amaliy misollarda ko’rib chiqamiz."}</p>
                <p>{"Dars oxiriga borib siz holatga ega interaktiv komponent yaratishni va ma’lumotlarni API’dan yuklab, ekranda ko’rsatishni bilib olasiz."}</p>
                <p className="text-blue-400">Ushbu darsda:</p>
                <ul className="ml-4 space-y-1.5">{topics.map((t, i) => (<li key={i}>{t}</li>))}</ul>
              </div>
            )}
            {activeTab === "materiallar" && (<div className="mt-6 text-sm text-slate-400"><p>Bu dars uchun qo&apos;shimcha materiallar hozircha mavjud emas.</p></div>)}
            {activeTab === "izohlar" && (<div className="mt-6 text-sm text-slate-400"><p>Izohlar bo&apos;limi tez orada qo&apos;shiladi.</p></div>)}
          </div>

          <aside className="w-full border-l border-slate-800 lg:w-80 xl:w-96">
            <div className="sticky top-0 p-4 lg:p-5">
              <Card className="rounded-xl border-slate-800 bg-slate-900 shadow-none">
                <CardContent className="p-4">
                  <h2 className="text-base font-bold text-white">Kurs dasturi</h2>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                    <span>14 / 32 dars tugallandi</span>
                    <span className="font-semibold text-blue-400">62%</span>
                  </div>
                  <div className="mt-2"><ProgressBar value={62} /></div>
                  <div className="mt-4 space-y-1">
                    {modules.map((mod) => (
                      <div key={mod.id}>
                        <button onClick={() => toggleModule(mod.id)} className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-slate-800">
                          <div>
                            <p className="text-sm font-semibold text-white">{mod.title}</p>
                            <p className="mt-0.5 text-xs text-slate-500">{mod.completedInfo}</p>
                          </div>
                          {openModules[mod.id] ? <ChevronUp className="size-4 shrink-0 text-slate-500" /> : <ChevronDown className="size-4 shrink-0 text-slate-500" />}
                        </button>
                        {openModules[mod.id] && mod.lessons.length > 0 && (
                          <div className="ml-1 space-y-0.5 pb-2">
                            {mod.lessons.map((lesson) => (
                              <div key={lesson.id} className={cn("flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm", lesson.status === "current" ? "bg-slate-800 text-blue-400" : lesson.status === "completed" ? "text-slate-300" : "text-slate-600")}>
                                {lesson.status === "completed" ? <Check className="size-4 shrink-0 text-emerald-500" /> : lesson.status === "current" ? <Play className="size-4 shrink-0 fill-blue-400 text-blue-400" /> : <Lock className="size-4 shrink-0 text-slate-600" />}
                                <span className="flex-1 truncate">{lesson.title}</span>
                                <span className="shrink-0 text-xs text-slate-500">{lesson.duration}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
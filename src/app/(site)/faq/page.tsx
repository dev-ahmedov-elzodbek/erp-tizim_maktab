"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const categories = [
  "Umumiy",
  "Kurslar",
  "To'lov",
  "Sertifikat",
  "Texnik",
] as const;

type Category = (typeof categories)[number];

interface FaqItem {
  question: string;
  answer: string;
  category: Category;
}

const faqItems: FaqItem[] = [
  {
    question: "Darslar qanday formatda bo'ladi?",
    answer:
      "Darslar onlayn va offlayn formatda o'tkaziladi. Onlayn darslar Zoom orqali real vaqtda bo'lib o'tadi, offlayn darslar esa zamonaviy jihozlangan auditoriyalarda o'tkaziladi. Barcha darslar yozib olinadi va shaxsiy kabinetingizda saqlanadi.",
    category: "Umumiy",
  },
  {
    question: "O'quv markaz qanday kurslarni taklif etadi?",
    answer:
      "Biz 35+ ta yo'nalishda kurslar taklif etamiz: Frontend (JavaScript, React, Vue), Backend (Node.js, Python, Java), Mobil dasturlash (Flutter, React Native), UX/UI dizayn, Data Science, DevOps, va raqamli marketing. Har bir kurs boshlang'ich, o'rta va ilg'or darajalar uchun mavjud.",
    category: "Kurslar",
  },
  {
    question: "Birinchi darsga bepul qatnashish mumkinmi?",
    answer:
      "Ha, albatta! Har bir kursning birinchi darsi mutlaqo bepul. Siz darsga qatnashib, o'qituvchi bilan tanishib, kurs dasturini ko'rib chiqishingiz mumkin. Buning uchun saytimizdan ro'yxatdan o'ting va kerakli kursni tanlang.",
    category: "Umumiy",
  },
  {
    question: "O'quv markaz qayerda joylashgan?",
    answer:
      "Bizning asosiy ofisimiz Toshkent shahri, Chilonzor tumani, Bunyodkor ko'chasi 15-uyda joylashgan. Metro bekatidan 5 daqiqalik piyoda masofada. Bundan tashqari, barcha kurslarimiz onlayn formatda ham mavjud.",
    category: "Umumiy",
  },
  {
    question: "Kurs narxi qancha va to'lov qanday amalga oshiriladi?",
    answer:
      "Kurs narxlari yo'nalishga qarab 490 000 so'mdan 1 490 000 so'mgacha. To'lovni bir marotaba yoki bo'lib-bo'lib to'lash mumkin. Biz Payme, Click, Uzum Bank orqali onlayn to'lovni qabul qilamiz. Talabalar uchun 15% chegirma mavjud.",
    category: "To'lov",
  },
  {
    question: "Kurs tugagandan keyin sertifikat beriladimi?",
    answer:
      "Ha, kursni muvaffaqiyatli tamomlaganlar O'quv Markaz tomonidan tasdiqlanagan sertifikat olishadi. Sertifikat elektron va qog'oz shaklda beriladi. Ba'zi kurslarda xalqaro sertifikatlash imkoniyati ham mavjud (AWS, Google, Meta).",
    category: "Sertifikat",
  },
  {
    question: "Dars materiallariga qancha vaqt kirish mumkin?",
    answer:
      "Kurs davomida va kurs tugaganidan keyin 1 yil mobaynida barcha dars materiallariga, video yozuvlarga va amaliy topshiriqlarga kirish mumkin. Premium paketda umrbod kirish imkoniyati beriladi.",
    category: "Kurslar",
  },
  {
    question: "Texnik muammolar yuzaga kelsa kimga murojaat qilaman?",
    answer:
      "Texnik yordam 24/7 rejimida ishlaydi. Telegram bot (@oquvmarkaz_support) orqali yoki support@oquvmarkaz.uz elektron pochtasiga yozing. Odatda 30 daqiqa ichida javob beramiz.",
    category: "Texnik",
  },
  {
    question: "Kursni yarim yo'lda tashlab ketsa pulim qaytariladimi?",
    answer:
      "Ha, birinchi 7 kun ichida to'liq pulni qaytaramiz (100% kafolat). 7-30 kun orasida 50% qaytariladi. 30 kundan keyin qaytarish amalga oshirilmaydi. Batafsil ma'lumot shartnomada ko'rsatilgan.",
    category: "To'lov",
  },
  {
    question: "Kursda ishtirok etish uchun kompyuterga qanday talablar qo'yiladi?",
    answer:
      "Asosiy talablar: kamida 8 GB RAM, 256 GB SSD, Intel i5 yoki undan yuqori protsessor. Internetning tezligi kamida 10 Mbps bo'lishi tavsiya etiladi. Dizayn kurslari uchun MacBook tavsiya etiladi, lekin shart emas.",
    category: "Texnik",
  },
];

export default function FaqPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("Umumiy");

  const filtered = faqItems.filter((item) => {
    const matchesCategory = item.category === category;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      q === "" ||
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  return (
    <div>
      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            FAQ
          </p>
          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {"Ko'p so'raladigan savollar"}
          </h1>
          <p className="mt-4 text-muted-foreground">
            {"Quyida eng ko'p beriladigan savollarga javob topishingiz mumkin. Agar javob topolmasangiz, biz bilan bog'laning."}
          </p>

          {/* Search */}
          <div className="relative mx-auto mt-8 max-w-lg">
            <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Savolni qidiring..."
              className="h-12 rounded-xl pl-12 text-base shadow-sm"
              aria-label="Savolni qidirish"
            />
          </div>
        </div>
      </section>

      {/* Categories + FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-medium transition-colors",
                category === cat
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="mt-8">
          {filtered.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">
              {"Bu bo'limda hech qanday savol topilmadi."}
            </p>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {filtered.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-base font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 p-8 text-center sm:p-12">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-white shadow-md">
            <MessageCircle className="size-6 text-primary" />
          </div>
          <h2 className="mt-5 font-heading text-xl font-bold">
            Javob topolmadingizmi?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            {"Bizning qo'llab-quvvatlash jamoamiz sizga yordam berishga tayyor. Xabar yozing yoki qo'ng'iroq qiling."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/aloqa">Xabar yozish</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="tel:+998901234567">
                {"Qo'ng'iroq qilish"}
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            +998 99 711 7676
          </p>
        </div>
      </section>
    </div>
  );
}

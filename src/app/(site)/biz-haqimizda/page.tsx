import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Building2,
  Eye,
  GraduationCap,
  Target,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { teachers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Biz haqimizda — O'quv Markaz",
  description:
    "O'quv Markaz — 2015-yildan beri Toshkentda IT va dizayn ta'limini rivojlantirib kelayotgan zamonaviy o'quv markazi.",
};

const milestones = [
  {
    year: "2015",
    title: "Boshlanish",
    text: "Kichik ofisda 2 ta o'qituvchi va 15 ta talaba bilan birinchi JavaScript kursimizni ochdik.",
  },
  {
    year: "2017",
    title: "Birinchi muvaffaqiyat",
    text: "100 dan ortiq bitiruvchimiz IT kompaniyalarga ishga joylashdi. Dizayn va backend yo'nalishlari qo'shildi.",
  },
  {
    year: "2019",
    title: "Yangi filial",
    text: "Talabalar soni o'sishi bilan Toshkent markazida zamonaviy jihozlangan yangi binoga ko'chdik.",
  },
  {
    year: "2022",
    title: "Onlayn platforma",
    text: "O'z onlayn ta'lim platformamizni ishga tushirdik — endi darslar yozuvlari va materiallar doim qo'l ostida.",
  },
  {
    year: "2026",
    title: "Bugun",
    text: "5 000+ bitiruvchi, 42 ta o'qituvchi va 35+ kurs bilan O'zbekistondagi yetakchi IT ta'lim markazlaridan biriga aylandik.",
  },
];

const achievements = [
  { icon: GraduationCap, value: "5 000+", label: "Bitiruvchi" },
  { icon: Award, value: "2 000+", label: "Sertifikat" },
  { icon: Building2, value: "100+", label: "Hamkor kompaniya" },
  { icon: Trophy, value: "10+", label: "Yillik tajriba" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Biz haqimizda
            </p>
            <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Bizning hikoyamiz
            </h1>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              2015-yilda kichik bir auditoriyada boshlangan, bugun
              O&rsquo;zbekistondagi eng yirik onlayn IT va dizayn ta&rsquo;lim
              platformalaridan biriga aylandi. 10 yil ichida 5000+ talabani
              bitirib, ularning hayotini o&rsquo;zgartirishga ulush
              qo&rsquo;shdik.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Bizning maqsad — har bir o&rsquo;zbek yoshining zamonaviy mehnat
              bozorida muvaffaqiyatli o&rsquo;rin egallashiga yordam berish.
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-lg">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=80"
                alt="Online o'quv platformasi jamoasi"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Maqsad va orzu
          </p>
          <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            Missiya va vizyonimiz
          </h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="flex flex-col gap-3 p-6">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Target className="size-5" />
              </div>
              <h3 className="font-heading text-lg font-semibold">Missiyamiz</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                O&rsquo;zbek yoshlariga zamonaviy IT va dizayn sohalarida
                sifatli, amaliy va keng qamrovli ta&rsquo;lim berish. Har bir
                bitiruvchi mehnat bozorida raqobatbardosh mutaxassis sifatida
                o&rsquo;rin egallashi.
              </p>
            </CardContent>
          </Card>
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="flex flex-col gap-3 p-6">
              <div className="flex size-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                <Eye className="size-5" />
              </div>
              <h3 className="font-heading text-lg font-semibold">Vizyonimiz</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                2030-yilga borib Markaziy Osiyodagi eng nufuzli IT ta&rsquo;lim
                platformalaridan biriga aylanish. 50 000+ bitiruvchiga ega
                bo&rsquo;lish va xalqaro miqyosda tan olinish.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-y bg-slate-50/60">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              10 yil safarimiz
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              Tarixiy bosqichlar
            </h2>
          </div>
          <div className="relative mt-12">
            <div className="absolute top-0 bottom-0 left-[44px] hidden w-px bg-border sm:block" />
            <div className="flex flex-col gap-8">
              {milestones.map((m) => (
                <div key={m.year} className="flex flex-col gap-3 sm:flex-row sm:gap-8">
                  <div className="relative shrink-0 sm:w-[88px] sm:text-right">
                    <span className="text-2xl font-bold text-primary">
                      {m.year}
                    </span>
                  </div>
                  <Card className="flex-1 transition-shadow hover:shadow-md">
                    <CardContent className="p-5">
                      <h3 className="font-semibold">{m.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {m.text}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Jamoa
          </p>
          <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            Bizning jamoa
          </h2>
          <p className="mt-3 text-muted-foreground">
            Har kuni sizning muvaffaqiyatingiz uchun ishlaydigan mutaxassislar
            bilan tanishing.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {teachers.map((member) => (
            <Link key={member.id} href={`/oqituvchilar/${member.id}`}>
              <Card className="group gap-0 overflow-hidden p-0 transition-shadow hover:shadow-md">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={member.avatar.replace("/150", "/400")}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="text-sm font-semibold">{member.name}</h3>
                  <p className="mt-0.5 text-xs text-primary">{member.role}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="border-y bg-slate-50/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Natijalar
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              Faxrimiz bo&rsquo;lgan yutuqlar
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {achievements.map((item) => (
              <Card key={item.label} className="text-center transition-shadow hover:shadow-md">
                <CardContent className="flex flex-col items-center gap-3 p-6">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                    <item.icon className="size-6" />
                  </div>
                  <p className="text-2xl font-bold">{item.value}</p>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-14 text-center sm:px-12">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Hoziroq o&rsquo;z kelajagingizni boshlang
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-blue-100">
            Siz qiziqtirayotgan yo&rsquo;nalishni tanlang va bepul darsga
            yoziling. 5 000+ bitiruvchi safiga qo&rsquo;shiling!
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              className="h-11 bg-white px-6 text-primary hover:bg-blue-50"
              asChild
            >
              <Link href="/kurslar">Kurslarni ko&rsquo;rish</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 border-white/40 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href="/aloqa">Biz bilan bog&rsquo;lanish</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

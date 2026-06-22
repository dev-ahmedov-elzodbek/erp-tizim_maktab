import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  DollarSign,
  Gift,
  GraduationCap,
  Users,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Narxlar — O'quv Markaz",
};

const plans = [
  {
    name: "Boshlovchi",
    description: "Noldan boshlovchilar uchun kurslar",
    price: "390 000",
    popular: false,
    features: [
      "Barcha video darslarga to'liq kirish",
      "Online chat orqali qo'llab-quvvatlash",
      "Uyga vazifalar tekshiruvi",
      "Video darslar arxivi",
      "Kurs sertifikati",
    ],
  },
  {
    name: "Mashhur",
    description: "Eng ko'p tanlanadigan kasbiy kurslar",
    price: "590 000",
    popular: true,
    features: [
      "Barcha video darslar + bonus materiallar",
      "Haftalik jonli online sessiyalar",
      "Shaxsiy mentor (haftada 1 soat, online)",
      "Portfolio loyihalari ustida ishlash",
      "Ishga joylashishda yordam",
      "Kurs sertifikati",
    ],
  },
  {
    name: "Kasbiy",
    description: "Kasb egallash uchun to'liq dasturlar",
    price: "890 000",
    popular: false,
    features: [
      "Haftasiga 3 ta individual online dars",
      "Moslashuvchan dars jadvali",
      "Shaxsiy o'quv dasturi",
      "24/7 mentor bilan aloqa",
      "Ishga joylashishda yordam",
      "Kurs sertifikati",
    ],
  },
];

const discounts = [
  {
    icon: DollarSign,
    percent: "-15%",
    title: "Oldindan to'lov",
    description: "Kursning to'liq narxini bir martada to'lasangiz.",
  },
  {
    icon: Users,
    percent: "-10%",
    title: "Aka-uka va opa-singillar",
    description: "Bir oiladan ikki yoki undan ortiq talaba o'qisa.",
  },
  {
    icon: GraduationCap,
    percent: "-10%",
    title: "Talabalar uchun",
    description: "OTM talabasi ekanligingizni tasdiqlovchi hujjat bilan.",
  },
  {
    icon: Gift,
    percent: "-5%",
    title: "Do'stingni olib kel",
    description: "Siz ham, do'stingiz ham birinchi oyga chegirma olasiz.",
  },
];

const comparisonFeatures = [
  { label: "Jonli online sessiyalar", boshlovchi: "—", mashhur: "Haftada 1", kasbiy: "Haftada 3 (shaxsiy)" },
  { label: "Mentor qo'llab-quvvatlovi", boshlovchi: "Chat", mashhur: "Shaxsiy mentor", kasbiy: "24/7 yakkama-yakka" },
  { label: "Video darslar arxivi", boshlovchi: true, mashhur: true, kasbiy: true },
  { label: "Shaxsiy mentor", boshlovchi: "—", mashhur: true, kasbiy: true },
  { label: "Portfolio loyihalari", boshlovchi: "—", mashhur: true, kasbiy: true },
  { label: "Ishga joylashishda yordam", boshlovchi: "—", mashhur: true, kasbiy: true },
  { label: "Moslashuvchan jadval", boshlovchi: "—", mashhur: "—", kasbiy: true },
  { label: "Sertifikat", boshlovchi: true, mashhur: true, kasbiy: true },
  { label: "Narx (bir martalik)", boshlovchi: "390 000 so'mdan", mashhur: "590 000 so'mdan", kasbiy: "890 000 so'mdan" },
];

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="mx-auto size-5 text-emerald-600" />;
  return <span>{value}</span>;
}

export default function PricingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <Breadcrumb className="flex justify-center">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Bosh sahifa</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Narxlar</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="mt-6 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Har bir kurs uchun adolatli narx
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Har kurs — bir martalik to&rsquo;lov va umrbod kirish. Yashirin
            to&rsquo;lovlar yo&rsquo;q, demo darslar bepul. Quyida darajalar
            bo&rsquo;yicha narxlar.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="bg-slate-50/60">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative overflow-hidden transition-shadow hover:shadow-lg ${
                  plan.popular
                    ? "border-primary shadow-md ring-1 ring-primary"
                    : "border-slate-200"
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute top-0 right-0 left-0 mx-auto w-fit -translate-y-0 rounded-b-lg rounded-t-none bg-primary px-4 py-1 text-xs">
                    Eng mashhur
                  </Badge>
                )}
                <CardContent className={`p-6 ${plan.popular ? "pt-10" : ""}`}>
                  <h3 className="font-heading text-lg font-semibold">{plan.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>

                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="font-heading text-3xl font-bold">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{"so'mdan"}</span>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className="mt-8 w-full"
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    <Link href="/kurslar">Kurslarni ko&rsquo;rish</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Har bir kurs alohida sotib olinadi —{" "}
            <Link href="/kurslar" className="text-primary underline">
              bir martalik narxni shu yerda ko&rsquo;ring
            </Link>
            . Narxlar darajaga qarab boshlang&rsquo;ich qiymatdan; aniq narx
            kurs sahifasida ko&rsquo;rsatilgan.
          </p>
        </div>
      </section>

      {/* Discounts */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Chegirmalar
          </p>
          <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            Kamroq to&rsquo;lash yo&rsquo;llari
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Chegirmalar bir-biri bilan qo&rsquo;shilmaydi — eng kattasi
            qo&rsquo;llanadi.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {discounts.map((d) => (
            <Card key={d.title} className="transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex size-10 items-center justify-center rounded-lg bg-slate-100">
                  <d.icon className="size-5 text-slate-600" />
                </div>
                <p className="mt-4 font-heading text-2xl font-bold text-primary">
                  {d.percent}
                </p>
                <h3 className="mt-1 text-sm font-semibold">{d.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {d.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="border-y bg-slate-50/60">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              Darajalarni taqqoslash
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Har bir daraja kurslarida nima borligini batafsil ko&rsquo;ring.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <th className="py-3 text-left font-semibold">Imkoniyat</th>
                  <th className="py-3 text-center font-semibold">Boshlovchi</th>
                  <th className="py-3 text-center font-semibold text-primary">Mashhur</th>
                  <th className="py-3 text-center font-semibold">Kasbiy</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row) => (
                  <tr key={row.label} className="border-b last:border-0">
                    <td className="py-3.5 text-left text-sm">{row.label}</td>
                    <td className="py-3.5 text-center text-sm text-muted-foreground">
                      <CellValue value={row.boshlovchi} />
                    </td>
                    <td className="py-3.5 text-center text-sm text-muted-foreground">
                      <CellValue value={row.mashhur} />
                    </td>
                    <td className="py-3.5 text-center text-sm text-muted-foreground">
                      <CellValue value={row.kasbiy} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="border-slate-200">
          <CardContent className="flex flex-col items-center justify-between gap-6 p-6 sm:flex-row sm:p-8">
            <div>
              <h3 className="font-heading text-lg font-bold">
                Qaysi kursni tanlashni bilmayapsizmi?
              </h3>
              <p className="mt-1.5 max-w-lg text-sm text-muted-foreground">
                Bepul demo darslarni oching — mentor uslubi va dastur bilan
                tanishib, o&rsquo;zingizga mos kursni tanlaysiz.
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <Button asChild>
                <Link href="/kurslar">Bepul demo darslar</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/aloqa">Konsultatsiya olish</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

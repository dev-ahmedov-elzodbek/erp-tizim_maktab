import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Award,
  Briefcase,
  Calendar,
  MessageSquare,
  Send,
  Star,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  teachers,
  courses as allCourses,
} from "@/lib/data";
import { TeacherCard } from "@/components/site/teacher-card";

export function generateStaticParams() {
  return teachers.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const teacher = teachers.find((t) => t.id === id);
  return {
    title: teacher
      ? `${teacher.name} — O'quv Markaz`
      : "O'qituvchi topilmadi",
  };
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="text-center">
      <p className="font-heading text-xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

export default async function TeacherProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const teacher = teachers.find((t) => t.id === id);
  if (!teacher) notFound();

  const teacherCourses = allCourses.filter((c) => c.teacherId === teacher.id);
  const otherTeachers = teachers.filter((t) => t.id !== teacher.id).slice(0, 3);
  const reviewCount = teacherCourses.reduce((s, c) => s + c.reviews, 0) || 186;

  return (
    <div>
      {/* Hero */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Bosh sahifa</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/oqituvchilar">{"O'qituvchilar"}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{teacher.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Profile header */}
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="relative size-32 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-lg sm:size-36">
              <Image
                src={teacher.avatar}
                alt={teacher.name}
                fill
                className="object-cover"
                sizes="144px"
              />
            </div>

            <div className="flex-1">
              <Badge variant="outline" className="mb-2 border-blue-200 bg-blue-50 text-xs font-semibold uppercase tracking-wider text-blue-700">
                {teacher.role}
              </Badge>
              <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                {teacher.name}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {teacher.bio}
              </p>

              {/* Stats */}
              <div className="mt-4 flex items-center gap-6">
                <Stat value={teacher.courses} label="Kurs" />
                <Stat value={`${teacher.students}+`} label="Talaba" />
                <Stat value={teacher.rating} label="Reyting" />
                {teacher.experience && (
                  <Stat value={`${teacher.experience} yil`} label="Tajriba" />
                )}
              </div>

              {/* Buttons */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button size="lg">Darsga yozilish</Button>
                <Button variant="outline" size="lg">
                  <MessageSquare className="mr-2 size-4" />
                  Savol berish
                </Button>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="size-9">
                    <Send className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="size-9">
                    <Star className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs + Sidebar */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="haqida" className="w-full">
              <TabsList className="h-auto w-full justify-start gap-0 rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="haqida"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Haqida
                </TabsTrigger>
                <TabsTrigger
                  value="kurslar"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Kurslari ({teacherCourses.length})
                </TabsTrigger>
                <TabsTrigger
                  value="sharhlar"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Sharhlar ({reviewCount})
                </TabsTrigger>
              </TabsList>

              {/* Haqida tab */}
              <TabsContent value="haqida" className="mt-8 space-y-8">
                {/* Bio */}
                <div>
                  <h2 className="font-heading text-lg font-semibold text-primary">
                    {"O'qituvchi haqida"}
                  </h2>
                  <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                    {teacher.fullBio ? (
                      teacher.fullBio.map((p, i) => <p key={i}>{p}</p>)
                    ) : (
                      <p>{teacher.bio}</p>
                    )}
                  </div>
                </div>

                <hr />

                {/* Skills */}
                {teacher.skills && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground italic">
                      {"Ko'nikmalar"}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {teacher.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Work history */}
                {teacher.workHistory && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground italic">
                      Ish tajribasi
                    </h3>
                    <div className="relative mt-4 space-y-6 border-l-2 border-slate-200 pl-6">
                      {teacher.workHistory.map((job, i) => (
                        <div key={i} className="relative">
                          <div className={`absolute -left-[31px] top-1 size-3 rounded-full border-2 border-white ${job.current ? "bg-blue-600" : "bg-slate-400"}`} />
                          <p className={`text-xs font-bold ${job.current ? "text-blue-600" : "text-slate-500"}`}>
                            {job.period}
                          </p>
                          <h4 className="mt-1 text-sm font-semibold text-primary">
                            {job.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">{job.company}</p>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {job.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Kurslar tab */}
              <TabsContent value="kurslar" className="mt-8">
                {teacherCourses.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {teacherCourses.map((course) => (
                      <Link key={course.slug} href={`/kurslar/${course.slug}`}>
                        <Card className="transition-shadow hover:shadow-md">
                          <CardContent className="p-4">
                            <Badge variant="secondary" className="text-xs">{course.category}</Badge>
                            <h3 className="mt-2 font-heading text-sm font-semibold">{course.title}</h3>
                            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{course.excerpt}</p>
                            <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                              <span>{course.durationMonths} oy</span>
                              <span>{course.totalLessons} dars</span>
                              <span className="flex items-center gap-0.5">
                                <Star className="size-3 fill-amber-400 text-amber-400" />
                                {course.rating}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="py-10 text-center text-sm text-muted-foreground">
                    {"Hozircha kurslar qo'shilmagan."}
                  </p>
                )}
              </TabsContent>

              {/* Sharhlar tab */}
              <TabsContent value="sharhlar" className="mt-8">
                <p className="py-10 text-center text-sm text-muted-foreground">
                  Sharhlar tez orada qo&apos;shiladi.
                </p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Certificates */}
            {teacher.certificates && teacher.certificates.length > 0 && (
              <Card>
                <CardContent className="p-5">
                  <h3 className="font-heading text-sm font-semibold">Sertifikatlar</h3>
                  <div className="mt-4 space-y-4">
                    {teacher.certificates.map((cert, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-50">
                          <Award className="size-4 text-red-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{cert.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {cert.issuer}, {cert.year}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Schedule */}
            {teacher.schedule && teacher.schedule.length > 0 && (
              <Card>
                <CardContent className="p-5">
                  <h3 className="font-heading text-sm font-semibold flex items-center gap-2">
                    <Calendar className="size-4 text-muted-foreground" />
                    Dars beradigan vaqtlari
                  </h3>
                  <div className="mt-4 space-y-0 divide-y">
                    {teacher.schedule.map((s, i) => (
                      <div key={i} className="flex items-center justify-between py-2.5 text-sm">
                        <span className="font-medium">{s.days}</span>
                        <span className="text-muted-foreground">{s.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* CTA card */}
            <Card className="border-blue-100 bg-blue-50/50">
              <CardContent className="p-5 text-center">
                <Briefcase className="mx-auto size-8 text-blue-600" />
                <h3 className="mt-3 font-heading text-base font-semibold">
                  {teacher.name.split(" ")[0]} bilan o&apos;qishni boshlang
                </h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  Yangi guruh 1-iyul kuni boshlanadi. Joylar soni cheklangan.
                </p>
                <Button className="mt-4 w-full" size="lg">
                  Kursga yozilish
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Other teachers */}
      <section className="border-t bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold">
            Boshqa o&apos;qituvchilar
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Jamoamizning boshqa mutaxassislari bilan ham tanishing.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherTeachers.map((t) => (
              <TeacherCard key={t.id} teacher={t} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

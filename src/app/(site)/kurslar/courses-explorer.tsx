"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CourseCard } from "@/components/site/course-card";
import { courses, type Category } from "@/lib/data";
import { cn } from "@/lib/utils";

const allCategories = Array.from(
  courses.reduce((map, c) => {
    map.set(c.category, (map.get(c.category) ?? 0) + 1);
    return map;
  }, new Map<Category, number>())
);

const levels = ["Barchasi", "Boshlovchi", "O'rtacha", "Mutaxassis"] as const;

const durationOptions = [
  { label: "1-3 oy", min: 1, max: 3 },
  { label: "3-6 oy", min: 4, max: 6 },
  { label: "6+ oy", min: 7, max: 99 },
];

const sortOptions = [
  { value: "popular", label: "Eng mashhur" },
  { value: "price-asc", label: "Narx: arzondan" },
  { value: "price-desc", label: "Narx: qimmatdan" },
  { value: "rating", label: "Reyting" },
];

export function CoursesExplorer() {
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [level, setLevel] = useState<(typeof levels)[number]>("Barchasi");
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [priceMinDraft, setPriceMinDraft] = useState("");
  const [priceMaxDraft, setPriceMaxDraft] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [sort, setSort] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const toggleCategory = (cat: Category) =>
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );

  const toggleDuration = (label: string) =>
    setSelectedDurations((prev) =>
      prev.includes(label) ? prev.filter((d) => d !== label) : [...prev, label]
    );

  const applyPrice = () => {
    const min = Number(priceMinDraft) || 0;
    const max = Number(priceMaxDraft) || Number.MAX_SAFE_INTEGER;
    setPriceRange(priceMinDraft === "" && priceMaxDraft === "" ? null : [min, max]);
    setShowFilters(false);
  };

  const resetFilters = () => {
    setQuery("");
    setSelectedCategories([]);
    setLevel("Barchasi");
    setSelectedDurations([]);
    setPriceMinDraft("");
    setPriceMaxDraft("");
    setPriceRange(null);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = courses.filter((c) => {
      if (q && !c.title.toLowerCase().includes(q) && !c.excerpt.toLowerCase().includes(q)) return false;
      if (selectedCategories.length > 0 && !selectedCategories.includes(c.category)) return false;
      if (level !== "Barchasi" && c.level !== level) return false;
      if (priceRange && (c.price < priceRange[0] || c.price > priceRange[1])) return false;
      if (selectedDurations.length > 0) {
        const matches = durationOptions
          .filter((d) => selectedDurations.includes(d.label))
          .some((d) => c.durationMonths >= d.min && c.durationMonths <= d.max);
        if (!matches) return false;
      }
      return true;
    });

    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "rating":
        return [...list].sort((a, b) => b.rating - a.rating);
      default:
        return [...list].sort((a, b) => b.reviews - a.reviews);
    }
  }, [query, selectedCategories, level, selectedDurations, priceRange, sort]);

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <aside>
        <Button
          variant="outline"
          className="mb-4 w-full lg:hidden"
          onClick={() => setShowFilters((v) => !v)}
        >
          <SlidersHorizontal data-icon="inline-start" />
          {showFilters ? "Filtrlarni yashirish" : "Filtr"}
        </Button>

        <Card
          className={cn(
            "h-fit lg:sticky lg:top-20 lg:block",
            showFilters ? "block" : "hidden"
          )}
        >
          <CardContent className="flex flex-col gap-5">
            <div>
              <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Kategoriya
              </h3>
              <div className="mt-3 flex flex-col gap-2.5">
                {allCategories.map(([cat, count]) => (
                  <Label
                    key={cat}
                    className="flex cursor-pointer items-center gap-2 font-normal"
                  >
                    <Checkbox
                      checked={selectedCategories.includes(cat)}
                      onCheckedChange={() => toggleCategory(cat)}
                    />
                    <span className="flex-1">{cat}</span>
                    <span className="text-xs text-muted-foreground">
                      ({count})
                    </span>
                  </Label>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Daraja
              </h3>
              <div className="mt-3 flex flex-col gap-2.5">
                {levels.map((l) => (
                  <Label
                    key={l}
                    className="flex cursor-pointer items-center gap-2 font-normal"
                  >
                    <input
                      type="radio"
                      name="level"
                      checked={level === l}
                      onChange={() => setLevel(l)}
                      className="size-4 accent-primary"
                    />
                    {l}
                  </Label>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {"Narx oralig'i (so'm)"}
              </h3>
              <div className="mt-3 flex items-center gap-2">
                <Input
                  inputMode="numeric"
                  placeholder="400 000"
                  value={priceMinDraft}
                  onChange={(e) => setPriceMinDraft(e.target.value)}
                  aria-label="Minimal narx"
                />
                <span className="text-muted-foreground">—</span>
                <Input
                  inputMode="numeric"
                  placeholder="2 000 000"
                  value={priceMaxDraft}
                  onChange={(e) => setPriceMaxDraft(e.target.value)}
                  aria-label="Maksimal narx"
                />
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Davomiyligi
              </h3>
              <div className="mt-3 flex flex-col gap-2.5">
                {durationOptions.map((d) => (
                  <Label
                    key={d.label}
                    className="flex cursor-pointer items-center gap-2 font-normal"
                  >
                    <Checkbox
                      checked={selectedDurations.includes(d.label)}
                      onCheckedChange={() => toggleDuration(d.label)}
                    />
                    {d.label}
                  </Label>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1" onClick={applyPrice}>
                Filtrlash
              </Button>
              <Button variant="outline" className="flex-1" onClick={resetFilters}>
                Tozalash
              </Button>
            </div>
          </CardContent>
        </Card>
      </aside>

      {/* Results */}
      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Kurs nomini qidiring..."
              className="pl-9"
              aria-label="Kurs qidirish"
            />
          </div>
          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <p className="text-sm text-muted-foreground">
              {filtered.length} ta kurs topildi
            </p>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger aria-label="Saralash" className="w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">
            {"Hech qanday kurs topilmadi. Filtrlarni o'zgartirib ko'ring."}
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        )}

        <Pagination className="mt-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" text="" className="pr-1.5!" />
            </PaginationItem>
            {[1, 2, 3].map((page) => (
              <PaginationItem key={page}>
                <PaginationLink href="#" isActive={page === 1}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">8</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" text="" className="pl-1.5!" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

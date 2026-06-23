"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  CircleAlert,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { SocialAuth } from "@/components/auth/social-auth";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?\d{9,12}$/;

const validInput =
  "border-emerald-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/25";
const invalidInput =
  "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ identifier: false, password: false });
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const identifierIsPhone = PHONE_RE.test(identifier.replace(/[\s-]/g, ""));
  const identifierValid = EMAIL_RE.test(identifier) || identifierIsPhone;
  const passwordValid = password.length >= 8;

  const showIdentifierValid = identifier.length > 0 && identifierValid;
  const showIdentifierError =
    touched.identifier && identifier.length > 0 && !identifierValid;
  const showPasswordError = touched.password && password.length > 0 && !passwordValid;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ identifier: true, password: true });
    setApiError("");

    if (!identifierValid || !passwordValid) return;

    setLoading(true);

    const isAdmin = identifier === "admin@oquvmarkaz.uz" && password === "admin2026";
    const role = isAdmin ? "admin" : "student";

    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payload = btoa(JSON.stringify({
      sub: isAdmin ? "admin-user" : "demo-user",
      name: isAdmin ? "Administrator" : identifier.split("@")[0],
      role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 86400,
    }));
    const fakeToken = `${header}.${payload}.demo-signature`;

    localStorage.setItem("accessToken", fakeToken);
    document.cookie = `accessToken=${fakeToken}; path=/; max-age=86400; SameSite=Lax`;

    setTimeout(() => {
      setLoading(false);
      router.push(isAdmin ? "/admin" : "/student");
    }, 500);
  }

  return (
    <AuthShell
      heading={
        <>
          Bilim — kelajakka eng
          <br />
          yaxshi sarmoyadir.
        </>
      }
      description="5000+ bitiruvchi bizning oilamiz tarkibida. Endi navbat sizniki. Bilim olishni davom ettiring va karyera maqsadlaringizga yeting."
      bullets={[
        "Onlayn platforma — istalgan vaqtda darslar",
        "Mentor bilan to'g'ridan-to'g'ri aloqa",
        "Davlat tomonidan tan olingan sertifikat",
      ]}
    >
      <div className="space-y-6">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight">Hisobingizga kiring</h1>
          <p className="text-sm text-muted-foreground">
            Ma&rsquo;lumotlaringizni kiriting va o&rsquo;quv jarayonini davom
            ettiring.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="space-y-2">
            <Label htmlFor="identifier">Email yoki telefon raqam</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="identifier"
                type="email"
                placeholder="aziz@example.uz"
                autoComplete="username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, identifier: true }))}
                className={cn(
                  "h-11 pl-9",
                  showIdentifierValid && validInput,
                  showIdentifierError && invalidInput
                )}
              />
            </div>
            {showIdentifierValid && (
              <p className="flex items-center gap-1 text-xs text-emerald-600">
                <Check className="size-3.5" />
                {identifierIsPhone
                  ? "Telefon raqam to'g'ri formatda"
                  : "Email manzili to'g'ri formatda"}
              </p>
            )}
            {showIdentifierError && (
              <p className="flex items-center gap-1 text-xs text-destructive">
                <CircleAlert className="size-3.5" />
                Email yoki telefon raqamni to&rsquo;g&rsquo;ri kiriting
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Parol</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                className={cn(
                  "h-11 pr-10 pl-9",
                  showPasswordError && invalidInput
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {showPasswordError && (
              <p className="flex items-center gap-1 text-xs text-destructive">
                <CircleAlert className="size-3.5" />
                Parol kamida 8 ta belgidan iborat bo&rsquo;lishi kerak
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="font-normal text-muted-foreground">
                Meni eslab qol
              </Label>
            </div>
            <Link
              href="#"
              className="text-sm font-medium text-primary hover:underline"
            >
              Parolni unutdingizmi?
            </Link>
          </div>

          {apiError && (
            <p className="flex items-center gap-1.5 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              <CircleAlert className="size-4 shrink-0" />
              {apiError}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            className="h-11 w-full text-base"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                Kirish
                <ArrowRight data-icon="inline-end" />
              </>
            )}
          </Button>
        </form>

        <SocialAuth />

        <p className="text-center text-sm text-muted-foreground">
          Hisobingiz yo&rsquo;qmi?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Ro&rsquo;yxatdan o&rsquo;ting
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

export async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    if (
      (res.status === 401 || res.status === 403) &&
      typeof window !== "undefined" &&
      !path.startsWith("/auth/")
    ) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
      throw new Error("Sessiya tugadi, qayta kiring");
    }
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `API error ${res.status}`);
  }

  return res.json();
}

export async function login(identifier: string, password: string) {
  const data = await apiFetch<{
    data: {
      tokens: {
        accessToken: string;
        refreshToken: string;
      };
      user: Record<string, unknown>;
    };
  }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ identifier, password }),
  });

  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", data.data.tokens.accessToken);
    localStorage.setItem("refreshToken", data.data.tokens.refreshToken);
    document.cookie = `accessToken=${data.data.tokens.accessToken}; path=/; max-age=86400; SameSite=Lax`;
  }

  return data.data;
}

export async function logout() {
  try {
    await apiFetch("/auth/logout", { method: "POST" });
  } catch {
    // ignore
  }
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    document.cookie = "accessToken=; path=/; max-age=0";
  }
}

export function getPublicStats() {
  return apiFetch<{
    data: {
      students: number;
      teachers: number;
      courses: number;
      graduates: number;
    };
  }>("/public/stats");
}

export function getAdminStudents(params?: string) {
  return apiFetch<{ data: { items: unknown[]; total: number } }>(
    `/admin/students${params ? `?${params}` : ""}`,
  );
}

export function getAdminGroups(params?: string) {
  return apiFetch<{ data: { items: unknown[]; total: number } }>(
    `/admin/groups${params ? `?${params}` : ""}`,
  );
}

export function getFinanceKpis(year?: number) {
  const y = year || new Date().getFullYear();
  return apiFetch<{
    data: {
      year: number;
      revenue: number;
      expense: number;
      profit: number;
      profitPercent: number;
    };
  }>(`/admin/finance/kpis?year=${y}`);
}

export function getRevenueVsExpense(year?: number) {
  const y = year || new Date().getFullYear();
  return apiFetch<{
    data: {
      year: number;
      months: {
        month: number;
        monthName: string;
        revenue: number;
        expense: number;
      }[];
    };
  }>(`/admin/finance/revenue-vs-expense?year=${y}`);
}

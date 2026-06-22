import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <h1 className="text-8xl font-bold text-slate-200">404</h1>
      <h2 className="mt-4 text-2xl font-bold text-slate-900">Sahifa topilmadi</h2>
      <p className="mt-2 text-sm text-slate-500">
        {"Siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan."}
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
}
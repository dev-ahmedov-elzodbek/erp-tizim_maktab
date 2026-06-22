import type { Metadata } from "next";
import { StudentSidebar } from "@/components/student/student-sidebar";
import { StudentTopbar } from "@/components/student/student-topbar";

export const metadata: Metadata = {
  title: "Talaba paneli",
};

export default function StudentLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-svh bg-slate-50">
      <StudentSidebar />
      <div className="flex min-h-svh flex-col lg:pl-64">
        <StudentTopbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

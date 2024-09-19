import Sidenav from "@/app/ui/dashboard/sidenav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
    <div className="min-h-screen flex flex-col bg-teal-50">
      <Sidenav />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
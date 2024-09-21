import Sidenav from "@/app/ui/dashboard/sidenav";
import Breadcrumb from "../ui/dashboard/breadcrumb";
import { backgroundColor } from "../ui/style-variants/variables";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
    <div className={`min-h-screen flex flex-col ${backgroundColor.primary}`}>
      <Sidenav />
      <Breadcrumb/>
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col">
        <div className={`w-full flex-grow max-w-4xl mx-auto rounded-lg shadow-lg overflow-hidden ${backgroundColor.neutral}`}>
          {children}
        </div>
      </main>
    </div>
  );
}
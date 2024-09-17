import Sidenav from "@/app/ui/dashboard/sidenav";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
    <div>
      <Sidenav />
      <main>{children}</main>
    </div>
  );
}
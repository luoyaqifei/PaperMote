import { backgroundColor } from "@/app/ui/style-variants/variables";
import BackgroundImage from "@/app/ui/components/background-image";
import { BreadCrumbs } from "../ui/components/breadcrumbs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`w-full h-full flex-grow flex flex-col ${backgroundColor.primary}`}
    >
      <BackgroundImage />
      <main
        className={`flex-grow px-8 py-4 flex flex-col w-full max-w-4xl my-4 mx-auto rounded-lg shadow-lg overflow-hidden ${backgroundColor.neutral} opacity-90`}
      >
        <BreadCrumbs>
          {children}
        </BreadCrumbs>
      </main>
    </div>
  );
}

import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>
    <Toaster toastOptions={{
      style: {
        background: "#e6f7f5",
        color: "#115e59",
        borderRadius: "0.5rem",
        padding: "1rem",
        fontSize: "1rem",
        fontFamily: "var(--font-geist-sans)",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        border: "1px solid #14b8a6",
      },
    }}/>
    {children}
    </NextUIProvider>;
}

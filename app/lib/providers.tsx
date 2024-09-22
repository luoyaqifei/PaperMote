import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>
    {MyToaster()}
    {children}
    </NextUIProvider>;
}

function MyToaster() {
  return <Toaster toastOptions={
    {
      success: {
        style: {
          color: "teal"
      },
    },
      error: {
        style: {
          color: "#FF0000" // Bright red for better visibility
        }
    },
    style: {
      borderRadius: "0.5rem",
      padding: "1rem",
      fontSize: "1rem",
      fontFamily: "var(--font-geist-sans)",
      // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      border: "1px solid #14b8a6",
    }
  }
      
  } />;
}
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/app/lib/providers";
import { alegreya } from "./ui/fonts";

export const metadata: Metadata = {
  title: "PaperMote",
  description: "Your Digital Reading Companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body
        className={`${alegreya.className} sans-serif antialiased`}
      >
        <Providers>
        {children}
        </Providers>
      </body>
    </html>
  );
}

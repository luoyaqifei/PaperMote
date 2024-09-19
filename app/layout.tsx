import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/app/lib/providers";
import { lusitana } from "./ui/fonts";

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
        className={`${lusitana.className} antialiased`}
      >
        <Providers>
        {children}
        </Providers>
      </body>
    </html>
  );
}

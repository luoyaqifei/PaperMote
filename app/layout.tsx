import "./globals.css";
import { Providers } from "@/app/lib/providers";
import { alegreya } from "@/app/ui/style-variants/fonts";
import { Image } from "@nextui-org/react";
import { backgroundColor, textColor } from "@/app/ui/style-variants/variables";
import { PresentationChartBarIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Sidenav from "@/app/ui/components/sidenav";
import type { Metadata, Viewport } from "next";

const APP_NAME = "PaperMote";
const APP_DEFAULT_TITLE = "PaperMote";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Your digital reading companion";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  icons: {
    shortcut: "/favicon.ico",
    apple: [{ url: "/logo.svg", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head />
      <body className={`${alegreya.className} sans-serif antialiased `}>
        <Providers>
          <div
            className={`flex flex-col w-full min-h-screen items-center justify-between max-w-full ${backgroundColor.neutral}`}
          >
            <Sidenav />
            {children}
            <footer
              className={`text-sm pt-4 pb-4 flex flex-col gap-2 w-full ${backgroundColor.neutral} opacity-90`}
            >
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="text-center mb-2 md:mb-0 mx-auto">
                  Copyright © 2024, All Rights Reserved. Powered By
                  <Link
                    href="https://gravatar.com/7c89d6c6dc42cde3db334389550b45217e30166138bc4a6ce18baeca148d7608"
                    className={
                      textColor.primary + " font-bold hover:underline mx-1"
                    }
                  >
                    Mingxia Z.
                  </Link>
                </div>
                <div className="flex flex-row gap-1 items-center px-4">
                  <Link href="https://www.linkedin.com/in/mxzeng/">
                    <Image
                      src="/linkedin-logo.png"
                      alt="LinkedIn"
                      width={24}
                      height={24}
                      className="rounded-none hover:scale-110"
                    />
                  </Link>
                  <Link href="https://luoyaqifei.github.io/PaperMote/">
                    <PresentationChartBarIcon
                      className="w-6 h-6 hover:scale-110"
                      width={24}
                      height={24}
                    />
                  </Link>
                  <Link href="https://github.com/luoyaqifei/PaperMote">
                    <Image
                      src="/github-mark.svg"
                      alt="GitHub"
                      width={24}
                      height={24}
                      className="rounded-none hover:scale-110"
                    />
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}

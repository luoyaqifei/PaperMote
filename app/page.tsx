import Link from "next/link";
import Instruction from "./ui/dashboard/Instruction";
import * as React from "react";


export default function App() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-8">
      <header className="text-2xl font-bold">
        Welcome to PaperMote
        <Link href="/dashboard/about-me">About Me</Link>
      </header>
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <Link href="/login" className="text-lg font-semibold">Login</Link>
        <Link href="/signup" className="text-lg font-semibold">Signup</Link>
        <Instruction />
      </main>
      <footer className="text-sm">
        <p>Powered by Next.js</p>
        <p>Copyright 2024 Mingxia Zeng</p>
      </footer>
    </div>
  );
}

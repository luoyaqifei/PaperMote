import Instruction from "@/app/ui/dashboard/instruction";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { button } from "./ui/style-variants/button";
import { headline } from "./ui/style-variants/headline";
import { backgroundColor } from "./ui/style-variants/variables";
export default function App() {
  return (
    <div className={`container h-full flex flex-col items-center justify-between min-h-screen py-8 mx-auto ${backgroundColor.neutral}`}>
      <div className="flex flex-col flex-grow w-full max-w-4xl rounded-lg shadow-lg overflow-hidden">
        <header className={`relative h-64 ${backgroundColor.primary} `}>
          <Image
            src="/image.png"
            alt="Book cover background"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <h1 className={headline({size: "4xl"})}>PaperMote</h1>
            <p className={headline({size: "lg"})}>Your Digital Reading Companion</p>
          </div>
        </header>
        <main className="flex-grow h-full flex flex-col p-8">
          <div className="flex flex-grow justify-center space-x-4 mb-8 items-center">
            <Button as="a" href="/login"  size="lg" className={button({color: "primary"})}>Login / Signup</Button>
          </div>
          <Instruction />
          <div className="mt-8 text-center">
            <Button as="a" href="/about-me" color="primary" variant="light">About Me</Button>
          </div>
        </main>
      </div>
      <footer className="text-sm mt-8">
        <p>Powered by Next.js</p>
        <p>Copyright 2024 Mingxia Zeng</p>
      </footer>
    </div>
  );
}

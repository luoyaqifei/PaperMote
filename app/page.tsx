import Instruction from "@/app/ui/components/instruction";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { button } from "@/app/ui/style-variants/button";
import { headline } from "@/app/ui/style-variants/headline";
import { backgroundColor } from "@/app/ui/style-variants/variables";

export default function App() {
  return (
    <div className="w-full flex-grow flex flex-col">
      <header className={`relative h-64 w-full ${backgroundColor.primary}`}>
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
      <main className="flex-grow flex flex-col p-8 max-w-7xl mx-auto w-full">
        <Instruction>
        <div className="flex justify-center space-x-4 mb-8 mt-8 w-full">
          <Button as="a" href="/login" size="lg" className={`${button({color: "primary", size: "lg"})} w-full`} >Login / Signup</Button>
        </div>
        </Instruction>
        <div className="mt-8 text-center">
          <Button as="a" href="/about-me" color="primary" variant="light">About Me</Button>
        </div>
      </main>
    </div>
  );
}

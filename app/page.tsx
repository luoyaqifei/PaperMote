import Link from "next/link";
import Instruction from "./ui/dashboard/Instruction";
import { Button, Card } from "@nextui-org/react";
import Image from "next/image";

export default function App() {
  return (
    <div className="container flex flex-col items-center justify-between min-h-screen py-8 mx-auto bg-teal-50">
      <div className="w-full max-w-4xl bg-teal-600 rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-64">
          <Image
            src="/book-cover-background.jpg"
            alt="Book cover background"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl font-bold mb-4">PaperMote</h1>
            <p className="text-xl">Your Digital Reading Companion</p>
          </div>
        </div>
        <div className="bg-white p-8">
          <div className="flex justify-center space-x-4 mb-8">
            <Link href="/login" passHref>
              <Button as="a" color="primary" size="lg">Login</Button>
            </Link>
            <Link href="/signup" passHref>
              <Button as="a" color="secondary" size="lg">Signup</Button>
            </Link>
          </div>
          <Instruction />
          <div className="mt-8 text-center">
            <Link href="/about-me" passHref>
              <Button as="a" color="primary" variant="light">About Me</Button>
            </Link>
          </div>
        </div>
      </div>
      <footer className="text-sm mt-8 text-teal-800">
        <p>Powered by Next.js</p>
        <p>Copyright 2024 Mingxia Zeng</p>
      </footer>
    </div>
  );
}

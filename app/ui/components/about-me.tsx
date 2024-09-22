"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image as NextUiImage,
} from "@nextui-org/react";
import Image from "next/image";
import { backgroundColor } from "@/app/ui/style-variants/variables";
import { button } from "@/app/ui/style-variants/button";
import { headline } from "@/app/ui/style-variants/headline";

export default function AboutMe() {
  const handleContactClick = () => {
    window.location.href = "mailto:mingxiazeng@yahoo.com";
  };

  return (
    <div>
      <Image
        src="/image.png"
        alt="Book cover background"
        className={`absolute inset-0 w-full h-full object-cover ${backgroundColor.primary} opacity-50 z-0 opacity-50`}
        quality={100}
        fill={true}
      />
      <Card className="max-w-md">
        <CardHeader className="flex flex-col items-center gap-3">
          <h1 className={headline({ size: "3xl", color: "primary" })}>
            About Me
          </h1>
          <NextUiImage
            src="/mingxia-z.png"
            alt="Mingxia Z"
            width={300}
            height={300}
            className="rounded-none"
          />
        </CardHeader>
        <CardBody className="text-center">
          <p className="text-gray-600">
            Hi, I'm Mingxia Z. Welcome to my bookshelf!
          </p>
        </CardBody>
        <CardFooter className="justify-center">
          <Button
            className={button({ color: "primary" })}
            onClick={handleContactClick}
          >
            Contact Me
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

import { backgroundColor } from "@/app/ui/style-variants/variables";
import Image from "next/image";

export default function BackgroundImage() {
  return (
    <Image
      src="/image.png"
      alt="Book cover background"
      className={`absolute inset-0 w-full h-full object-cover ${backgroundColor.primary} opacity-50`}
      quality={100}
      fill={true}
    />
  );
}

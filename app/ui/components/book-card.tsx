import { Book } from "@/app/lib/definitions";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { Card } from "@nextui-org/react";

export default function BookCard({
  backgroundImage,
  children,
}: {
  backgroundImage: string;
  children: React.ReactNode;
}) {
  return (
    <Card isBlurred={true}
      className="book-spine w-32 h-48 md:w-40 md:h-60 lg:w-48 lg:h-72 rounded-l-lg shadow-md transform hover:scale-105 transition-transform duration-300"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#f0f0f0",
      }}
    >
      <div className="h-full flex flex-col justify-center p-2 bg-black bg-opacity-50">
        <div className="writing-mode-vertical text-sm font-bold text-white overflow-hidden text-center">
          {children}
        </div>
      </div>
    </Card>
  );
}

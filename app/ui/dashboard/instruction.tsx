import { Card } from "@nextui-org/react";
import { headline } from "../style-variants/headline";

export default function Instruction() {
  return (
    <Card className="flex-grow p-6 bg-white">
      <h2 className={headline({size: "lg", color: "primary"})}>How it works</h2>
      <ol className="list-inside list-decimal text-sm">
        <li className="mb-2">Sign up</li>
        <li className="mb-2">Add books</li>
        <li className="mb-2">Take notes</li>
      </ol>
    </Card>
  );
}
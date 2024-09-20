import { Card } from "@nextui-org/react";

export default function Instruction() {
  return (
    <Card className="p-6 bg-white">
      <h2 className="text-lg font-semibold mb-4">How it works</h2>
      <ol className="list-inside list-decimal text-sm">
        <li className="mb-2">Sign up</li>
        <li className="mb-2">Add books</li>
        <li className="mb-2">Take notes</li>
      </ol>
    </Card>
  );
}
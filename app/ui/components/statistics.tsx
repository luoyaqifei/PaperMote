import { Card, CardBody } from "@nextui-org/react";
import { colorPalette } from "@/app/ui/style-variants/variables";

export default function Statistics({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card className={`${colorPalette.primary} mt-8 shadow-md`}>
      <CardBody>{children}</CardBody>
    </Card>
  );
}

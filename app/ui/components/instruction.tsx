import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { headline } from "@/app/ui/style-variants/headline";
import { backgroundColor } from "@/app/ui/style-variants/variables";
import { ArrowLongRightIcon, ArrowLongDownIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

const StepChart = () => (
		<>
			{['Sign up', 'Add books', 'Take notes'].map((step, index) => (
				<Fragment key={index}>
					<div className="flex flex-col items-center mb-4 md:mb-0">
					<div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg mb-2">
						{index + 1}
					</div>
					<p className="text-center">{step}</p>
				</div>
				{index < 2 && 
        <ArrowLongDownIcon className="w-16 h-16 items-center md:hidden" />}
        {index < 2 && 
        <ArrowLongRightIcon className="w-16 h-16 items-center hidden md:block" />}
			</Fragment>
		))}
	</>
);

export default function Instruction({children}: {children: React.ReactNode}) {
  return (
    <Card className="w-auto flex p-6 bg-white items-center flex-col">
      <CardHeader
        className={`${backgroundColor.primary}  text-white flex justify-between items-center`}>
        <h2 className={headline({size: "2xl", color: "primary"})}>How it works</h2>
      </CardHeader>
      <CardBody className="flex flex-col md:flex-row justify-between items-center w-full mt-4">
        <StepChart />
      </CardBody>
      <CardFooter>
        {children}
      </CardFooter>
    </Card>
  );
}
import Link from 'next/link';
import { headline } from "@/app/ui/style-variants/headline";
import { button } from '@nextui-org/react';

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-wood-texture">
			<h1 className={headline({ size: "2xl", color: "primary" })}>404 - Page Not Found</h1>
			<p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
			<Link
				href="/dashboard"
				className={button({ color: "primary", size: "lg" })}
			>
				Return to Dashboard
			</Link>
		</div>
	);
}

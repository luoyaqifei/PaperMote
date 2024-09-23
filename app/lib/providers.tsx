import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<NextUIProvider>
			{MyToaster()}
			{children}
		</NextUIProvider>
	);
}

function MyToaster() {
	return (
		<Toaster
			toastOptions={{
				success: {
					style: {
						background: "#16a34a",
						color: "#ffffff",
					},
				},
				error: {
					style: {
						background: "#dc2626",
						color: "#ffffff",
					},
				},
				style: {
					borderRadius: "0.375rem",
					padding: "0.75rem",
					fontSize: "0.875rem",
					fontWeight: "500",
					fontFamily: "var(--font-alegreya-sans)",
					boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
				},
			}}
		/>
	);
}

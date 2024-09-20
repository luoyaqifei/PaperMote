import Link from "next/link";

export default function NavLinks() {
    return (
        <div className="flex flex-col">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/about-me">About Me</Link>
        </div>
    );
}
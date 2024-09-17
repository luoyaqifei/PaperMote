import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";

export default function Breadcrumb() {
    return (
        <Breadcrumbs className="text-sm">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
            <BreadcrumbItem href="/dashboard/about-me">About Me</BreadcrumbItem>
        </Breadcrumbs>
    )
}
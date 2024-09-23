"use client";

import { Children, useMemo, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Spinner } from "@nextui-org/react";
import { BreadCrumbsContext } from "@/app/ui/components/breadcrumbs-context";

const BreadcrumbsItem = ({ children, href }: { children: ReactNode; href: string }) => (
  <li>
    <Link href={href}>{children}</Link>
  </li>
);

const BreadcrumbsContainer = ({
  children,
  separator = "/",
}: {
  children: ReactNode;
  separator?: string | ReactNode;
}) => (
  <nav className="min-h-6">
    <ol className="flex items-center space-x-4">
      {Children.map(children, (child, index) => (
        <>
          {child}
          {index < Children.count(children) - 1 && <span>{separator}</span>}
        </>
      ))}
    </ol>
  </nav>
);

export const BreadCrumbs = ({
  children,
  withHome = false,
}: {
  children?: ReactNode;
  withHome?: boolean;
}) => {
  const paths = usePathname();
  const [trailingPath, setTrailingPath] = useState("");
  const context = useMemo(
    () => ({
      trailingPath,
      setTrailingPath,
    }),
    [trailingPath]
  );

  const pathNames = paths.split("/").filter(Boolean);
  const pathItems = pathNames.map((path, i) => ({
    name: path,
    path: `/${pathNames.slice(0, i + 1).join("/")}`,
  }));

  if (
    context.trailingPath &&
    pathItems.length > 0 &&
    context.trailingPath !== pathItems[pathItems.length - 1].name
  ) {
    pathItems[pathItems.length - 1].name = context.trailingPath;
  }

  return (
    <>
      <BreadcrumbsContainer>
        {withHome && <BreadcrumbsItem href="/">Home</BreadcrumbsItem>}
        {pathItems.map((item) => (
          <BreadcrumbsItem key={item.path} href={item.path}>
            {item.name === "loading" ? (
              <Spinner className="w-4 h-4" />
            ) : (
              item.name
            )}
          </BreadcrumbsItem>
        ))}
      </BreadcrumbsContainer>
      <BreadCrumbsContext.Provider value={context}>
        {children}
      </BreadCrumbsContext.Provider>
    </>
  );
};

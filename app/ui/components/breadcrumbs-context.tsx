"use client";

import { createContext, useContext, useEffect } from "react";

export const BreadCrumbsContext = createContext<{
  trailingPath: string;
  setTrailingPath: (path: string) => void;
}>({
  trailingPath: "",
  setTrailingPath: () => {},
});

export const useBreadCrumbs = (trailingPath?: string) => {
  const context = useContext(BreadCrumbsContext);

  useEffect(() => {
    context.setTrailingPath(trailingPath ? trailingPath : "loading");
    return () => context.setTrailingPath("");
  }, [trailingPath, context]);
};

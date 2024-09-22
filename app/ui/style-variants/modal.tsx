import { tv } from "tailwind-variants";
import { colorPalette } from "./variables";

const slots = {
    base: `${colorPalette.base} rounded-lg shadow-lg overflow-hidden`,
    backdrop: "bg-black/60 backdrop-blur-sm",
    header: `${colorPalette.primary} flex flex-col gap-1 p-4 border-b border-gray-200`,
    body: `${colorPalette.base} space-y-4 p-6`,
    footer: `${colorPalette.base} text-white p-4 border-t border-gray-200 flex justify-end`,
}

export const modal = tv({
    slots
  });
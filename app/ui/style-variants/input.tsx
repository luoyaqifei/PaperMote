import { tv } from "tailwind-variants";
import { backgroundColor, borderColor, fontSize, textColor } from "@/app/ui/style-variants/variables";
import { alegreyaSans } from "@/app/ui/style-variants/fonts";

const slots = {
  input: `bg-transparent placeholder:text-default-700/50px-3 py-2 rounded-md transition-all duration-200 focus:ring-2 focus:ring-opacity-50 ${alegreyaSans.className}`,
  label: `mb-2 text-sm font-medium ${alegreyaSans.className} text-black/50`,

  inputWrapper: [
    "shadow-xl",
    "bg-default-200/50",
    "backdrop-blur-xl",
    "backdrop-saturate-200",
    "hover:bg-default-200/70",
    "group-data-[focus=true]:bg-default-200/50",
    "!cursor-text",
  ],
};

export const input = tv({
  slots,
  variants: {
    color: {
      primary: {
        input: `${borderColor.primary} ${backgroundColor.base} hover:${backgroundColor.primary}`,
        label: `${textColor.primary}`,
        inputWrapper: ``,
      },
      secondary: {
        input: `${borderColor.secondary} ${backgroundColor.base} hover:${backgroundColor.secondary}`,
        label: `${textColor.secondary}`,
        inputWrapper: ``,
      },
      neutral: {
        input: `${borderColor.neutral} ${backgroundColor.base} hover:${backgroundColor.neutral}`,
        label: `${textColor.neutral}`,
        inputWrapper: ``,
      },
    },
    size: {
      sm: {
        input: `${fontSize.sm} h-8`,
        label: `${fontSize.xs}`,
        inputWrapper: ``,
      },
      md: {
        input: `${fontSize.md} h-10`,
        label: `${fontSize.sm}`,
        inputWrapper: ``,
      },
      lg: {
        input: `${fontSize.lg} h-12`,
        label: `${fontSize.md}`,
        inputWrapper: ``,
      },
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

import { tv } from 'tailwind-variants';
import { colorPalette, fontSize } from './variables';
import { alegreyaSans } from '../fonts';

export const button = tv({
  base: `px-4 py-1.5 rounded-full hover:opacity-80 ${alegreyaSans.className} font-semibold`,
  variants: {
    color: {
      primary: `${colorPalette.primary} hover:opacity-80`,
      secondary: `${colorPalette.secondary} hover:opacity-80`,
      neutral: `${colorPalette.neutral} hover:opacity-80`,
    },
    flat: {
      true: 'bg-transparent'
    },
    size: {
      sm: fontSize.sm,
      md: fontSize.md,
      lg: fontSize.lg
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'md'
  }
});
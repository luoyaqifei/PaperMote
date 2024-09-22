import { tv } from 'tailwind-variants';
import { textColor, fontSize } from '../style-variants/variables';
import { alegreyaSans } from '../style-variants/fonts';

export const headline = tv({
	base: `${alegreyaSans.className} ${textColor.base} font-bold m-0 p-0`,
	variants: {
		color: {
			primary: textColor.primary,
			secondary: textColor.secondary,
			neutral: textColor.neutral,
		},
		size: {
			sm: fontSize.sm,
			md: fontSize.md,
			lg: fontSize.lg,
			xl: fontSize.xl,
			'2xl': fontSize['2xl'],
			'3xl': fontSize['3xl'],
			'4xl': fontSize['4xl'],
		},
		align: {
			left: 'text-left',
			center: 'text-center',
			right: 'text-right',
		},
	},
	defaultVariants: {
		color: 'primary',
		size: 'md',
		align: 'left',
	},
});

import { tv } from 'tailwind-variants';
import { backgroundColor, borderColor, colorPalette, fontSize, textColor } from './variables';
import { alegreyaSans } from '../fonts';

const slots = {
	input: `px-3 py-2 rounded-md transition-all duration-200 focus:ring-2 focus:ring-opacity-50 ${alegreyaSans.className}`,
	label: `mb-2 text-sm font-medium ${alegreyaSans.className}`,
	inputWrapper: `relative flex flex-col w-full`,
}

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
		color: 'primary',
		size: 'md',
	},
});

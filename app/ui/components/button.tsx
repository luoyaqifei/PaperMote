import { tv, type VariantProps } from 'tailwind-variants';
 
export const button = tv({
  base: 'px-4 py-1.5 rounded-full hover:opacity-80',
  variants: {
    color: {
      primary: 'bg-teal-600 hover:bg-teal-700 text-white',
      neutral: 'bg-zinc-600 hover:bg-zinc-700 text-black'
    },
    flat: {
      true: 'bg-transparent'
    }
  },
  defaultVariants: {
    color: 'primary'
  },
  compoundVariants: [
    {
      color: 'primary',
      flat: true,
      class: 'bg-blue-500/40'
    },
    {
      color: 'neutral',
      flat: true,
      class: 'bg-zinc-500/20'
    }
  ]
});
 
/**
 * Result:
 * color?: "primary" | "neutral"
 * flat?: boolean
 */
 
type ButtonVariants = VariantProps<typeof button>;
 
interface ButtonProps extends ButtonVariants {
  children: React.ReactNode;
}
 
export const Button = (props: ButtonProps) => {
  return <button className={button(props)}>{props.children}</button>;
};
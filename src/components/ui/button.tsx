import { Button as AriaButton, type ButtonProps } from "react-aria-components";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva("button", {
  variants: {
    variant: {
      default: "button--default",
      outline: "button--outline",
      ghost: "button--ghost",
    },
    size: { default: "button--md", sm: "button--sm", icon: "button--icon" },
  },
  defaultVariants: { variant: "default", size: "default" },
});

type PortfolioButtonProps = Omit<ButtonProps, "className"> &
  VariantProps<typeof buttonVariants> & { className?: string };

export function Button({
  className,
  variant,
  size,
  ...props
}: PortfolioButtonProps) {
  return (
    <AriaButton
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/[0.55] disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-linear-to-br from-primary via-[#d6b768] to-[#9f8648] text-primary-foreground shadow-[0_12px_30px_rgba(201,169,98,0.35)] hover:scale-[1.01] hover:brightness-105 hover:shadow-[0_16px_34px_rgba(201,169,98,0.45)]",
        destructive:
          "bg-linear-to-br from-destructive to-red-700 text-destructive-foreground shadow-[0_10px_24px_rgba(220,38,38,0.3)] hover:brightness-110",
        outline:
          "border border-white/15 bg-white/5 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-white/10 hover:border-primary/[0.35]",
        secondary:
          "bg-linear-to-br from-secondary/85 to-secondary/55 text-secondary-foreground shadow-[0_8px_22px_rgba(255,255,255,0.08)] hover:brightness-110",
        ghost: "hover:bg-white/[0.08] hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3 text-xs",
        lg: "h-11 rounded-xl px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };


import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/[0.45]",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-linear-to-r from-primary to-[#b9934f] text-primary-foreground shadow-[0_10px_24px_rgba(201,169,98,0.34)] hover:brightness-105",
        secondary:
          "border-transparent bg-secondary/80 text-secondary-foreground hover:bg-secondary",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-[0_8px_20px_rgba(220,38,38,0.3)] hover:brightness-105",
        outline: "border-white/[0.14] bg-white/[0.04] text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };


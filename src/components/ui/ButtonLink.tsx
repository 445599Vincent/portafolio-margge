import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/content";
import { ArrowRight } from "./Icons";

type Variant = "primary" | "secondary" | "light" | "outline-light";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-accent",
  secondary: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  light: "bg-paper text-ink hover:bg-accent-light",
  "outline-light": "border border-paper/30 text-paper hover:border-paper hover:bg-paper hover:text-ink",
};

export const buttonClasses = (variant: Variant = "primary", className?: string) =>
  cn(
    "group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 text-sm font-medium tracking-wide transition-colors duration-300",
    variants[variant],
    className,
  );

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  external?: boolean;
};

export function ButtonLink({ href, children, variant = "primary", className, arrow = true, external }: Props) {
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClasses(variant, className)}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClasses(variant, className)}>
      {content}
    </Link>
  );
}

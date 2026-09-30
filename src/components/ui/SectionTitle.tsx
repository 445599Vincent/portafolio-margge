import type { ReactNode } from "react";
import { cn } from "@/lib/content";

type Props = {
  /** Número de sección, p. ej. "02" */
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** id del h2, útil para aria-labelledby */
  id?: string;
  className?: string;
  dark?: boolean;
};

export function SectionTitle({ index, eyebrow, title, description, id, className, dark }: Props) {
  return (
    <header className={cn("max-w-3xl", className)} data-reveal>
      <p className={cn("eyebrow flex items-center gap-3", dark ? "text-paper/60" : "text-muted")}>
        {index && <span className={dark ? "text-accent-light" : "text-accent"}>{index}</span>}
        {index && <span aria-hidden className="h-px w-8 bg-current opacity-40" />}
        <span>{eyebrow}</span>
      </p>
      <h2 id={id} className="font-display mt-5 text-[2.75rem] text-balance sm:text-6xl lg:text-7xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-6 max-w-xl text-base leading-relaxed sm:text-lg",
            dark ? "text-paper/70" : "text-muted",
          )}
        >
          {description}
        </p>
      )}
    </header>
  );
}

"use client";

/** Año actual calculado en el navegador, para un copyright siempre vigente. */
export function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}

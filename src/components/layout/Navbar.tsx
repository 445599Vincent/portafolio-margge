"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation, site } from "@/data/site";
import { cn } from "@/lib/content";
import { Close, Menu } from "../ui/Icons";
import { SocialLinks } from "../SocialLinks";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  // El menú guarda la ruta en la que se abrió: al navegar a otra ruta queda cerrado automáticamente.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const setOpen = (value: boolean) => setOpenAt(value ? pathname : null);
  const [active, setActive] = useState<string>("inicio");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Fondo del header al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sección activa (scrollspy) en la home
  useEffect(() => {
    if (!isHome) return;
    const sections = navigation
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [isHome]);

  // Menú móvil: bloquear scroll, cerrar con Escape y gestionar el foco
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenAt(null);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (id: string) => isHome && active === id;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open
          ? "border-b border-line/70 bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <nav aria-label="Principal" className="container-site flex h-16 items-center justify-between sm:h-20">
        <Link
          href="/#inicio"
          className="font-display relative z-10 text-2xl tracking-tight sm:text-[1.7rem]"
          onClick={() => setOpen(false)}
        >
          {site.name}
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) =>
            item.id === "contacto" ? (
              <li key={item.id} className="ml-3">
                <Link
                  href={item.href}
                  className="inline-flex min-h-10 items-center rounded-full bg-ink px-5 text-sm font-medium text-paper transition-colors duration-300 hover:bg-accent"
                >
                  {item.label}
                </Link>
              </li>
            ) : (
              <li key={item.id}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.id) ? "true" : undefined}
                  className={cn(
                    "relative inline-flex min-h-10 items-center px-3 text-sm transition-colors duration-300 hover:text-ink",
                    isActive(item.id) ? "text-ink" : "text-ink/60",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-3 bottom-1.5 h-px origin-left bg-accent transition-transform duration-500",
                      isActive(item.id) ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              </li>
            ),
          )}
        </ul>

        <button
          ref={toggleRef}
          type="button"
          className="relative z-10 -mr-2 inline-flex size-11 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <Close className="size-6" /> : <Menu className="size-6" />}
          <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
        </button>
      </nav>

      {/* Menú móvil */}
      <div
        id="mobile-menu"
        ref={panelRef}
        inert={!open}
        className={cn(
          "fixed inset-x-0 top-16 bottom-0 flex h-[calc(100dvh-4rem)] flex-col justify-between bg-paper px-5 pb-10 pt-8 duration-500 sm:top-20 sm:h-[calc(100dvh-5rem)] sm:px-8 lg:hidden",
          // Al abrir, la visibilidad cambia al instante (permite mover el foco); al cerrar, espera al fade.
          open ? "visible opacity-100 transition-opacity" : "invisible opacity-0 transition-[opacity,visibility]",
        )}
      >
        <ul className="space-y-1">
          {navigation.map((item, i) => (
            <li
              key={item.id}
              className={cn("transition-[opacity,transform] duration-500", open ?"translate-y-0 opacity-100" : "translate-y-3 opacity-0")}
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
            >
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display flex items-baseline gap-4 py-2 text-5xl"
              >
                <span className="font-sans text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="border-t border-line pt-6">
          <SocialLinks />
        </div>
      </div>
    </header>
  );
}

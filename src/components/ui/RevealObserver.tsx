"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Observador único para las animaciones de aparición al hacer scroll.
 * Cualquier elemento con el atributo `data-reveal` aparece suavemente al entrar en pantalla.
 * Opcional: style={{ "--reveal-delay": "120ms" }} para escalonar.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reveal = (el: Element) => el.classList.add("is-visible");

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal]").forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const observeAll = () =>
      document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => io.observe(el));

    observeAll();
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}

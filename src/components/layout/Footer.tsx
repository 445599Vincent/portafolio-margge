import Link from "next/link";
import { site } from "@/data/site";
import { visibleNavigation } from "@/data/sections";
import { getContactChannels, type ContactChannel } from "@/lib/content";
import { SocialLinks } from "../SocialLinks";
import { CurrentYear } from "../ui/CurrentYear";

const FOOTER_CHANNELS: ContactChannel["id"][] = ["email", "linkedin", "instagram"];

export function Footer() {
  return (
    <footer className="on-dark bg-ink text-paper">
      <div className="container-site border-t border-paper/15 py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-display text-4xl sm:text-5xl">{site.name}</p>
            <p className="mt-3 text-paper/60">{site.title}</p>
          </div>

          <nav aria-label="Pie de página">
            <h2 className="eyebrow text-paper/50">Navegación</h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 md:grid-cols-1">
              {visibleNavigation.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-sm text-paper/80 transition-colors hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {getContactChannels().some((c) => FOOTER_CHANNELS.includes(c.id)) && (
            <div>
              <h2 className="eyebrow text-paper/50">Contacto</h2>
              <SocialLinks className="mt-4 flex-col gap-y-0!" only={FOOTER_CHANNELS} />
            </div>
          )}
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-paper/15 pt-8 text-xs text-paper/50 sm:flex-row sm:justify-between">
          <p>
            © <CurrentYear /> {site.name}. Todos los derechos reservados.
          </p>
          <p>Las marcas mencionadas pertenecen a sus respectivos propietarios.</p>
        </div>
      </div>
    </footer>
  );
}

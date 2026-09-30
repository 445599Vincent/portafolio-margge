import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[80svh] flex-col justify-center pt-28">
      <p className="eyebrow text-accent">Error 404</p>
      <h1 className="font-display mt-6 text-6xl sm:text-8xl">Esta página no existe.</h1>
      <p className="mt-6 max-w-md text-lg text-muted">
        Es posible que el enlace haya cambiado. Puedes volver al inicio o explorar los proyectos.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/">Volver al inicio</ButtonLink>
        <ButtonLink href="/#proyectos" variant="secondary" arrow={false}>
          Ver proyectos
        </ButtonLink>
      </div>
    </section>
  );
}

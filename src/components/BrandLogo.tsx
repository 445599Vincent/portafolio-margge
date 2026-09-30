import Image from "next/image";
import type { Brand } from "@/lib/types";
import { Content } from "./ui/Content";

/** Logo de marca en escala de grises; si no hay logo, muestra el nombre. */
export function BrandLogo({ brand }: { brand: Brand }) {
  return (
    <div className="group flex h-28 items-center justify-center px-6 sm:h-32">
      {brand.logo ? (
        <Image
          src={brand.logo}
          alt={brand.name}
          width={200}
          height={80}
          sizes="150px"
          className="h-12 w-auto max-w-full object-contain opacity-70 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0 sm:h-14 sm:max-w-[150px]"
        />
      ) : (
        <Content
          text={brand.name}
          className="font-display text-2xl text-ink/70 transition-colors duration-500 group-hover:text-ink sm:text-[1.7rem]"
        />
      )}
    </div>
  );
}

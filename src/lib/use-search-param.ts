import { useSyncExternalStore } from "react";

/**
 * Parámetros de la URL como estado compartido entre componentes cliente
 * (filtro `?categoria=`, mensaje sugerido `?proyecto=`…).
 *
 * `useSearchParam` es seguro para la hidratación (en el servidor devuelve null) y se
 * actualiza con el historial del navegador y con cada `setSearchParam`.
 */

const CHANGE_EVENT = "searchparamchange";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

export function useSearchParam(name: string): string | null {
  return useSyncExternalStore(
    subscribe,
    () => new URLSearchParams(window.location.search).get(name),
    () => null,
  );
}

/** Cambia (o elimina con `null`) un parámetro sin recargar ni añadir entradas al historial. */
export function setSearchParam(name: string, value: string | null) {
  const url = new URL(window.location.href);
  if (value === null) url.searchParams.delete(name);
  else url.searchParams.set(name, value);
  if (url.href === window.location.href) return;
  window.history.replaceState(window.history.state, "", url);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

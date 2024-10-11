import type { LatLngTuple, Map } from "leaflet";
import type { fetchTempleType, fetchTemplesByDistrictAdminType, fetchTemplesType } from "~/server/queries";

export const removeAccents = (string: string) => {
  const tildes = {
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
    ü: "u",
    ñ: "n",
  };

  return string.replace(/[áéíóúüñ]/gi, (match) => tildes[match as keyof typeof tildes]);
};

export function sortTemples<T extends fetchTemplesType>(
  temples: T,
  location: LatLngTuple | [],
  map: Map | null
) {
  if (location && location?.length !== 0 && map) {
    return temples.sort(
      (a: fetchTempleType, b: fetchTempleType) =>
        map.distance(location, a.coordenadas as LatLngTuple) -
        map.distance(location, b.coordenadas as LatLngTuple)
    );
  } else return temples;
}

export function filterTemples<T extends fetchTemplesByDistrictAdminType | fetchTemplesType>(
  temples: T,
  search: string
) {
  return temples.filter(({ congregacion, municipio }) => {
    const templeName = removeAccents(congregacion.toLowerCase());
    const templeRegion = removeAccents(municipio.toLowerCase());
    return templeName === "" ? templeName : templeName.includes(search) || templeRegion.includes(search);
  }) as T;
}

export const formatTempleId = (temple: string, town: string) => {
  const newTemple = removeAccents(temple.toLowerCase().trim().replace(/\s+/g, "-"));
  const newTown = removeAccents(town.toLowerCase().trim().replace(/\s+/g, "-"));
  return newTemple + "-" + newTown;
};

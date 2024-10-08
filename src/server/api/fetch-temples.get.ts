import { isNotNull } from "drizzle-orm";
import { db } from "~~/db/db";
import { temples } from "~~/db/schema";

export default defineEventHandler(async (event) => {
  return await db
    .select({
      id: temples.id,
      congregacion: temples.congregacion,
      municipio: temples.municipio,
      coordenadas: temples.coordenadas,
      imagen: temples.imagen,
    })
    .from(temples)
    .where(isNotNull(temples.coordenadas));
});

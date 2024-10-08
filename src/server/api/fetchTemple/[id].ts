import { eq } from "drizzle-orm";
import { db } from "~~/db/db";
import { temples } from "~~/db/schema";
import { columns } from "../../db";

export default defineEventHandler(async (event) => {
  const templeId = getRouterParam(event, "id");
  return (await db.select(columns).from(temples).where(eq(temples.id, templeId!)))[0];
});

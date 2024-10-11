import { fetchTempleId } from "~/server/queries";

export default defineEventHandler(async (event) => {
  const templeId = getRouterParam(event, "id");
  return await fetchTempleId(templeId!);
});

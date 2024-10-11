import { fetchTemplesByDistrict } from "~/server/queries";

export default defineEventHandler(async (event) => {
  const district = getRouterParam(event, "district");
  return await fetchTemplesByDistrict(district!);
});

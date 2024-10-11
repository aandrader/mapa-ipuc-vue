import { fetchTemples } from "../queries";

export default defineEventHandler(async (event) => {
  return await fetchTemples();
});

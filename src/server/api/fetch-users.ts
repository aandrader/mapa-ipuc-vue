import { fetchUsers } from "../queries";

export default defineEventHandler(async (event) => {
  return await fetchUsers();
});

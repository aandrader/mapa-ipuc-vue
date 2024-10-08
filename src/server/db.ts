import { getTableColumns } from "drizzle-orm";
import { temples } from "~~/db/schema";

const { password, ...columns } = getTableColumns(temples);
export { password, columns };

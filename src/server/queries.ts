import { temples, users } from "../../db/schema";
import { eq, getTableColumns, isNotNull } from "drizzle-orm";
// import { auth } from "@/app/api/auth/auth";
import { db } from "../../db/db";
import { getUpdateDataDefer } from "~/utils/data";

const { password, ...columns } = getTableColumns(temples);

// Utility type to get the awaited return type of any async function
type QueryType<T extends (...args: any[]) => Promise<any>> =
  // Get the return type of the function T
  Awaited<ReturnType<T>>;

export type fetchTemplesType = QueryType<typeof fetchTemples>;
export type fetchTempleType = fetchTemplesType[number];
export const fetchTemples = async () => {
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
};

export type fetchTempleIdType = QueryType<typeof fetchTempleId>;
export const fetchTempleId = async (templeId: string) => {
  return (await db.select(columns).from(temples).where(eq(temples.id, templeId)))[0];
};

export type fetchTemplesByDistrictType = Awaited<ReturnType<typeof fetchTemplesByDistrict>>;
export const fetchTemplesByDistrict = async (distrito: string) => {
  return await db
    .select(columns)
    .from(temples)
    .where(eq(temples.distrito, Number(distrito)))
    .orderBy(temples.congregacion);
};

export type fetchTemplesByDistrictAdminType = QueryType<typeof fetchTemplesByDistrictAdmin>;
export type fetchTempleByDistrictAdminType = fetchTemplesByDistrictAdminType[number];
export const fetchTemplesByDistrictAdmin = async (distrito: string) => {
  return await db
    .select({
      id: temples.id,
      congregacion: temples.congregacion,
      distrito: temples.distrito,
      municipio: temples.municipio,
      password: temples.password,
    })
    .from(temples)
    .where(eq(temples.distrito, Number(distrito)))
    .orderBy(temples.congregacion);
};

export const fetchTemplesByDistrictExcel = async (distrito: string) => {
  return await db
    .select({
      congregacion: temples.congregacion,
      municipio: temples.municipio,
      password: temples.password,
    })
    .from(temples)
    .where(eq(temples.distrito, Number(distrito)))
    .orderBy(temples.congregacion);
};

export const fetchAllId = async () => {
  return await db
    .select({
      id: temples.id,
    })
    .from(temples)
    .where(isNotNull(temples.coordenadas));
};

export const fetchNameId = async () => {
  return await db
    .select({
      id: temples.id,
      congregacion: temples.congregacion,
      municipio: temples.municipio,
    })
    .from(temples);
};

export type fetchUsersType = QueryType<typeof fetchUsers>;
export const fetchUsers = async () => {
  return await db
    .select({
      distrito: users.distrito,
    })
    .from(users);
};

export const getAuthTemple = async (templeId: string) => {
  return (
    await db
      .select({ id: temples.id, password: temples.password })
      .from(temples)
      .where(eq(temples.id, templeId))
  )[0];
};

export const getAuthAdmin = async (distrito: string) => {
  return (
    await db
      .select({ distrito: users.distrito, password: users.password })
      .from(users)
      .where(eq(users.distrito, Number(distrito)))
  )[0];
};
type addNewTempleType = Pick<
  fetchTempleByDistrictAdminType,
  "id" | "congregacion" | "distrito" | "municipio" | "password"
>;
export const addNewTemple = async (temple: addNewTempleType): Promise<addNewTempleType> => {
  return (
    await db
      .insert(temples)
      .values({
        id: temple.id,
        congregacion: temple.congregacion,
        distrito: temple.distrito,
        municipio: temple.municipio,
        password: temple.password,
      })
      .returning({
        id: temples.id,
        congregacion: temples.congregacion,
        distrito: temples.distrito,
        municipio: temples.municipio,
        password: temples.password,
      })
  )[0];
};

export type updateTempleDataType = Omit<fetchTempleIdType, "id" | "congregacion" | "distrito" | "municipio">;

export const updateTemple = async (newData: updateTempleDataType, originalData: fetchTempleIdType) => {
  let revalidateMap = false,
    revalidateTemple = false;

  const updates = getUpdateDataDefer(newData, originalData);

  if (Object.keys(updates).length) {
    await db.update(temples).set(updates).where(eq(temples.id, originalData.id));
    revalidateTemple = true;
  }

  if (updates.coordenadas) {
    revalidateMap = true;
  }

  //   if (revalidateTemple) revalidatePath("/" + originalData.id, "page");

  //   if (revalidateMap) revalidatePath("/(map)", "layout");

  return { status: revalidateMap || revalidateTemple ? "updated" : "no-change" };
};

// export const changePassword = async (currentPassword: string, newPassword: string) => {
//   const session = await auth();
//   const table = session!.user.type === "admin" ? users : temples;
//   const column = session!.user.type === "admin" ? users.distrito : temples.id;
//   const id = session!.user.id;

//   const { password } = (await db.select({ password: table.password }).from(table).where(eq(column, id)))[0];

//   if (currentPassword !== password) return { ok: false };

//   await db.update(table).set({ password: newPassword }).where(eq(column, id));

//   return { ok: true };
// };

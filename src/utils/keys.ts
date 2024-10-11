import type { fetchTemplesType } from "~/server/queries";

export const templesKey = Symbol() as InjectionKey<fetchTemplesType>;
export const drawerOpenKey = Symbol() as InjectionKey<{
  isOpen: Ref<boolean>;
  setIsOpen: (state: boolean) => void;
}>;

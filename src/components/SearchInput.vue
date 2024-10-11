import { drawerOpenKey } from '../utils/keys';
<script setup lang="ts">
const { isOpen, setIsOpen } = inject(drawerOpenKey)!;
const input = defineModel();

const onClick = () => {
  setIsOpen(true);
};
</script>

<template>
  <input
    @click="onClick"
    :class="{ 'rounded-b-none': isOpen }"
    class="size-full pr-4 pl-[50px] py-2 rounded-md border border-solid border-gray-300 outline-none focus:border-ipuc-blue-700"
    v-model="input"
    placeholder="Buscar congregaciones..."
  />
</template>

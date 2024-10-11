<script setup lang="ts">
import type { fetchTempleType } from "~/server/queries";

const { temple } = defineProps<{ temple: fetchTempleType }>();

const { map } = storeToRefs(useMapStore());
const { isOpen, setIsOpen } = inject(drawerOpenKey)!;

const onClick = () => {
  // if (window.innerWidth <= 640)
  setIsOpen(!isOpen);
  map.value?.flyTo(temple.coordenadas!, 16, { duration: 1.5 });
};

const imgUrl = computed(() => getImgUrl(temple.imagen!! && temple.id));
</script>

<template>
  <NuxtLink
    :to="'/' + temple.id"
    noPrefetch
    :key="temple.id"
    class="border border-solid break-words rounded-2xl border-gray-300 cursor-pointer overflow-hidden h-full"
    @click="onClick"
  >
    <NuxtImg
      :src="imgUrl"
      class="h-[130px]"
      sizes="(max-width: 450px) 40vw, (max-width: 640px) 30vw, (max-width: 450px) 40vw , (max-width: 1024px) 18vw , 13vw"
      alt="Foto iglesia"
    />

    <div class="px-1 py-3">
      <h2 class="text-center font-medium">{{ temple.congregacion }}</h2>
      <h3 class="text-center text-sm text-gray-500">{{ temple.municipio }}</h3>
    </div>
  </NuxtLink>
</template>

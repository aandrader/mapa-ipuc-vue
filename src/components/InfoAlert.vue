import { useMapStore } from '../stores/map';
<script setup lang="ts">
const { map, userLocation } = storeToRefs(useMapStore());
const alertClass = "flex gap-2 text-ipuc-blue-500 items-center w-full bg-ipuc-blue-100 py-2 px-4 text-sm";
</script>
<template>
  <div v-if="userLocation.length !== 0" :class="alertClass">
    <!-- <InfoIcon /> -->
    Iglesias más cercanas según tu ubicación.
  </div>

  <div v-else @click="() => {map!.locate()}" :class="[alertClass, 'cursor-pointer']">
    <!-- <LocationIcon /> -->
    Permitir ubicación para buscar iglesias más cercanas.
  </div>
</template>

<script setup lang="ts">
import type { fetchTempleIdType } from "~/server/queries";

const readOnly = inject(readOnlyKey)!;
const services = defineModel<fetchTempleIdType["horarios"]>();
const addService = () => {
  services.value?.push({ dia: "", hora: "" });
};
const deleteService = (index: number) => {
  console.log({ index, services });
  services.value?.splice(index, 1);
};
</script>

<template>
  <div className="flex gap-1 flex-col">
    <p>Horarios de culto</p>

    <div v-for="(service, index) in services" :key="service.dia + service.hora">
      <ScheduleRow v-model="services![index]" @deleteService="deleteService(index)" />
    </div>

    <Button v-if="!readOnly" type="button" class="w-min" @click="addService"> Agregar dia </Button>
  </div>
</template>

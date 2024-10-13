<script setup lang="ts">
import type { fetchTempleIdType } from "~/server/queries";

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const readOnly = inject(readOnlyKey)!;
const service = defineModel<fetchTempleIdType["horarios"][number]>();
const { dia, hora } = toRefs(service.value!);

const emit = defineEmits(["deleteService"]);
</script>

<template>
  <div class="flex gap-3">
    <select v-model="dia" :disabled="readOnly" class="rounded-lg px-2">
      <option v-for="day in days" :key="day">{{ day }}</option>
    </select>
    <input v-model="hora" :readOnly="readOnly" type="time" />
    <Button v-if="!readOnly" class="p-1" type="button" @click="emit('deleteService')">
      X
      <!-- <X /> -->
    </Button>
  </div>
</template>

<script setup lang="ts">
const readOnly = inject(readOnlyKey)!;
</script>

<template>
  <div class="flex flex-col gap-2">
    <p>Foto</p>
    <div class="grid gap-2 grid-cols-1 lg:grid-cols-[230px_auto]">
      <div class="relative w-[230px] h-[230px] grid place-items-center rounded-lg bg-slate-200">
        <!-- <NuxtImg
          v-if="imageUrl"
          :src="imageUrl"
          class="rounded-lg object-cover"
          fill
          sizes="300px"
          alt="Foto iglesia"
        /> -->

        <span class="font-medium text-slate-500">Sin imagen</span>
      </div>

      <div v-if="!readOnly" class="flex flex-col gap-2">
        <!-- <Button type="button" class="w-min" @click="publish('openImageDialog')"> Actualizar imagen </Button> -->
        <!-- <ImageDialog imageUrl={imageUrl} setImageUrl={setImageUrl} setImageBlob={setImageBlob} /> -->
      </div>
    </div>
  </div>
</template>

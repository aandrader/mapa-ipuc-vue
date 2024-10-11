<script setup lang="ts">
const { data } = await useFetch("/api/fetch-temples");
const temples = data.value!;
provide(templesKey, temples);
</script>

<template>
  <div class="relative">
    <Map></Map>
    <Drawer></Drawer>
    <slot></slot>
    <!-- Modal -->
  </div>
</template>

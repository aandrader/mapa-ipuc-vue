import { temples } from '../../db/schema';
<script setup lang="ts">
const { data } = await useFetch("/api/fetch-temples");
const temples = data.value!;
</script>

<template>
  <div class="relative">
    <Map :temples="temples"></Map>
    <slot></slot>
  </div>
</template>

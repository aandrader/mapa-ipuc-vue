<script setup lang="ts">
defineProps<{ label: string }>();
const readOnly = inject(readOnlyKey)!;
const input = defineModel();
</script>
<template>
  <div>
    <p>{{ label }}</p>
    <UInput autoCapitalize="none" autoCorrect="off" :readOnly="readOnly" v-model="input" placeholder="" />
  </div>
</template>

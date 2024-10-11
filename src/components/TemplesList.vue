<script setup lang="ts">
const temples = inject(templesKey)!;

const { map, userLocation } = storeToRefs(useMapStore());

const sortedTemples = computed(() => {
  return sortTemples(temples, userLocation.value, map.value);
});

const searchInput = ref("");
const filteredTemples = computed(() => {
  return filterTemples(sortedTemples.value, searchInput.value);
});
</script>

<template>
  <header class="flex gap-4 justify-between visible relative">
    <SearchInput v-model="searchInput"> </SearchInput>
  </header>
  <div class="card rounded-t-none rounded-md border-t-none">
    <InfoAlert />
    <div class="pb-4">
      <div class="overflow-y-scroll h-[70vh] pt-4 px-4">
        <div
          class="grid gap-2 auto-rows-min grid-cols-2 min-[450px]:grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center"
        >
          <Card v-for="temple in filteredTemples" :temple="temple"></Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(true);
const setIsOpen = (state: boolean) => {
  isOpen.value = state;
};

provide(drawerOpenKey, {
  isOpen: isOpen,
  setIsOpen,
});

const backdropId = useBackdrop(() => (isOpen.value = false));
</script>

<template>
  <div
    :ref="backdropId"
    :class="{ invisible: !isOpen }"
    class="absolute w-[90%] absolute-center-x sm:right-4 sm:translate-x-0 top-4 sm:w-[45%] md:w-[55%] lg:w-[60%] above-map"
  >
    <TemplesList></TemplesList>
  </div>
</template>

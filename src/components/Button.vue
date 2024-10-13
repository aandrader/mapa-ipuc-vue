<script setup lang="ts">
// Define the props with types
const props = defineProps({
  label: String,
  size: String,
  type: String,
  classColor: String,
  ...nuxtLinkProps,
});

const linkProps = computed(() => (props.to ? getNuxtLinkProps(props) : {}));

const componentIs = computed(() => (props.to ? resolveComponent("NuxtLink") : "button"));

// Computed classes for size and variant
const sizeClasses = computed(() => {
  switch (props.size) {
    case "small":
      return "text-sm py-1 px-2";
    case "large":
      return "text-lg py-3 px-6";
    default:
      return "text-base py-2 px-4";
  }
});
</script>

<template>
  <component
    :is="componentIs"
    v-bind="linkProps"
    :type="type"
    :class="[
      'inline-flex bg-ipuc-blue-800 items-center justify-center rounded-xl px-4 py-2 cursor-pointer text-white',
      sizeClasses,
      classColor,
    ]"
  >
    <!-- Slot for icon before text -->
    <slot name="icon-left"></slot>

    <!-- Button label/text -->
    <span v-if="label" class="mx-2">
      {{ label }}
    </span>
    <slot> </slot>

    <!-- Slot for icon after text -->
    <slot name="icon-right"></slot>
  </component>
</template>

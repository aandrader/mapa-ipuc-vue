<script setup lang="ts">
// Define the props with types
const props = defineProps({
  label: String,
  size: String,
  classColor: String,
  ...nuxtLinkProps,
});

const linkProps = computed(() => (props.to ? getNuxtLinkProps(props) : {}));

const componentIs = computed(() => (props.to ? resolveComponent("NuxtLink") : "button"));

// Define the emits with type inference
const emit = defineEmits<{
  (e: "click"): void;
}>();

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

// Emit the click event
function onClick() {
  emit("click");
}
</script>

<template>
  <component
    :is="componentIs"
    v-bind="linkProps"
    :class="[
      'inline-flex items-center justify-center rounded-xl px-4 py-2 cursor-pointer text-white',
      sizeClasses,
      classColor,
    ]"
    @click="onClick"
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

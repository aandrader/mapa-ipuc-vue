<script setup lang="ts">
definePageMeta({
  layout: "dashboard-header",
  auth: {
    unauthenticatedOnly: false,
    navigateUnauthenticatedTo: "/login",
  },
});

const { data } = useAuth();
const type = ref(data.value?.user.type);
</script>

<template>
  <TempleForm v-if="type === 'temple'"></TempleForm>
  <DistrictTable v-if="type === 'admin'"></DistrictTable>
</template>

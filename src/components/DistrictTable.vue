<script setup lang="ts">
import type { fetchTemplesByDistrictAdminType } from "~/server/queries";

const { data } = useAuth();

const { data: temples } = await useFetch<fetchTemplesByDistrictAdminType>(
  "/api/fetch-temples-district-admin/" + data.value?.user.id
);
</script>

<template>District table {{ temples }}</template>

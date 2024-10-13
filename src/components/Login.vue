<script setup lang="ts">
import type { fetchTemplesByDistrictType } from "../server/queries";

const routes = useRoute();
const { data: users } = await useFetch("/api/fetch-users");

const selectedDistrict = ref(routes.query.d || "");
const selectedTemple = ref(routes.query.temple || "");
const password = ref("");

const temples = ref<fetchTemplesByDistrictType>([]);
watch(
  selectedDistrict,
  async () => {
    if (selectedDistrict.value !== "") {
      temples.value = await $fetch<fetchTemplesByDistrictType>(
        "/api/fetch-temples-district/" + selectedDistrict.value
      );
    }
  },
  { immediate: true }
);

const { signIn, status } = useAuth();

const login = async () => {
  await signIn("credentials", {
    selectedDistrict: selectedDistrict.value,
    selectedTemple: selectedTemple.value,
    password: password.value,
  });
};
</script>

<template>
  {{ status }}
  <form @submit.prevent="login" class="flex flex-col gap-2">
    <h1 class="text-center font-medium text-2xl text-white mb-2">Panel administrativo Mapa Ipuc</h1>

    <select v-model="selectedDistrict" class="rounded-lg px-2 w-full" required>
      <option disabled value="">Seleccionar distrito</option>
      <option v-for="user in users" :key="user.distrito" :value="user.distrito">
        Distrito {{ user.distrito }}
      </option>
    </select>

    <select v-model="selectedTemple" class="rounded-lg px-2 w-full" required>
      <option disabled value="">Seleccionar templo</option>
      <option value="admin">Admin</option>
      <option v-for="temple in temples" :key="temple.id" :value="temple.id">
        {{ temple.congregacion }} - {{ temple.municipio }}
      </option>
    </select>

    <input
      v-model="password"
      class="rounded-lg px-3 py-1"
      type="password"
      name="password"
      placeholder="Contraseña"
      required
    />

    <!-- <ForgetPassword /> -->
    <button
      class="rounded-lg bg-white hover:bg-white/80 text-ipuc-blue-800 font-medium disabled:bg-slate-400"
    >
      Iniciar sesión
    </button>
    <!-- <SubmitButton :pending="pending" /> -->
  </form>
</template>

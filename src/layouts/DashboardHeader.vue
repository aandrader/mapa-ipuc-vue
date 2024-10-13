<script setup lang="ts">
const { signOut, data, status } = useAuth();
if (status.value === "unauthenticated") navigateTo("/login");
const user = ref(data.value?.user);
</script>
<template>
  <header
    class="w-full bg-ipuc-blue-800 flex p-3 gap-2 text-white justify-between items-center sticky top-0 text-sm above-map"
  >
    <NuxtLink
      to="/"
      class="rounded-2xl flex font-medium bg-blue-700 text-white text-nowrap w-fit gap-2 py-2 px-3 text-xl"
    >
      <h1 class="hidden md:block">Mapa Ipuc</h1>
      <!-- <MapsIcon class="size-[28px]" /> -->
    </NuxtLink>
    <h1 v-if="user.type === 'admin'" class="md:text-xl font-medium">
      Distrito {{ data?.user.id }} Panel administrativo
    </h1>
    <h1 v-else class="md:text-xl font-medium">Panel administrativo</h1>
    <div className="hidden md:flex gap-2">
      <Button className="bg-ipuc-blue-600 hover:bg-ipuc-blue-600/50 flex gap-2" size="sm" type="button">
        <!-- <KeyRound /> -->
        Cambiar contraseña
      </Button>

      <Button
        className=" bg-ipuc-blue-600 hover:bg-ipuc-blue-600/50 flex gap-2"
        size="sm"
        @click="async () => await signOut({ callbackUrl: '/login' })"
      >
        <!-- <LogOut /> -->
        Cerrar sesión
      </Button>
    </div>
  </header>
  <slot></slot>
</template>

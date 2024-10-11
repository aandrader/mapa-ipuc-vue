<template>
  <div class="w-screen h-screen grid place-items-center bg-ipuc-blue-800">
    <NuxtLink
      to="/"
      class="absolute top-2 left-2 rounded-2xl flex font-medium bg-blue-700 text-white text-nowrap w-fit gap-2 py-2 px-3 text-xl"
    >
      <h1>Mapa Ipuc</h1>
      <!-- <MapsIcon className="size-[28px]" /> -->
    </NuxtLink>
    <div class="h-[400px] max-w-[90vw] grid place-items-center">
      <Login></Login>
    </div>
  </div>
</template>

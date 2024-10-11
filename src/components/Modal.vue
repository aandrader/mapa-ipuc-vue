<script setup lang="ts">
import type { fetchTempleIdType } from "../server/queries";
const router = useRoute();

const { data: temple } = await useFetch<fetchTempleIdType>("/api/fetch-temple/" + router.params.templeId);
const imgUrl = computed(() => getImgUrl(temple.value?.imagen!! && temple.value?.id));
const shareTemple = () => {
  navigator.share({ url: window.location.href });
};
const classButtons = "flex text-xs items-center gap-2 cursor-pointer hover:text-blue-600";
</script>
<template>
  <div class="absolute card absolute-center-y left-5 w-[300px] z-[1000] overflow-hidden">
    <div class="overflow-auto lg:w-fit h-fit box-content max-h-[95vh]">
      <NuxtLink class="absolute right-0 translate-y-[25%] translate-x-[-25%] z-10" to="/">
        <!-- <X size={36} class="text-white rounded-full p-1 bg-black/30" /> -->
      </NuxtLink>
      <div class="relative w-full h-[230px]">
        <NuxtImg :src="imgUrl" sizes="300px" alt="Foto iglesia" />
      </div>
      <h1 class="text-2xl text-center font-medium break-words p-2">{{ temple!.congregacion }}</h1>
      <div class="border-t border-solid border-gray-300 px-4 py-3 grid grid-cols-[2fr_1fr]">
        <div class="flex justify-center items-start flex-col">
          <li v-for="service in temple!.horarios" class="font-medium" key="{service.dia}">
            <b>{{ service.dia }}</b
            >: {{ format12Hour(service.hora) }}
          </li>
        </div>
        <div class="grid grid-cols-1 gap-1 place-items-center">
          <Button v-if="temple?.facebook" :to="temple.facebook" classColor="bg-blue-600 hover:bg-blue-700">
            <!-- <FacebookIcon /> -->
          </Button>

          <Button v-if="temple?.youtube" :to="temple.youtube" classColor="bg-red-600 hover:bg-red-700">
            <!-- <YoutubeIcon /> -->
          </Button>

          <Button
            v-if="temple?.instagram"
            :to="temple.instagram"
            classColor="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]"
          >
            <!-- <Instagram class="size-5" /> -->
          </Button>
          <Button v-if="temple?.pagina" :to="temple.pagina" classColor="bg-gray-400 hover:bg-gray-500">
            <!-- <WebIcon /> -->
          </Button>
        </div>
      </div>
      <div class="grid grid-cols-2 p-4 border-t border-solid border-gray-300 text-ipuc-blue-500">
        <div @click="shareTemple" :class="classButtons">
          <!-- <ShareIcon /> -->
          <span>Compartir congregación</span>
        </div>
        <NuxtLink :to="'/login?temple=' + temple?.id + '&d=' + temple?.distrito" :class="classButtons">
          <!-- <FeedbackIcon /> -->
          <span>Actualizar información</span>
        </NuxtLink>
      </div>

      <div class="grid place-items-center p-3 border-t border-solid border-gray-300 sticky bottom-0 bg-white">
        <Button
          :to="'https://www.google.com/maps/place/' + temple?.coordenadas!.join(',')"
          target="_blank"
          classColor="w-full font-medium bg-gradient-to-r from-ipuc-blue-700 to-blue-500"
          >Ir al templo</Button
        >
      </div>
    </div>
  </div>
</template>

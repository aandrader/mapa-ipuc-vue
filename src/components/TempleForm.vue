<script setup lang="ts">
import type { fetchTempleIdType } from "~/server/queries";

const { data } = useAuth();

const { data: temple } = await useFetch<fetchTempleIdType>("/api/fetch-temple/" + data.value?.user.id);

const initial = ref({
  facebook: temple.value?.facebook ?? "",
  youtube: temple.value?.youtube ?? "",
  instagram: temple.value?.instagram ?? "",
  pagina: temple.value?.pagina ?? "",
  services: temple.value?.horarios ?? [],
});

const state = reactive(initial);
const { facebook, youtube, instagram, pagina, services } = toRefs(state.value);
const readOnly = ref(true);

provide(readOnlyKey, readOnly);

const onReset = () => {
  //   e.preventDefault();
  //   e.target?.closest("form").reset();
  state.value = initial.value;
  // setImageUrl(initialImg);
  // if (imageUrl) URL.revokeObjectURL(imageUrl);
  // setTempleLocation(initialCoordinates);
  // if (map) map.fire("refresh", { templeLocation: initialCoordinates });
  readOnly.value = true;
};

const onSubmit = () => {
  console.log(toValue(state));
};
</script>

<template>
  <form @submit.prevent="onSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-10 p-4 md:h-[calc(100vh-68px)]">
    <div class="flex flex-col gap-2">
      <div class="grid grid-cols-1 gap-2">
        <div>
          <h2 class="text-xl text-blue-ipuc-800 font-medium">{{ temple!.congregacion }}</h2>
          <span class="font-medium text-blue-ipuc-600">
            {{ temple!.municipio }} - Distrito {{ temple!.distrito }}
          </span>
        </div>
        <div v-if="readOnly" class="flex gap-2 items-center">
          <Button type="button" @click="readOnly = false"> Actualizar información </Button>
        </div>
        <div v-else class="flex gap-2 items-center">
          <Button type="button" @click="onReset"> Cancelar </Button>
          <Button type="submit">Guardar información</Button>
        </div>
        <!-- {isLoading && <LoaderCircleIcon strokeWidth={3} class="animate-spin" />} -->
      </div>

      <InputLabel label="Link de página de Facebook" v-model="facebook" />
      <InputLabel label="Link de página de Youtube" v-model="youtube" />
      <InputLabel label="Link de Instagram" v-model="instagram" />
      <InputLabel label="Link de página general" v-model="pagina" />
      <Schedule v-model="services" />
    </div>

    <!-- <div class="flex flex-col gap-4 pb-2">
        <FormMap map={map} templeLocation={templeLocation} readOnly={readOnly} />
        <TemplePhoto
          imageUrl={imageUrl}
          readOnly={readOnly}
          setImageBlob={setImageBlob}
          setImageUrl={setImageUrl}
        />
      </div> -->
  </form>
</template>

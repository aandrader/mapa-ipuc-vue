<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import type { LatLngTuple, Map } from "leaflet";

const readOnly = inject(readOnlyKey)!;

const props = defineProps<{ templeLocation: LatLngTuple | null; mapRef: Map | undefined }>();
const { templeLocation, mapRef } = toRefs(props);
const mapId = useId();

const getLocation = () => {
  if (navigator.geolocation) {
    mapRef.value!.locate({ enableHighAccuracy: true });
    // } else {
    //   toast({
    //     title: "Error",
    //     variant: "error",
    //     description: "El navegador que estas usando no admite obtener tu ubicacion actual.",
    //   });
  }
};

const initPreviewMap = async () => {
  const L = await import("leaflet");
  const mapDiv = document.getElementById(mapId);
  mapDiv?.classList.remove("skeleton");

  const initialCoordinates = templeLocation.value ?? [6.23, -75.58];
  const initialZoom = templeLocation.value ? 15 : 4;

  const map = L.map(mapId, { zoomControl: false }).setView(initialCoordinates, initialZoom) as Map;

  L.control.zoom({ position: "bottomright" }).addTo(map);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution:
      '&copy; <&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  }).addTo(map);

  const markerGroup = L.layerGroup().addTo(map);
  const icon = L.divIcon({ html: churchMarker, className: "" });

  if (templeLocation.value) {
    const marker = L.marker(templeLocation.value, { icon: icon }).on("click", () => {
      map.flyTo(templeLocation.value!, 16, { duration: 1.5 });
    });
    markerGroup.addLayer(marker);
  }

  map.on("locationfound", (e) => {
    markerGroup.clearLayers();
    const userLocation = [e.latlng.lat, e.latlng.lng] as [number, number];
    userLocationRef.value = userLocation;
    map.flyTo(userLocation, 16, { duration: 1.5 });
    const marker = L.marker(userLocation, { icon: icon }).on("click", () => {
      map.flyTo(userLocation, 16, { duration: 1.5 });
    });
    markerGroup.addLayer(marker);
  });

  map.on("refresh", (e) => {
    markerGroup.clearLayers();
    const initialCoordinates = (e as any).templeLocation;
    if (!initialCoordinates) return;

    templeLocation.value = initialCoordinates;
    map.flyTo(initialCoordinates, 16, { duration: 1.5 });
    const marker = L.marker(initialCoordinates, { icon: icon }).on("click", () => {
      map.flyTo(initialCoordinates, 16, { duration: 1.5 });
    });

    markerGroup.addLayer(marker);
  });

  mapRef.value = map;
};

const { userLocation: userLocationRef } = storeToRefs(useMapStore());

onMounted(initPreviewMap);
onUnmounted(() => {
  mapRef.value?.remove();
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <p>Ubicación</p>
    <div :id="mapId" class="w-full h-[40vh] skeleton"></div>
    <!-- <Alert v-if="!readOnly" variant="destructive">
        <Info class="h-4 w-4" />
        <AlertTitle>Advertencia</AlertTitle>
        <AlertDescription>
          Para obtener la ubicación del templo, es necesario pararse en la entrada del mismo y con el botón a
          continuación actualizar la ubicación únicamente desde un celular o una tablet, ya que estos cuentan
          con una geolocalización más precisa.
        </AlertDescription>
      </Alert> -->
    <div class="grid grid-cols-1 md:flex gap-2">
      <Button v-if="!readOnly" type="button" class="w-full" @click="getLocation">
        Actualizar ubicación
      </Button>

      <Button
        v-if="templeLocation"
        class="w-[100%] font-medium bg-gradient-to-r from-ipuc-blue-700 to-blue-500"
        :to="'https://www.google.com/maps/place/' + templeLocation.join(',')"
      >
        <!-- <MapsIcon />  -->
        Ir al templo
      </Button>
    </div>
  </div>
</template>

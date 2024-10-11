<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import type { Map } from "leaflet";
import type { fetchTempleIdType } from "~/server/queries";

const temples = inject(templesKey)!;

const mapId = useId();

async function isLocationAllowed() {
  try {
    const result = await navigator.permissions.query({ name: "geolocation" });
    return result.state === "granted";
  } catch (error) {
    console.error("Error checking location permission:", error);
    return false;
  }
}

function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true });
  });
}

const setInitialView = async (map: Map) => {
  if (location.pathname !== "/") {
    const templeId = location.pathname.split("/").at(-1)!;
    const { coordenadas } = await $fetch<fetchTempleIdType>("/api/fetch-temple/" + templeId);

    map.setView(coordenadas!, 16) as Map;
    map.locate({ enableHighAccuracy: true });
  } else if (await isLocationAllowed()) {
    const pos = await getCurrentPosition();
    map.setView([pos.coords.latitude, pos.coords.longitude], 13);
    map.fire("locationfound", { latlng: { lat: pos.coords.latitude, lng: pos.coords.longitude } });
  } else {
    map.setView([6.23, -75.58], 13);
    map.locate({ enableHighAccuracy: true });
  }
};

const initMap = async () => {
  const L = await import("leaflet");
  const mapDiv = document.getElementById(mapId);
  mapDiv?.classList.remove("skeleton");

  const map = L.map(mapId, { zoomControl: false });
  L.control.zoom({ position: "bottomright" }).addTo(map);

  map.on("locationfound", (e) => {
    userLocation.value = [e.latlng.lat, e.latlng.lng];
    const icon = L.divIcon({ html: locationMarker, className: "" });
    L.marker([e.latlng.lat, e.latlng.lng], { icon: icon }).addTo(map);
    if (location.pathname === "/") map.flyTo(e.latlng, 13);
  });

  await setInitialView(map);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution:
      '&copy; <&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  }).addTo(map);

  for (const { id, coordenadas } of temples) {
    const icon = L.divIcon({ html: churchMarker, className: "" });
    const marker = L.marker(coordenadas!, { icon: icon }).on("click", () => {
      navigateTo(`/${id}`);
      map.flyTo(coordenadas!, 16, { duration: 1.5 });
    });
    marker.addTo(map);
  }

  mapRef.value = map;
};

const { map: mapRef, userLocation } = storeToRefs(useMapStore());
onMounted(initMap);
onUnmounted(() => {
  mapRef.value?.remove();
});
</script>

<template>
  <div :id="mapId" class="w-screen h-screen skeleton"></div>
</template>

<style scoped>
.skeleton {
  background-color: #ddd; /* Light gray color */
  position: relative;
  overflow: hidden;
}

.skeleton::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(#dddddd 0%, #eee 50%, #dddddd 100%);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}
</style>

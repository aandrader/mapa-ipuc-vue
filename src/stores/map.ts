import type { Map, LatLngTuple } from "leaflet";
interface State {
  map: Map | null;
  userLocation: LatLngTuple | [];
}

export const useMapStore = defineStore("mapStore", {
  state: (): State => ({
    map: null,
    userLocation: [],
  }),
  //   actions: {
  //     setMap(map: Map) {
  //       this.map = map;
  //     },
  //     setUserLocation(userLocation: LatLngTuple) {
  //       this.userLocation = userLocation;
  //     },
  //   },
});

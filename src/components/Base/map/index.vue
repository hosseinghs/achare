<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ILocation } from './type'
import findMe from '@/assets/images/find-me.jpg'
import mapMarker from '@/assets/images/map-marker.webp'
const emits = defineEmits<{
	(e: 'update:model-value', value: ILocation): void;
}>();

const props = defineProps<{
  vModel: ILocation
}>()

interface ILatLng {
  latlng: ILocation
}

const marker = ref(null)
const mapInstance = ref(null)

function createEl (el: 'script', url: string) {
  const script = document.createElement(el)

  script.type = 'text/javascript'

  script.src = url

  document.body.appendChild(script)

  return script
}

function updateLatLang (latlang: ILocation) {
  emits('update:model-value', latlang)
}

function initMap() {
  const neshanScript = createEl('script', 'https://static.neshan.org/sdk/leaflet/1.4.0/leaflet.js');

  neshanScript.onerror = (e) => console.log('error', e);
  console.log(import.meta);

  neshanScript.onload = () => {
    const map = new L.Map('map', {
      poi: true,
      key: import.meta.env.VITE_NESHAN_KEY,
      center: [35.6961111111, 51.4230555556],
      zoom: 12,
      traffic: false,
      maptype: 'neshan',
    });

    mapInstance.value = map;

    const initialLatLng = {
      lat: props.vModel?.lat ?? 35.6961111111,
      lng: props.vModel?.lng ?? 51.4230555556,
    };

    const markerIcon = L.icon({
      iconUrl: mapMarker,
      iconSize: [24, 32],
      iconAnchor: [8, 30],
    });

    marker.value = L.marker(initialLatLng, { icon: markerIcon }).addTo(mapInstance.value);

    // Custom Locate Button
    const locateControl = L.Control.extend({
      onAdd: () => {
        const btn = L.DomUtil.create('button', 'locate-button');
        btn.innerHTML = `<img src="${findMe}" alt="find me" style="width: 15px; height: 15px;" />`; // Use an image icon
        btn.style.backgroundColor = 'white';
        btn.style.border = '1px solid #ccc';
        btn.style.cursor = 'pointer';

        btn.onclick = () => {
          mapInstance.value!.locate({
            setView: true,
            enableHighAccuracy: true,
          }).on('locationfound', (e: L.LocationEvent) => {
            const latlng = e.latlng;
            marker.value!.setLatLng(latlng);
            updateLatLang(latlng);
          }).on('locationerror', (error) => {
            console.error('Location error:', error.message);
          });
        };

        return btn;
      },
    });

    map.addControl(new locateControl({ position: 'bottomright' })); // Add the button to the map
  };
}

onMounted(() => initMap())

</script>

<template>
  <link
    href="https://static.neshan.org/sdk/leaflet/1.4.0/leaflet.css"
    rel="stylesheet"
    type="text/css"
  >
  <div class="relative-position">
    <div
      id="map"
      class="map-wrapper"
    />
  </div>
</template>

<style scoped lang="sass">
div.map-wrapper
  width: 100%
  height: 450px
  position: relative
  background-color: #eeeeee

.locate-button
  font-size: 14px
  border-radius: 4px
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2)
</style>

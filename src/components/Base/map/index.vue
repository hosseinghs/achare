<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ILocation } from './type'
import mapMarker from '@/assets/images/map-marker.webp'

const emits = defineEmits<{
	(e: 'update:model-value', value: ILocation): void;
}>();

const props = defineProps<{
  vModel: ILocation
}>()

const marker = ref(null)
const mapInstance = ref(null)

function createEl (el, url) {
  const script = document.createElement(el)

  script.type = 'text/javascript'

  script.src = url

  document.body.appendChild(script)

  return script
}

function updateLatLang (latlang: ILocation) {
  emits('update:model-value', latlang)
}

function getLocation () {
  mapInstance.value.locate({
    setView: true,
    enableHighAccuracy: true
  }).on('locationfound', ({ latlng }) => {
    marker.value.setLatLng(latlng)
    updateLatLang(latlng)
  })
}

function initMap () {
  const neshanScript = createEl('script', 'https://static.neshan.org/sdk/leaflet/1.4.0/leaflet.js')

  neshanScript.onerror = (e) => console.log('error', e)

  neshanScript.onload = () => {
    const map = new L.Map('map', {
      poi: true,
      key: 'web.44cb547d8a494e51b43b3c3bd237cefa',
      center: [35.6961111111, 51.4230555556],
      zoom: 12,
      traffic: false,
      maptype: 'neshan'
    })

    mapInstance.value = map

    const initialLatLng = {
      lat: props.lat ?? null,
      lng: props.lng ?? null
    }

    const markerIcon = L.icon({
      iconUrl: mapMarker,
      iconSize: [24, 32],
      iconAnchor: [8, 30]
    })

    marker.value = L.marker(initialLatLng, { icon: markerIcon }).addTo(mapInstance.value)
    marker.value.tooltip = L.tooltip()

    mapInstance.value.on('click', ({ latlng }) => {
      marker.value.setLatLng(latlng)

      updateLatLang(latlng)
    })
  }
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

button.find-location-btn
  left: 16px
  bottom: 16px
</style>

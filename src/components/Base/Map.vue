<script setup lang="ts">
import NeshanMap from "@neshan-maps-platform/vue3-openlayers"
import { Map } from "@neshan-maps-platform/ol"

function onInit(map: Map) {
    const view = map.getView()
    view.animate({
        center: [59.5870851, 36.311559],
        zoom: 11,
        duration: 1000,
    })
}
</script>

<template>
  <div class="map-container">
      <NeshanMap
          defaultType="neshan"
          mapKey="web.911110f499b34be397f23cd2cee474eb"
          serviceKey="YOUR_SERVICE_KEY"
          :center="{latitude: 36.311559, longitude: 59.5870851}"
          :zoom="14"
          :poi="true"
          @on-init="onInit"
      />
  </div>
</template>

<style >
@import url("@neshan-maps-platform/vue3-openlayers/dist/style.css");
.map-container {
  width: 100%;
  height: 400px;
}
</style>

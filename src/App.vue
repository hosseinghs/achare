<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import routes from '@/router/routes'

const route = useRoute()

const currentRouteName = computed(() => route.name)
</script>

<template>
  <header class="d-flex align-items-center justify-content-between mb-4">
    <img alt="achare" src="@/assets/images/achareh.webp" />
    <div>
      <nav class="px-2">
        <RouterLink v-for="{ name, meta } in routes" :key="name" :to="{ name }" :class="['mx-1', { 'primary': name === currentRouteName }]">
          {{ meta.title }}
        </RouterLink>
      </nav>
    </div>
  </header>

  <div class="px-4 py-1">
    <RouterView />
  </div>

</template>

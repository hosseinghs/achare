<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="d-flex align-items-center justify-content-between">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50" height="50" />
    <div>
      <nav class="px-2">
        <RouterLink to="/">ثبت آدرس</RouterLink>
        <RouterLink to="/about" class="me-2">مشاهده آدرس ها</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />


</template>

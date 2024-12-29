<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const UserFormInfo = defineAsyncComponent(() => import('@/components/address-page/UserInfoForm.vue'))

</script>


<template>
  <div>
    <UserFormInfo />
  </div>
</template>

<script lang="ts" setup>
import { getAllAddresseAPI } from '@/services/address'
import { ref } from 'vue'
import AddressCardInfo from '@/components/address/AddressCardInfo.vue'
import AddressEmptyList from '@/components/address/AddressEmptyList.vue'
import AddressListLoading from '@/components/address/AddressListLoading.vue'
import type { IAddress } from '@/services/type'

const loading = ref(false)
const addressList = ref<IAddress[]>([])

const getAllAddress = async () => {
  try {
    loading.value = true
    const result = await getAllAddresseAPI()
    addressList.value = result
  } finally {
    loading.value = false
  }
}

getAllAddress()

</script>

<template>
  <div class="container">
    <h5>آدرس ها و مشخصات</h5>
    <AddressListLoading v-if="loading" />
    <div v-else-if="!loading && addressList.length">
      <AddressCardInfo v-for="address in addressList" :address="address" :key="address.id" class="mb-4" />
    </div>
    <AddressEmptyList v-else />
  </div>
</template>

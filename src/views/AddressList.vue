<script lang="ts" setup>
import { getAllAddresseAPI } from '@/services/address'
import { ref } from 'vue'
import AddressCardInfo from '@/components/address-page/AddressCardInfo.vue'

const loading = ref(false)
const addressList = ref([])


const getAllAddress = async () => {
  try {
    loading.value = true
    const { data } = await getAllAddresseAPI()
    addressList.value = data
  } finally {
    loading.value = false
  }
}

getAllAddress()

</script>

<template>
  <div class="container">
    <h5>آدرس ها و مشخصات</h5>
    <div v-if="loading">
      we r loading huge data =)
      please be patient
    </div>
    <div v-else-if="!loading && addressList.length">
      <AddressCardInfo v-for="address in addressList" :address="address" :key="address.id" class="mb-4" />
    </div>
    <div v-else>
      no data
    </div>
  </div>
</template>

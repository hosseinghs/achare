<script lang="ts" setup>
import { getAllAddresseAPI } from '@/services/address'
import { ref } from 'vue'
import AddressCardInfo from '@/components/address/AddressCardInfo.vue'
import AddressEmptyList from '@/components/address/AddressEmptyList.vue'
import AddressListLoading from '@/components/address/AddressListLoading.vue'
import type { IAddress } from '@/services/type'

const loading = ref(false)
const addressList = ref<IAddress[]>([])
const renderedAddressList = ref<IAddress[]>([])

const handleRenderingData = () => {
  if (renderedAddressList.value.length) {
    const length = renderedAddressList.value.length - 1
    const newAddresses = addressList.value.splice(length, 10)
    renderedAddressList.value = [...renderedAddressList.value, ...newAddresses]
  } else renderedAddressList.value = addressList.value.splice(0, 10)
}

const getAllAddress = async () => {
  try {
    loading.value = true
    const result = await getAllAddresseAPI()
    addressList.value = result
    handleRenderingData()
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
    <div v-else-if="!loading && addressList.length" class="address_list">
      <template v-for="(address, i) in renderedAddressList" :key="address.id">
        <AddressCardInfo :address="address" class="mb-4" />
        <div v-if="i === renderedAddressList.length - 1" ref="observer" @scroll="handleRenderingData">last</div>
      </template>
    </div>
    <AddressEmptyList v-else />
  </div>
</template>


<style scoped lang="sass">
.address_list
  max-height: 700px
  overflow-y: scroll
  overflow-x: hidden

</style>

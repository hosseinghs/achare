<script lang="ts" setup>
import { getAllAddresseAPI } from '@/services/address'
import { ref, watch, onMounted } from 'vue'
import AddressCardInfo from '@/components/address/AddressCardInfo.vue'
import AddressEmptyList from '@/components/address/AddressEmptyList.vue'
import AddressListLoading from '@/components/address/AddressListLoading.vue'
import type { IAddress } from '@/services/type'

const loading = ref(false)
const observer = ref<HTMLElement | null>(null)
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

const interCallback = function (entries) {
  if (entries) {
    const [entry] = entries;
    if (entry.isIntersecting) handleRenderingData()
  }
};

const registerIntersectionObserver = () => {
  if (observer.value) {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    }

    const ob = new IntersectionObserver(interCallback, options)
    ob.observe(observer.value)
  }
}

onMounted(() => {
  watch(() => [observer.value, addressList.value], async () => {
    if (addressList.value.length) {
      registerIntersectionObserver()
    }
  })
})

</script>

<template>
  <div class="container">
    <h5>آدرس ها و مشخصات</h5>
    <AddressListLoading v-if="loading" />
    <div v-else-if="!loading && addressList.length" class="address_list">
      <template v-for="(address) in renderedAddressList" :key="address.id">
        <AddressCardInfo :address="address" class="mb-4" />
      </template>
      <div ref="observer" />
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

<script setup lang="ts">
import { ref, computed } from 'vue'

import type { IUserInfo } from '@/services/type'
import type { ILocation } from '@/Base/type.d.ts'
import { createAddressAPI } from '@/services/address'

import Map from '@/components/Base/map/index.vue'
import AddAddressUserForm from './AddAddressUserForm.vue'

enum LoginSteps {
  USER_FORM = 1,
  CHOOSE_LAT_LANG = 2,
}

const steps = ref<LoginSteps>(LoginSteps.USER_FORM)
const loading = ref(false)
const userForm = ref()
const form = ref<IUserInfo>({
  lat: 0,
  lng: 0,
  region: 1,
  address: '',
  gender: 'male',
  last_name: '',
  first_name: '',
  coordinate_mobile: '',
  coordinate_phone_number: '',
})

const latLang = computed({
  get() {
    return { lat: form.value.lat, lang: form.value.lng }
  },
  set({ lat, lng }: ILocation) {
    form.value = {
      ...form.value,
      lat,
      lng,
    }
  },
})

const onClick = () => {
  if (steps.value === LoginSteps.USER_FORM) {
    const isValid = userForm.value.uglyValidation()
    if (isValid) steps.value = LoginSteps.CHOOSE_LAT_LANG
  }
  else if (steps.value === LoginSteps.CHOOSE_LAT_LANG) createAddress()
}

const createAddress = async () => {
  try {
    loading.value = true
    await createAddressAPI(form.value)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <h5 class="mb-3">ثبت آدرس</h5>
  <div class="bg-white px-4 py-2">
    <AddAddressUserForm ref="userForm" v-if="steps === LoginSteps.USER_FORM" :form="form" />
    <Map v-else v-model="latLang" />
  </div>
  <div>
    <button @click="onClick">ثبت و ادامه</button>
  </div>
</template>

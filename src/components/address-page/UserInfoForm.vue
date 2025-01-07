<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import type { IUserInfo } from '@/services/type';
import type { ILocation } from '@/Base/type.d.ts'
import Map from '@/components/Base/Map.vue'
import UserForm from './UserForm.vue'
import { createAddressAPI } from '@/services/address'

enum LoginSteps {
  USER_FORM = 1,
  CHOOSE_LAT_LANG = 2
}

const loading = ref(false)
const steps = ref<LoginSteps>(LoginSteps.USER_FORM)
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
    return { lat: form.lat, lang: form.lng }
  },
  set({ lat, lng }: ILocation) {
    form.value = {
      ...form.value,
      lat,
      lng
    }
  }
})

const onClick = () => {
  if (steps.value === LoginSteps.USER_FORM) steps.value = LoginSteps.CHOOSE_LAT_LANG
  else if (steps.value === LoginSteps.CHOOSE_LAT_LANG) createAddress()
}

const createAddress = async () => {
 try {
    loading.value = true
    const res = await createAddressAPI(form.value)
    console.log(res);
  }
  finally {
    loading.value = false
  }
}

</script>

<template>
   <h5 class="mb-3 ">ثبت آدرس</h5>
    <div class="bg-white px-4 py-2">
      <UserForm v-if="steps === LoginSteps.USER_FORM" :form="form" />
      <Map v-else v-model="latLang" />
    </div>
    <div>
      <button @click="onClick">ثبت و ادامه</button>
    </div>
</template>

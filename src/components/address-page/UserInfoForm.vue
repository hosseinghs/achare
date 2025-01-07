<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { IUserInfo } from '@/services/type';
import Map from '@/components/Base/Map.vue'
import UserForm from './UserForm.vue'

enum LoginSteps {
  USER_FORM = 1,
  CHOOSE_LAT_LANG = 2
}

const steps = ref<LoginSteps>(LoginSteps.USER_FORM)
const form = reactive<IUserInfo>({
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

const onClick = () => {
  console.log(form);
  if (steps.value === LoginSteps.USER_FORM) steps.value = LoginSteps.CHOOSE_LAT_LANG
}

</script>

<template>
   <h5 class="mb-3 ">ثبت آدرس</h5>
    <div class="bg-white px-4 py-2">
      <template v-if="steps === 1">
          <UserForm :form="form" />
      </template>
      <template v-else>
        <Map />
      </template>
    </div>
    <div>
      <button @click="onClick">ثبت و ادامه</button>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { IUserInfo } from '@/services/type';
import Map from '@/components/Base/Map.vue'

const steps = ref<1 | 2>(1)
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

</script>

<template>
   <h4>ثبت آدرس</h4>
    <div class="px-4 py-2">
      <template v-if="steps === 1">
        <h5>
          لطفا مشخصات و آدرس خود را وارد کنید
        </h5>
      <div class="row gap-1 justify-content-center">
        <div class="col-3">
          <label class="d-block pb-2" for="first-name">نام</label>
          <input v-model="form.first_name" name="first-name" type="text">
        </div>
        <div class="col-3">
          <label class="d-block pb-2" for="last-name">نام خانوادگی</label>
          <input v-model="form.last_name" name="last-name" placeholder="مثال: رضایی" type="text">
        </div>
        <div class="col-3">
          <label class="d-block pb-2" for="coordinate_mobile">شماره تلفن همراه</label>
          <input v-model="form.coordinate_mobile" name="coordinate_mobile" placeholder=" مثال: ۰۹۱۲۱۲۳۴۵۶۷" type="number">
        </div>
        <div class="col-3">
          <label class="d-block pb-2" for="coordinate_phone_number">شماره تلفن ثابت (اختیاری)</label>
          <input v-model="form.coordinate_phone_number" name="coordinate_phone_number" placeholder="مثال: ۰۲۱۱۲۳۴۵۶۷" type="number">
        </div>
        <div class="col-6">
          <label class="d-block pb-2" for="address">آدرس</label>
          <input v-model="form.address" name="address" type="text">
        </div>
        <div class="col-12 d-flex mt-2">
          <label class="ms-2" for="gender">جنسیت</label>
          <input v-model="form.gender" name="gender">
        </div>
      </div>
      </template>
      <template v-else>
        <Map />
      </template>
    </div>
    <div>
      <button @click="steps = 2">ثبت و ادامه</button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  form
}>();

const computedForm = computed(() => props.form)
</script>

<template>
  <div>
    <h5>
          لطفا مشخصات و آدرس خود را وارد کنید
    </h5>
      <div class="form">
        <div class="form-item form-item">
          <label class="d-block pb-2" for="first-name">نام</label>
          <input v-model="computedForm.first_name" name="first-name" type="text">
        </div>
        <div class="form-item">
          <label class="d-block pb-2" for="last-name">نام خانوادگی</label>
          <input v-model="computedForm.last_name" name="last-name" placeholder="مثال: رضایی" type="text">
        </div>
        <div class="form-item">
          <label class="d-block pb-2" for="coordinate_mobile">شماره تلفن همراه</label>
          <input v-model="computedForm.coordinate_mobile" name="coordinate_mobile" placeholder=" مثال: ۰۹۱۲۱۲۳۴۵۶۷" >
        </div>
        <div class="form-item">
          <label class="d-block pb-2" for="coordinate_phone_number">شماره تلفن ثابت (اختیاری)</label>
          <input v-model="computedForm.coordinate_phone_number" name="coordinate_phone_number" placeholder="مثال: ۰۲۱۱۲۳۴۵۶۷">
        </div>
        <div class="form-item address">
          <label class="d-block pb-2" for="address">آدرس</label>
          <input v-model="computedForm.address" name="address" type="text">
        </div>
        <div class="form-item">
          <label class="pb-2" for="gender">جنسیت</label>
          <input v-model="computedForm.gender" name="gender">
        </div>
      </div>
  </div>
</template>

<style scoped lang="sass">
.form
  display: grid
  gap: 1rem
  grid-template-columns: repeat(3, 1fr)

  @media (max-width: 768px)
    grid-template-columns: repeat(1, 1fr)
</style>

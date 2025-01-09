<script setup lang="ts">
import { computed, reactive } from 'vue'
// import { required, maxLengthRule, phoneNumberRule, numberOnly } from '@/utils/rules';
import type { IUserInfo } from '@/services/type'
import TextField from '@/components/Base/TextField.vue';

const props = defineProps<{
  form: Omit<IUserInfo, 'region' | 'lat' | 'lng'>
}>();

const computedForm = computed(() => props.form)

const errorMessages = reactive({
  address: '',
  last_name: '',
  first_name: '',
  coordinate_mobile: '',
})

const uglyValidation = (): boolean => {
  const errText = 'این فیلد اشتباه است'

  let isValid = true
  for (const error in errorMessages) {
    errorMessages[error] = ''
  }

  if (!computedForm.value.first_name.length || computedForm.value.first_name.length < 3) {
    // err
    errorMessages.first_name = errText
    isValid = false
  }

  if (!computedForm.value.last_name.length || computedForm.value.last_name.length < 3) {
    // err
    errorMessages.last_name = errText
    isValid = false
  }

  if (!computedForm.value.coordinate_mobile.length || computedForm.value.coordinate_mobile.length !== 11) {
    // err
    errorMessages.coordinate_mobile = errText
    isValid = false
  }

  if (!computedForm.value.address.length || computedForm.value.address.length < 3) {
    // err
    errorMessages.address = errText
    isValid = false
  }

  return isValid
}

defineExpose({
  uglyValidation
})

</script>

<template>
  <div>
    <h5>
          لطفا مشخصات و آدرس خود را وارد کنید
    </h5>
      <div class="form">
        <div class="form-item form-item">
          <TextField v-model="computedForm.first_name" name="first-name" label="نام" :error-msg="errorMessages.first_name" />
        </div>
        <div class="form-item">
          <TextField v-model="computedForm.last_name" name="last-name" label="نام خانوادگی" :error-msg="errorMessages.last_name" />
        </div>
        <div class="form-item">
          <TextField v-model="computedForm.coordinate_mobile" name="coordinate-mobile" label="شماره تلفن همراه" :error-msg="errorMessages.coordinate_mobile" />
        </div>
        <div class="form-item">
          <TextField v-model="computedForm.coordinate_phone_number" name="coordinate-phone-number" label="شماره تلفن ثابت (اختیاری)" />
        </div>
        <div class="form-item address">
          <TextField v-model="computedForm.address" name="address" label="آدرس" :error-msg="errorMessages.address" />
        </div>
        <div class="form-item">
          <div class="d-flex align-items-center">
              <label for="gender" class="ms-4">جنسیت</label>
              <fieldset class="d-flex items-center">
              <span class="ms-4">
                <input v-model="computedForm.gender" value="male" name="male-gender" type="radio">
                <label class="me-1" for="male-gender">آقا</label>
              </span>
              <span>
                <input v-model="computedForm.gender" value="female" name="female-gender" type="radio">
                <label class="me-1" for="female-gender">خانم</label>
              </span>
            </fieldset>
          </div>
        </div>
      </div>
  </div>
</template>

<style scoped lang="sass">
.form
  input
    width: auto
  display: grid
  gap: 1rem
  grid-template-columns: repeat(3, 1fr)

  .form-item.address
    grid-column: span 2

  @media (max-width: 768px)
    grid-template-columns: repeat(1, 1fr)

    .form-item.address
      grid-column: span 1
</style>

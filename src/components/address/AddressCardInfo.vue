<script setup lang="ts">
import type { IAdress } from '@/services/type.d.ts'

defineProps<{
  address: IAdress
}>()

const showGender = (g?: 'male' | 'female'): string => {
  if(!g?.length) return '-'
  return g === 'male' ? 'آقا' : 'خانم'
}

</script>

<template>
  <div class="container bg-white p-4">
    <!-- Desktop Layout -->
    <div class="d-none d-md-flex row">
      <div class="col-md-3">
        <div class="info-item">
          <div class="label">نام</div>
          <div class="value">{{ address.first_name }}</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="info-item">
          <div class="label">نام خانوادگی</div>
          <div class="value">{{ address.last_name }}</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="info-item">
          <div class="label">شماره تلفن همراه</div>
          <div class="value">{{ address.coordinate_mobile }}</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="info-item">
          <div class="label">شماره تلفن ثابت</div>
          <div class="value">{{ address.coordinate_phone_number }}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="info-item">
          <div class="label">آدرس</div>
          <div class="value">{{ address.address }}</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="info-item">
          <div class="label">جنسیت</div>
          <div class="value">{{ showGender(address.gender) }}</div>
        </div>
      </div>
    </div>

    <!-- Mobile Layout -->
    <div class="d-flex d-md-none flex-column">
      <div class="info-item mb-3">
        <div class="label">نام و نام خانوادگی:</div>
        <div class="value">{{ address.first_name }} {{ address.last_name }}</div>
      </div>
      <div class="info-item mb-3">
        <div class="label">جنسیت:</div>
        <div class="value">{{ showGender(address.gender) }}</div>
      </div>
      <div class="info-item mb-3">
        <div class="label">شماره تلفن همراه:</div>
        <div class="value">{{ address.coordinate_mobile }}</div>
      </div>
      <div class="info-item mb-3">
        <div class="label">شماره تلفن ثابت:</div>
        <div class="value">{{ address.coordinate_phone_number }}</div>
      </div>
      <div class="info-item mb-3">
        <div class="label">آدرس:</div>
        <div class="value">{{ address.address }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.info-item
  margin-bottom: 1rem

.label
  font-weight: bold
  color: #343a40
  margin-bottom: 0.5rem

.value
  color: #6c757d

// Desktop-specific styling
@media (min-width: 768px)
  .info-item
    display: flex
    flex-direction: column
    text-align: start

  .label
    margin-bottom: 0.25rem

// Mobile-specific styling
@media (max-width: 767px)
  .info-item
    display: flex
    justify-content: space-between
    align-items: center

  .label
    margin-bottom: 0
</style>

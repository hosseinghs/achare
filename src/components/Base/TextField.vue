<script setup lang="ts">
import { computed } from 'vue';

const emits = defineEmits<{
  (e: 'update:model-value', value: string): void;
}>()

const props = defineProps<{
  name: string;
  label: string;
  errorMsg?: string;
  modelValue: string;
}>();

const inputValue = computed({
  set: (v: string) => emits('update:model-value', v),
  get: () => props.modelValue,
})

</script>

<template>
  <div>
    <label class="d-block pb-2" :for="name">{{ label }}</label>
    <input v-bind="$attrs" v-model="inputValue" :name="name" :class="{ 'invalid-input': errorMsg?.length }">
    <span v-if="errorMsg?.length" class="text-error">{{ errorMsg }}</span>
  </div>
</template>

<style scoped lang="sass">

span.text-error
  font-size: 10px
  font-weight: 400
  line-height: 32px

</style>

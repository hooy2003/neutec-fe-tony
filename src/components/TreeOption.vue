<script setup lang="ts">
import { PropType } from 'vue'
import { defaultTree } from '../types/jsonType'

const props = defineProps({
  type: {
    type: String,
    default: ''
  },
  subType: {
    type: Array as PropType<defaultTree[]>,
    default: []
  },
  id: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <option :value="props.id">
    {{ props.type }}
  </option>
  <TreeOption
    v-for="item in props.subType"
    :type="item.type" 
    :subType="item.subType"
    :id="item.id"
  ></TreeOption>
</template>
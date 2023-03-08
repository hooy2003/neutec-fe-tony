<script setup lang="ts">
import { onMounted, computed } from 'vue'
import TreeMenu from './TreeMenu.vue'
import TreeOption from './TreeOption.vue'
import navStore from '../stores/navStore'

onMounted(()=>{
  navStore.actions.callApi()
})

const drinkList = computed(() => navStore.state.defaultList)

const selectValue = computed({ 
  get: () => navStore.state.selectId,
  set: (value) => navStore.actions.selectItem(value)
}) 
</script>

<template>
  <h1 style="color: #213547;">
    Nav
  </h1>
  <div>
    <TreeMenu 
      v-for="(item, index) in drinkList"
      :type="item.type" 
      :color="item.color"
      :subType="item.subType" 
      :layer="1"
      :index="index"
      :id="item.id"
    ></TreeMenu>
  </div>
  <div style="text-align: left;">
    <select 
      id="tree-select"
      v-model="selectValue"
    >
      <option value="-1" selected disabled hidden>Select an option</option>
      <TreeOption
        v-for="item in drinkList"
        :type="item.type" 
        :subType="item.subType" 
        :id="item.id"
      ></TreeOption>
    </select>
  </div>
</template>
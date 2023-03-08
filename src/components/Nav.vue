<script setup lang="ts">
import { onMounted, computed } from 'vue'
import TreeMenu from './TreeMenu.vue'
import TreeLargeMenu from './TreeLargeMenu.vue'
import TreeOption from './TreeOption.vue'
import navStore from '../stores/navStore'

onMounted(()=>{
  navStore.actions.callApi()
  navStore.actions.callLargeApi()
})

const drinkList = computed(() => navStore.state.defaultList)
const drinkLargeList = computed(() => navStore.state.largeList)

const selectValue = computed({ 
  get: () => navStore.state.selectId,
  set: (value) => navStore.actions.selectItem(value)
})
const selectLargeValue = computed({ 
  get: () => navStore.state.selecLargetId,
  set: (value) => navStore.actions.selectLargeItem(value)
}) 
</script>

<template>
  <h2 style="color: #213547;">
    Nav
  </h2>
  <h3 style="color: #213547;">範例資料格式</h3>
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
  <div style="text-align:left;padding: 10px 0;">
    <select
      v-model="selectValue"
    >
      <option value="-1" selected disabled hidden>-</option>
      <TreeOption
        v-for="item in drinkList"
        :type="item.type" 
        :subType="item.subType" 
        :id="item.id"
      ></TreeOption>
    </select>
  </div>
  <hr>
  <h3 style="color: #213547;">20層資料格式</h3>
  <div>
    <TreeLargeMenu 
      v-for="(item, index) in drinkLargeList"
      :type="item.type" 
      :color="item.color"
      :subType="item.subType" 
      :layer="1"
      :index="index"
      :id="item.id"
    ></TreeLargeMenu>
  </div>
  <div style="text-align:left;padding: 10px 0;">
    <select
      v-model="selectLargeValue"
    >
      <option value="-1" selected disabled hidden>-</option>
      <TreeOption
        v-for="item in drinkLargeList"
        :type="item.type" 
        :subType="item.subType" 
        :id="item.id"
      ></TreeOption>
    </select>
  </div>
</template>

<style>
  select {
    width:200px;
    font-size:16px;
    color: #fff;
    background-color: #000;
  }
</style>
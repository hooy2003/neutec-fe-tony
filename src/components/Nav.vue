<script setup lang="ts">
import { onMounted, computed } from 'vue'
import TreeMenu from './TreeMenu.vue'
import TreeLargeMenu from './TreeLargeMenu.vue'
import TreeOption from './TreeOption.vue'
import navStore from '../stores/navStore'

onMounted(() => {
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
  <h2 style="text-align:center;">Nav</h2>
  <h3>範例資料格式</h3>
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
  <div class="select-wrap">
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
  <h3>20層資料格式</h3>
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
  <div class="select-wrap">
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
  h2, h3 {
    color: #213547;
  }
  .select-wrap {
    text-align:left;
    display: inline-block;
    position: relative;
    margin: 20px 0 0 0;
  }
  select {
    width:200px;
    font-size:16px;
    padding: 5px;
    border-radius: 5px;
    border: 1px #bababa solid;
    appearance:none;
    outline: none;
    color: #fff;
    background-color: #000;
  }
  .select-wrap::before {
    content:"";
    position: absolute;
    right: 18px;
    top: 10px;    
    z-index: 1;
    text-align: center;
    width: 1px;
    height: 8px;
    transform: rotateZ(-45deg);
    background-color: #fff;
    pointer-events: none;
    box-sizing: border-box;   
  }  
  .select-wrap:after {
    content:"";
    position: absolute;
    right: 12px;
    top: 10px;    
    z-index: 1;
    text-align: center;
    width: 1px;
    height: 8px;
    transform: rotateZ(45deg);
    background-color: #fff;
    pointer-events: none;
    box-sizing: border-box;   
  }   
</style>
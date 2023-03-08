<script setup lang="ts">
import { PropType, computed } from 'vue'
import { defaultTree } from '../types/jsonType'
import navStore from '../stores/navStore';

const props = defineProps({
  type: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  },
  subType: {
    type: Array as PropType<defaultTree[]>,
    default: []
  },
  layer:{
    type: Number,
    default: 1
  },
  index: {
    type: Number,
    default: 0
  },
  id: {
    type: String,
    default: ''
  }
})

const layerStyle = computed(() => {
  const offset = props.layer ? (props.layer - 1) * 25 : 0
  const color = navStore.state.selectId === props.id ? props.color : '#fff'
  return { 
    transform: `translate(${offset}px)`,
    color: color
  }
})

const isMenuShow = computed(() => {
  let isCurrentShow = false
  // console.log('MenuShow:', props.id,'|',navStore.state.selectId)
  for (let i = 0; i < props.id.length; i++) {
    if (props.id[i] === navStore.state.selectId[i]) {
      isCurrentShow = true
    }
    else {
      isCurrentShow = false
    }
  }
  if (navStore.state.sameClick && navStore.state.selectId === props.id) isCurrentShow = false
  return isCurrentShow
})

const handleClick = ()=>{
  navStore.actions.selectItem(props.id)
}
</script>
<template>
  <div class="tree-menu">
    <div 
      style="cursor: pointer;"
      :style="layerStyle"
      @click="handleClick"
    >
      <span v-if="props.subType.length > 0 && !isMenuShow">+</span>
      <span v-if="props.subType.length > 0 && isMenuShow">-</span>
       {{ props.type }}
    </div>
    <div v-if="isMenuShow && props.subType.length > 0">
      <TreeMenu 
        v-for="(item, index) in props.subType" 
        :type="item.type"
        :color="item.color"
        :subType="item.subType" 
        :layer="props.layer+1"
        :index="index"
        :id="item.id"
      ></TreeMenu>
    </div>
  </div>
</template>

<style>
  .tree-menu {
    color: white;
    width: 450px;
    text-align: left;
    display: flex;
    flex-wrap: wrap;
  }
</style>
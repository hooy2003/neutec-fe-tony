<script setup lang="ts">
import { PropType, computed, onUpdated } from 'vue'
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
  const color = navStore.state.selecLargetId === props.id ? props.color : '#333'
  const border = navStore.state.selecLargetId === props.id ? `1px ${color} solid` : `none`
  return { 
    transform: `translate(${offset}px)`,
    color: color,
    borderBottom: border
  }
})

const isMenuShow = computed(() => {
  let isCurrentShow = false
  for (let i = 0; i < props.id.length; i++) {
    if (props.id[i] === navStore.state.selecLargetId[i]) {
      isCurrentShow = true
    }
    else {
      isCurrentShow = false
    }
  }
  if (navStore.state.sameLargeClick && navStore.state.selecLargetId === props.id) isCurrentShow = false
  return isCurrentShow
})

const handleClick = ()=>{
  navStore.actions.selectLargeItem(props.id)
}

onUpdated(()=>{
  console.log('[延伸問題]:20層資料被異動時，有多少組件被update')
})
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
      <TreeLargeMenu
        v-for="(item, index) in props.subType" 
        :type="item.type"
        :color="item.color"
        :subType="item.subType" 
        :layer="props.layer+1"
        :index="index"
        :id="item.id"
      ></TreeLargeMenu>
    </div>
  </div>
</template>
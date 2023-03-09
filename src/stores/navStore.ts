import { reactive } from 'vue';
import defaultObj from '../../resource/default.json'
import largeObj from '../../resource/large.json'
import { defaultTree } from '../types/jsonType'

const state = reactive({
  defaultList: [] as defaultTree[],
  largeList: [] as defaultTree[],
  sameClick: false as boolean, // 紀錄是否點擊同一個選項
  sameLargeClick: false as boolean,
  selectId: '-1' as string, // -1 表示無選擇到任何東西
  selecLargetId: '-1' as string,
})

const addId = (tree:defaultTree[], propsIdArray:number[]) => {
  tree.map((item, index) => {
    const preArr:number[] = JSON.parse(JSON.stringify(propsIdArray))
    if (preArr.length > 0) {
      preArr.push(index)
      item.id = preArr.join('-')

      if (item.subType) {
        addId(item.subType, preArr)
      }
    } else {
      let newArr:number[] = []
      newArr.push(index)
      item.id = newArr.join('-')

      if (item.subType) {
        addId(item.subType, newArr)
      }
    }
  })
}

const actions = {
  callApi () {
    addId(defaultObj, [])
    state.defaultList = defaultObj

    const cacheId = actions.getCacheId()
    if(cacheId) actions.selectItem(cacheId)
  },
  callLargeApi () {
    addId(largeObj, [])
    state.largeList = largeObj

    const cacheId = actions.getLargeCacheId()
    if(cacheId) actions.selectLargeItem(cacheId)
  },
  getCacheId () {
    return localStorage.getItem('selectId') || null
  },
  getLargeCacheId () {
    return localStorage.getItem('selecLargetId') || null
  },
  selectItem (id:string) {
    state.selectId === id ? state.sameClick = !state.sameClick : state.sameClick = false
    state.selectId = id
    localStorage.setItem('selectId', id)
  },
  selectLargeItem (id:string) {
    state.selecLargetId === id ? state.sameLargeClick = !state.sameLargeClick : state.sameLargeClick = false
    state.selecLargetId = id
    localStorage.setItem('selecLargetId', id)
  }
}

export default {
  state,
  actions
}

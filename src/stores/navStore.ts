import { reactive } from 'vue';
import defaultObj from '../../resource/default.json'
// import defaultObj from '../../resource/large.json'
import { defaultTree } from '../types/jsonType'

const state = reactive({
  defaultList: [] as defaultTree[],
  sameClick: false as boolean, // 紀錄是否點擊同一個選項
  selectId: '-1' as string // -1 表示無選擇到任何東西
})

const actions = {
  callApi () {
    // 假定後端來的資料可能不會這麼完整，先加個id進去
    const addId = function (tree:defaultTree[], propsIdArray:number[]) {
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
    addId(defaultObj, [])
    state.defaultList = defaultObj

    const cache = actions.getCacheItem()
    if(cache) actions.selectItem(cache)
  },
  getCacheItem () {
    return localStorage.getItem('selectId') || null
  },
  selectItem (id:string) {
    // console.log('state.selectId === id', state.selectId , id)
    // 找到差異
    state.selectId === id ? state.sameClick = !state.sameClick : state.sameClick = false
    localStorage.setItem('selectId', id)
    state.selectId = id
  }
}

export default {
  state,
  actions
}

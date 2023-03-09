# NEUTEC-Frontend-Test

### 思路

首先用 Vite 起一個專案，也不用改東西，直接開做。資料先轉成 JSON。

展開收合元件，直覺 elementUI tree，但直接用 framework 感覺應該不是題目要的。就手刻一個，順便複習一下 Recursive Components。

### 使用

- node - v14.19.1
- Vite - 4.1.0
- Vue - 3.2.45
- TypeScript - 4.9.3
- vueuse - 9.13.0

### 功能

先假定資料來的時候並不會有`id`或其他可辨識的欄位，所以前端先幫每一個選項添加`id`，這裡的`id`是一個字串，示例如下。階層以`-`分隔，數字則為順序，兩者組合而成。不選擇單一數字是因為沒辦法知道父層是誰，在展開上會不好處理。

```sh
0-1-1-0
```

拿到這個字串就能做很多事情了，HighLight 與是否展開都是靠`id`去比對是否符合規則，因用了 Recursive Components 可避免遍歷，只會跑有渲染出來的組件(沒渲染的不會跑，以範例資料來說，選「黑糖冬瓜牛奶」只會跑 7 次，而非全部項目的 27 次)。
展開規則如下：

```sh
例如現在被選取的id = 2-1-0-2
id = 2 (符合)
id = 2-1 (符合)
id = 2-1-0 (符合)
符合的 TreeMenu 皆展開
```

```sh
for (let i = 0; i < props.id.length; i++) {
  if (props.id[i] === navStore.state.selectId[i]) {
    isCurrentShow = true
  }
  else {
    isCurrentShow = false
  }
}
```

菜單與下拉選單的選取都會執行下列，判定是否重複點擊，記憶點擊項目

```sh
selectItem (id:string) {
  state.selectId === id ? state.sameClick = !state.sameClick : state.sameClick = false
  state.selectId = id
  localStorage.setItem('selectId', id)
}
```

菜單與下拉選單都是靠`subType`去跑重複項目，直到 v-if 判斷無`subType`，只是菜單多了`layer`去做樣式變化。
然後菜單與下拉選單都有做相互連動，選了值另一邊也會變化。

### 延伸題目

- 超多層資料，先不管畫面長什麼樣子。

  我自己是做了一個 20 層的在題目要求的下面。也在 console 裡面印了 update 的 log。

  菜單：只會渲染展開的部分，但如果展開到第 20 層，選取第 20 層的選項，則每次都會 Update 選取的那個組件外還會包含前面 19 層的父組件，如下圖所示，這裡效能就重起來了。

  ![plot](https://github.com/hooy2003/neutec-fe-tony/blob/main/src/assets/img_1.png)

  下面這文章講得很清楚，值得一看。所以我們知道了，只要`id`一改變，組件就會急急忙忙地要去render。
  [https://dev.to/linusborg/vue-when-a-computed-property-can-be-the-wrong-tool-195j](https://dev.to/linusborg/vue-when-a-computed-property-can-be-the-wrong-tool-195j)
  
  所以我在 20 層的菜單用了 vueuse 的 computedEager 來解決這件事情。如下圖，可以透過操作上下兩個菜單，並觀察 console 的 log 變化來觀察倒是有明顯差異的。(上面的菜單沒有用 computedEager，而下面的有使用)

  ![plot](https://github.com/hooy2003/neutec-fe-tony/blob/main/src/assets/img_2.png)

  但實際開發需不需要用到 computedEager 還是需要討論的，因為我們又多增加了一個變數去紀錄是否被改變，會不會影響維護成本。

  ```sh
  const isSelectMe = computedEager(():boolean => {
    return navStore.state.selecLargetId === props.id
  })
  ```

  下拉選單：每次onMounted都會是全部數量，如果真的有超多個，可以朝 lazyLoad or virtual DOM 的方向。可以選擇如下的套件輔助。
  [https://github.com/Akryum/vue-virtual-scroller]
  (https://github.com/Akryum/vue-virtual-scroller)

- 每次刷新記憶就靠`localStorage`。

**Thanks Watch!**

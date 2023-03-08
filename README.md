# Title

### 思路

首先用 Vite 起一個專案，也不用改東西，直接開做。
資料先轉成 JSON。
展開收合元件，直覺 elementUI tree，但直接用 framework 感覺應該不是題目要的。就手刻一個，順便複習一下 Recursive Components。

### 使用

- node - v14.19.1
- Vite - 4.1.0
- Vue - 3.2.45
- TypeScript - 4.9.3

### 功能

先假定資料來的時候並不會有`id`或其他可辨識的欄位，所以前端先幫每一個選項添加`id`，這裡的`id`是一個字串，示例如下。階層以`-`分隔，數字則為順序，兩者組合而成。

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
    localStorage.setItem('selectId', id)
    state.selectId = id
  }
```

菜單與下拉選單都是靠`subType`去跑重複項目，直到 v-if 判斷無`subType`，只是菜單多了`layer`去做樣式變化。
然後菜單與下拉選單都有做相互連動，選了值另一邊也會變化。

### 延伸題目

- 100 層，先不考慮畫面會長什麼樣子，
  菜單只會渲染展開的部分，但如果展開到第 100 層，選取第 100 層的選項，則每次都會渲染前面 99 層的父組件，這裡負擔開始重了。
  那這邊有一個方法：

  watch!! 增加一個 layer 去 computed，跟當前自己的不同，就不用管，相同就去 isMenuShow，裡論會把父曾底下的全部子收起來
  等等這邊去記憶上次跟這次的去比對，指渲染有改動的部分呢！？

  但下拉選單就沒辦法了，至少得一次長出 100 個，如果真的考量到這點，可以再拿到 API 資料時候，重新做出一個單層的陣列，給下拉選單渲染

- 每次刷新就靠`localStorage`

**Thanks Watch!**

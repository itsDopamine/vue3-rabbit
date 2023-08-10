// 管理购物车相关数据

import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCartStore = defineStore('cart', () => {
  /* 1. 定义 State */
  const cartList = ref([])

  /* 2. 定义 action */
  const addCart = (goods) => {
    // 添加商品操作
    /* 
    * 商品已存在 cartList 中，count+1
    * 商品不存在 追加
    */
    const item = cartList.value.find((item) => item.skuId === goods.skuId)
    if (item) {
      // 商品已存在
      item.count += goods.count
    } else {
      cartList.value.push(goods)
    }
  }

  const delCart = (skuId) => {
    // 删除商品操作
    // 1.找到要删除项的下标值-splice
    // 2.使用数组的过滤方法-filter
    const idx = cartList.value.findIndex((item) => item.skuId === skuId)
    cartList.value.splice(idx, 1)
  }

  /* 3. 定义 Getter */
  const totalCount = computed(() => cartList.value.reduce((prev, item) => prev + item.count, 0))
  const totalPrice = computed(() => cartList.value.reduce((prev, item) => prev + item.count * item.price, 0))

  // 单选功能
  const singleCheck = (skuId, selected) => {
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected

  }

  return {
    cartList,
    totalCount,
    totalPrice,
    addCart,
    delCart,
    singleCheck
  }
}, {
  persist: true
})
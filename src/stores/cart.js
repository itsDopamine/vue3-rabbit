// 管理购物车相关数据

import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore('cart', () => {
  /* 1. 定义 State */
  const cartList = ref([])

  /* 2. 定义 action */
  const addCart = (goods) => {
    // 加入购物车操作
    /* 
    * 商品已存在 cartList 中，count+1
    * 商品不存在 追加
    */
    const item = cartList.value.find((item) => item.skuId === goods.skuId)
    if (item) {
      // 商品已存在
      item.count++
    } else {
      cartList.value.push(goods)
    }

  }

  return {
    cartList,
    addCart
  }
}, {
  persist: true
})
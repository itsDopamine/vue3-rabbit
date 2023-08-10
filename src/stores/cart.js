// 管理购物车相关数据

import { delCartAPI, getNewCartListAPI, insertCartAPI } from "@/apis/cart";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./user";

export const useCartStore = defineStore('cart', () => {

  /* 0. 判断是否为登录状态 */
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)

  /* 1. 定义 State */
  const cartList = ref([])

  /* 2. 定义 Action */

  /* 获取最新购物车列表 */
  const updateCartList = async () => {
    const { result } = await getNewCartListAPI()
    cartList.value = result // 覆盖本地数据
  }
  /* 添加商品操作 */
  const addCart = async (goods) => {
    // 1.商品已存在 cartList 中，count+1
    // 2.商品不存在 追加

    if (isLogin.value) {
      // 登录状态下的购物操作需要返回给相关API接口
      await insertCartAPI(goods) // 调用加入购物车接口
      updateCartList()
    } else {
      // 离线状态下的购物操作实质是本地操作
      const item = cartList.value.find((item) => item.skuId === goods.skuId)
      if (item) {
        // 商品已存在
        item.count += goods.count
      } else {
        cartList.value.push(goods)
      }
    }
  }

  /* 删除商品操作 */
  const delCart = async (skuId) => {
    // 1.找到要删除项的下标值-splice
    // 2.使用数组的过滤方法-filter

    if (isLogin.value) {
      // 调用接口实现接口购物车中的删除功能
      await delCartAPI([skuId])
      updateCartList()
    } else {
      const idx = cartList.value.findIndex((item) => item.skuId === skuId)
      cartList.value.splice(idx, 1)
    }
  }

  /* 同步购物车列表的选中状态 */
  const singleCheck = (skuId, selected) => {
    // 通过skuId找到要修改的那一项 然后把它的selected修改为传过来的selected
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }

  const allCheck = (selected) => {
    cartList.value.forEach(e => e.selected = selected);
  }

  /* 3. 定义 Getter */
  const totalCount = computed(() => cartList.value.reduce((prev, item) => prev + item.count, 0))
  const totalPrice = computed(() => cartList.value.reduce((prev, item) => prev + item.count * item.price, 0))
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((prev, item) => prev + item.count, 0))
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((prev, item) => prev + item.count * item.price, 0))
  const isAll = computed(() => {
    if (cartList.value.length === 0) {
      return false
    }
    // every接收空数组时返回true
    return cartList.value.every((item) => item.selected)
  })

  return {
    cartList,
    totalCount,
    totalPrice,
    isAll,
    selectedCount,
    selectedPrice,
    addCart,
    delCart,
    singleCheck,
    allCheck
  }
}, {
  persist: true
})
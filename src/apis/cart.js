// 管理购物车相关接口数据
import httpInst from "@/utils/http";

/**
 * @description: 将商品加入购物车
 * @skuId string 商品sku的id
 * @count integer 商品数量
 * @return { Promise }
 */
export const insertCartAPI = ({ skuId, count }) => {
  return httpInst.post('/member/cart', {
    skuId, count
  })
}

/**
 * @description: 获取最新购物车列表
 * @param {*}
 * @return { Promise }
 */
export const getNewCartListAPI = () => {
  return httpInst.get('/member/cart')
}

/**
 * @description: 将商品从购物车列表删除
 * @ids array[string] 要删除的商品skuId集合
 * @return { Promise }
 */
export const delCartAPI = (ids) => {
  return httpInst.delete('/member/cart', { data: { ids } })
}
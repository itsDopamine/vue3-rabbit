import httpInst from "@/utils/http"

/**
 * @description: 获取商品详情数据
 * @param { id: 商品id }
 * @return { Promise }
 */
export const getGoodsInfoAPI = (id) => {
  return httpInst.get('/goods', {
    params: {
      id
    }
  })
}
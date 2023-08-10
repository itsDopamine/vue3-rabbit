// 管理订单支付相关数据接口
import httpInst from "@/utils/http"
/**
 * @description: 获取-订单详情(以及支付结果)
 * @id string 订单id
 * @return { Promise }
 */
export const getPayInfoAPI = (id) => httpInst.get(`/member/order/${id}`)



/**
 * @description: 跳转支付-支付宝-PC
 * @orderId string 订单id
 * @redirect string 回调地址
 * @return { Promise }
 */
export const getPayResAPI = ({ orderId, redirect }) => {
  return httpInst.get('/pay/aliPay', {
    params: { orderId, redirect }
  })
}
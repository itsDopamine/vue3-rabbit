// 管理订单相关数据接口
import httpInst from "@/utils/http"

/**
 * @description: 生成-订单(结算页)
 * @param { * }
 * @return { Promise }
 */
export const getOrdersAPI = () => httpInst.get('/member/order/pre')



/**
 * @description: 获取-订单详情(以及支付结果)
 * @id string 订单id
 * @return { Promise }
 */
export const getOrdersResAPI = (id) => httpInst.get(`/member/order/${id}`)


/**
 * @description: 提交-订单
 * @data Object 订单相关参数
 * @return { Promise }
 */
export const postOrderAPI = (data) => {
  return httpInst.post('/member/order', data)
}


/**
 * @description: 跳转支付-支付宝-PC
 * @orderId string 订单id
 * @redirect string 回调地址
 * @return { Promise }
 */
export const getPayAPI = ({ orderId, redirect }) => {
  return httpInst.get('/pay/aliPay', {
    params: { orderId, redirect }
  })
}
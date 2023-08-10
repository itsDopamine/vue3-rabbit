// 管理订单创建相关数据接口
import httpInst from "@/utils/http"

/**
 * @description: 生成-订单(结算页)
 * @param { * }
 * @return { Promise }
 */
export const getOrdersAPI = () => httpInst.get('/member/order/pre')

/**
 * @description: 提交-订单
 * @data Object 订单相关参数
 * @return { Promise }
 */
export const createOrderAPI = (data) => {
  return httpInst.post('/member/order', data)
}
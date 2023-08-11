// 管理订单支付相关数据接口
import httpInst from "@/utils/http"

/**
 * @description: 提交-订单
 * @params : {
*    orderState:0,
*    page:1,
*    pageSize:2
*  } 
 * @return { Promise }
 */
export const getUserOrderAPI = (params) => {
  return httpInst.get('/member/order', { params })
}
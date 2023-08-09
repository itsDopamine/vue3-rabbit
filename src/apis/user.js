import httpInst from "@/utils/http";

/**
 * @description: 获取登录数据
 * @param account 账户
 * @param password 密码
 * @return { Promise }
 */
export const loginAPI = ({ account, password }) => {
  return httpInst.post('/login', {
    account, password
  })
}

/**
 * @description: 获取购物车列表
 * @param { id: 分类id }
 * @return { Promise }
 */
export const getCartAPI = () => {
  return httpInst.post('/member/cart')
}
import httpInst from "@/utils/http";

/**
 * @description: 获取分类数据
 * @param { id: 分类id }
 * @return { Promise }
 */
export const loginAPI = ({ account, password }) => {
  return httpInst.post('/login', {
    account, password
  })
}
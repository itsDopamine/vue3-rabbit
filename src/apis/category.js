import httpInst from "@/utils/http";

/**
 * @description: 获取分类数据
 * @param {*}
 * @return {Promise}
 */
export function getCategoryDataAPI (id) {
  return httpInst.get('/category', {
    params: {
      id
    }
  })
}
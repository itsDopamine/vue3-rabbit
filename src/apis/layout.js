import httpInst from "@/utils/http";

/**
 * @description: 获取商品类别数据
 * @param {*}
 * @return {Promise}
 */
export function getCategoryAPI () {
  return httpInst.get('home/category/head')
}
import httpInst from "@/utils/http";

/**
 * @description: 获取轮播图数据
 * @param {*}
 * @return {Promise}
 */
export function getBannerAPI () {
  return httpInst.get('/home/banner')
}

/**
 * @description: 获取新鲜好物数据
 * @param {*}
 * @return {Promise}
 */
export function getNewGoodsAPI () {
  return httpInst.get('/home/new')
}

/**
 * @description: 获取人气推荐数据
 * @param {*}
 * @return {Promise}
 */
export function getHotGoodsAPI () {
  return httpInst.get('/home/hot')
}

/**
 * @description: 获取商品列表数据
 * @param {*}
 * @return {Promise}
 */
export function getProductListAPI () {
  return httpInst.get('/home/goods')
}

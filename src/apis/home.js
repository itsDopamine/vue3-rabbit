import httpInst from "@/utils/http";

/**
 * @description: 获取轮播图数据
 * @param {*}
 * @return {Promise}
 */
export function getBannerAPI (params = {}) {
  /* distributionSite：请求来源页
     1: 首页（Home），默认
     2: 分类（Category）
  */
  const { distributionSite = '1' } = params
  return httpInst.get('/home/banner', {
    params: {
      distributionSite
    }
  })
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

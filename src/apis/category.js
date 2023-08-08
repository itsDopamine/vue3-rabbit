import httpInst from "@/utils/http";

/**
 * @description: 获取分类数据
 * @param { id: 分类id }
 * @return { Promise }
 */
export const getCategoryDataAPI = (id) => {
  return httpInst.get('/category', {
    params: {
      id
    }
  })
}


/**
 * @description: 获取二级分类列表数据
 * @param { id: 分类id }
 * @return { Promise }
 */
export const getCategoryFilterAPI = (id) => {
  return httpInst.get('/category/sub/filter', {
    params: {
      id
    }
  })
}
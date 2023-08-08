/* 将components中的所有组件以 插件 方式导出，便于全局注册 */
import ImageView from "./ImageView/index.vue"
import Sku from "./XtxSku/index.vue"

export const componentPlugin = {
  install (app) {
    app.component('XtxImageView', ImageView)
    app.component('XtxSku', Sku)
  }
}
/* 封装倒计时函数
* @Desc: 把秒数格式化为倒计时的显示状态
* @return: 
*   formatTime: 为显示的倒计时时间 
*   start: 是倒计时启动函数，调用时可以设置初始值并且开始倒计时
*/

import dayjs from "dayjs"
import { computed, onUnmounted, ref } from "vue"

export const useCountDown = () => {
  let timer = null
  // 1. 响应式数据
  const time = ref(0)
  // 1.1 格式化时间
  const formatTime = computed(() => dayjs.unix(time.value).format('mm 分 ss 秒'))
  // console.log(dayjs.unix(1).format('mm 分 ss 秒'));
  // 2. 开启倒计时的函数
  const start = (currentTime) => {
    // 核心逻辑:每隔 1s 就减一
    time.value = currentTime
    if (time.value > 0) {
      timer = setInterval(() => {
        time.value--
        // 3.1 倒计时结束时清除定时器
        if (time.value <= 0) {
          timer && clearInterval(timer)
        }
      }, 1000)
    }
  }

  // 3.2 组件销毁时清除定时器
  onUnmounted(() => {
    timer && clearInterval(timer)
  })

  return {
    formatTime,
    start
  }
}
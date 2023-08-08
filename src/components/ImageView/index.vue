<script setup>
import { useMouseInElement } from "@vueuse/core"
import { ref, watch } from "vue"

/* 1. 获取图片列表 */
defineProps({
  imageList: {
    type: Array
  }
})

/* 2. 小图切换大图显示 */
const activeIndex = ref(0) // 小图索引
const changeImg = (idx) => {
  activeIndex.value = idx
}

/* 3.1 放大镜效果 - 滑块跟随鼠标移动  */
const target = ref(null) // 监听的DOM元素
const { elementX, elementY, isOutside } = useMouseInElement(target) // 获取鼠标相对位置
const left = ref(0)
const top = ref(0)

// 控制滑块跟随鼠标移动（监听elementX/Y变化，并重新设置left/top）
watch([elementX, elementY, isOutside], () => {
  // 根据有效范围计算蒙版的位置
  // 有效范围：根据大图和蒙层滑块的大小计算
  // console.log(isOutside);
  if (!isOutside.value) {
    // 横向处理
    if (elementX.value < 100) { // 左边界处理
      left.value = 0
    } else if (elementX.value > 100 && elementX.value < 300) {
      left.value = (elementX.value - 100)
    } else if (elementX.value > 300) { // 右边界处理
      left.value = 200
    }

    // 纵向处理
    if (elementY.value < 100) { // 上边界处理
      top.value = 0
    } else if (elementY.value > 100 && elementY.value < 300) {
      top.value = (elementY.value - 100)
    } else if (elementY.value > 300) { // 下边界处理
      top.value = 200
    }
  }
})
</script>


<template>
  <!-- <p>{{ elementX }}, {{ elementY }}, {{ isOutside }}</p> -->
  <div class="goods-image">
    <!-- 左侧大图-->
    <div class="middle" ref="target">
      <img :src="imageList[activeIndex]" alt="" />
      <!-- 蒙层小滑块 -->
      <div class="layer" :style="{ left: `${left}px`, top: `${top}px` }"></div>
    </div>
    <!-- 小图列表 -->
    <ul class="small">
      <!-- 通过索引是否匹配来设置激活状态 -->
      <li v-for="(img, i) in imageList" :key="i" @mouseenter="changeImg(i)" :class="{ active: i === activeIndex }">
        <img :src="img" alt="" />
      </li>
    </ul>
    <!-- 放大镜大图 -->
    <div class="large" :style="[
      {
        backgroundImage: `url(${imageList[0]})`,
        backgroundPositionX: `0px`,
        backgroundPositionY: `0px`,
      },
    ]" v-show="false"></div>
  </div>
</template>

<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
    left: 0;
    top: 0;
    position: absolute;
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }
}
</style>
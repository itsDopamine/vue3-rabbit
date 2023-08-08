<script setup>
import { getCategoryFilterAPI, getSubCategoryAPI } from "@/apis/category";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import GoodsItem from '../Home/components/GoodsItem.vue';

/* 1. 获取面包屑导航数据 */
const categoryFilterData = ref([])
const routeData = useRoute()
// console.log(routeData);
const getCategoryFilter = async (id = routeData.params.sid) => {
  const { result } = await getCategoryFilterAPI(id)
  categoryFilterData.value = result
}

onMounted(() => getCategoryFilter())

/* 2. 获取二级分类数据 */
const subDataList = ref({})
// 请求数据
const reqData = ref({
  categoryId: routeData.params.sid,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime' // 筛选标签
})
const getSubCategory = async (data = reqData.value) => {
  const { result } = await getSubCategoryAPI(data)
  // console.log(result);
  // 因接口对不同标签的返回数据一致，此处对返回商品列表随机打乱处理
  result.items.sort(() => Math.random() - 0.5)
  subDataList.value = result
}
onMounted(() => getSubCategory())

/* 3.添加二级列表的筛选功能 */
const tabChange = () => {
  reqData.value.page = 1 // 重置页码
  getSubCategory()
}

/* 4.添加列表触底自动加载数据功能 */
const disabled = ref(false)
const load = async (data = reqData.value) => {
  reqData.value.page++ // 重置页码
  const { result } = await getSubCategoryAPI(data)
  subDataList.value.items = [...subDataList.value.items, ...result.items]
  // 加载完毕，停止监听
  if (result.items.length === 0) {
    disabled.value = true
  }
}
</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item exact :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item exact :to="{ path: `/category/${categoryFilterData.parentId}` }">{{
          categoryFilterData.parentName
        }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryFilterData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <!-- 3.1 绑定标签数据和tab-changge事件，触发相应的数据操作 -->
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <!-- 4.1 绑定触底指令 -->
      <!-- 4.2 记载完毕，停止监听 -->
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <!-- 商品列表-->
        <GoodsItem :parent-id="categoryFilterData.parentId" :goods="goods" v-for="goods in subDataList.items"
          :key="goods.id">
        </GoodsItem>
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
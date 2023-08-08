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
  subDataList.value = result
}
onMounted(() => getSubCategory())

/*  */

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
      <el-tabs v-model="reqData.sortField">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body">
        <!-- 商品列表-->
        <GoodsItem :goods="goods" v-for="goods in subDataList.items" :key="goods.id"></GoodsItem>
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
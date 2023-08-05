import httpInst from "@/utils/http";

export function getBannerAPI () {
  return httpInst.get('/home/banner')
}

export function getNewGoodsAPI () {
  return httpInst.get('/home/new')
}

export function getHotGoodsAPI () {
  return httpInst.get('/home/hot')
}

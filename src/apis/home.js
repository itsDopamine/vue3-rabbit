import httpInst from "@/utils/http";

export function getBannerAPI () {
  return httpInst.get('/home/banner')
}
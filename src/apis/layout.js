import httpInst from "@/utils/http";

export function getCategoryAPI () {
  return httpInst.get('home/category/head')
}
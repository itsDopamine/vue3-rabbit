import httpInst from "@/utils/http";

export function testCategoryAPI () {
  return httpInst.get('home/category/head')
  // return httpInst({
  //   url: 'home/category/head'
  // })
}
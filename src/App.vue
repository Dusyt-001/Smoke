<template>
  <div id="app">
    <!-- 一级路由 -->
    <router-view/>
  </div>
</template>

<style lang="less">
//定义全局样式
body{
  background-color: #f5f5f5;
}
.fl{
  float: left;
}
.fr{
  float: right;
}
.clearfix::after{
  display: block;
  content: '';
  clear: both;
}
.auto-img{
  width: 100%;
  display: block;
}
.one-text{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 24px;
}
p{
  margin: 0;
}
</style>

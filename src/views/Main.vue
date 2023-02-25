<template>
  <div>
    <el-container style="height: 100vh">
      <!-- 侧边栏 -->
      <el-aside width="auto">
        <common-aside />
      </el-aside>

      <!-- 主体部分 -->
      <el-container>
        <el-header>
          <common-header />
        </el-header>

        <!-- tag 标签区域 -->
        <common-tag />

        <el-main>
          <!-- 路由出口 -->
          <!-- 路由匹配到的组件将渲染在这里 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
import CommonTag from '../components/CommonTag.vue'

export default {
  data() {
    return {}
  },
  components: {
    CommonAside,
    CommonHeader,
    CommonTag,
  },
}
</script>

<style scoped lang="less">
.el-header {
  padding: 0;
}
</style>

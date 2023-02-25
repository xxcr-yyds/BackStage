<template>
  <!-- header区域盒子 -->
  <div class="header-container">
    <!-- 左侧区域盒子 -->
    <div class="l-content">
      <!-- 按钮 -->
      <el-button @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>

      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 右侧区域盒子 -->
    <div class="r-content">
      <el-dropdown @command="logout">
        <img class="user" src="../assets/images/1.webp" alt="" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="0">个人中心</el-dropdown-item>
          <el-dropdown-item command="1">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Cookie from 'js-cookie'

export default {
  data() {
    return {}
  },

  methods: {
    handleMenu() {
      this.$store.commit('collapseMenu')
    },

    // 点击退出按钮跳转回登陆界面
    logout(command) {
      if (command === '1') {
        // 点击退出按钮，清除cookie中的 token值
        Cookie.remove('token')
        // 退出并清空 menu 数据
        Cookie.remove('menu')
        this.$router.push('/login')
      }
    },
  },

  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
}
</script>

<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .text {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  }

  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .l-content {
    display: flex;
    align-items: center;
    .el-breadcrumb {
      margin-left: 20px;
    }

    /deep/ .el-breadcrumb__item {
      .el-breadcrumb__inner {
        font-weight: normal;
        &.is-link {
          color: #666;
        }
      }
      &:last-child {
        .el-breadcrumb__inner {
          color: #fff;
        }
      }
    }
  }
}
</style>

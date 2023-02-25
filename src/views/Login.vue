<template>
  <div class="container" style="position: relative">
    <!-- 登陆表单 -->
    <el-form ref="form" class="login-container" :model="form" :rules="rules" :inline="true" label-width="70px">
      <!-- 标题 -->
      <h3 class="login_title">系统登陆</h3>

      <!-- 用户名 -->
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>

      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" style="margin-left: 105px; margin-top: 10px" @click="submit">登陆</el-button>
      </el-form-item>
    </el-form>

    <common-bground></common-bground>
  </div>
</template>

<script>
import CommonBground from '../components/CommonBground.vue'
import Cookie from 'js-cookie'
import { getMenu } from '../api'

export default {
  data() {
    return {
      // 表单绑定项
      form: {
        username: '',
        password: '',
      },

      // 表单验证规则
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: true }],
        password: [{ required: true, message: '请输入密码', trigger: true }],
      },
    }
  },

  methods: {
    // 登陆按钮点击逻辑实现
    submit() {
      // token信息
      // const token = Mock.Random.guid()

      // 校验通过
      this.$refs.form.validate((valid) => {
        if (valid) {
          getMenu(this.form).then(({ data }) => {
            if (data.code === 20000) {
              // token 信息存入 Cookie，用于不同页面间的通信
              Cookie.set('token', data.data.token)

              // 获取菜单的数据，存入store中
              this.$store.commit('setMenu', data.data.menu)
              this.$store.commit('addMenu', this.$router)

              // 跳转到首页
              this.$router.push('/home')
            } else {
              this.$message.error(data.data.message)
            }
          })
        }
      })
    },
  },

  components: {
    CommonBground,
  },
}
</script>

<style lang="less" scoped>
.login-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  .login_title {
    font-size: 30px;
    margin: 0 auto 40px auto;
    text-align: center;
    color: #505458;
  }
  width: 350px;
  border: 1px solid #eaeaea;
  background-color: #fff;
  box-shadow: 0 0 25px #cac6c6;
  border-radius: 15px;
  padding: 35px 35px 15px 35px;
  margin: 180px auto;
  box-sizing: border-box;
  .el-input {
    width: 198px;
  }
}
</style>

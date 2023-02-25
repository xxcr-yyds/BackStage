<template>
  <div class="manage">
    <!-- dialog 弹窗区域 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <!-- 用户的表单信息 -->
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" :inline="true">
        <!-- 姓名区域 -->
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>

        <!-- 年龄区域 -->
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>

        <!-- 性别区域 -->
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <!-- 出生日期 -->
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker v-model="form.birth" type="date" placeholder="选择出生日期" value-format="yyyy-MM-dd"> </el-date-picker>
        </el-form-item>

        <!-- 地址 -->
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 点击显示弹窗的按钮 -->
    <div class="manage-header">
      <el-button @click="handleAdd" type="primary"> + 新增 </el-button>

      <!-- form 的搜索区域 -->
      <el-form :model="userForm" :inline="true">
        <!-- 输入框 -->
        <el-form-item>
          <el-input placeholder="请输入名称" v-model="userForm.name"></el-input>
        </el-form-item>

        <!-- 搜索按钮 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="common-tabel">
      <!-- 表单区域 -->
      <el-table :data="tableData" style="width: 100%" height="90%" stripe>
        <!-- 姓名列 -->
        <el-table-column prop="name" label="姓名"> </el-table-column>

        <!-- 性别列 -->
        <el-table-column prop="sexLabel" label="性别">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.sex === 1 ? '男' : '女' }}</span>
          </template>
        </el-table-column>

        <!-- 年龄列 -->
        <el-table-column prop="age" label="年龄"> </el-table-column>

        <!-- 出生日期列 -->
        <el-table-column prop="birth" label="出生日期"> </el-table-column>

        <!-- 地址列 -->
        <el-table-column prop="addr" label="地址"> </el-table-column>

        <!-- 操作列 -->
        <el-table-column prop="" label="">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- table 分页区域 -->
      <div class="pager">
        <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePage"> </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, addUser, editUser, delUser } from '../api'

export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr: '',
      },
      rules: {
        name: [{ required: true, message: '请输入姓名' }],
        age: [{ required: true, message: '请输入年龄' }],
        sex: [{ required: true, message: '请选择性别' }],
        birth: [{ required: true, message: '请选择出生日期' }],
        addr: [{ required: true, message: '请输入地址' }],
      },
      // 列表数据
      tableData: [],
      // 0 表示新增弹窗，1 表示编辑
      modalType: 0,
      // 当前数据总条数
      total: 0,
      pageData: {
        page: 1,
        limit: 10,
      },
      userForm: {
        name: '',
      },
    }
  },

  methods: {
    // 提交用户表单
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 后续对表单的数据的处理
          if (this.modalType == 0) {
            addUser(this.form).then(() => {
              // 重新获取列表的接口
              this.getList()
            })
          } else {
            editUser(this.form).then(() => {
              // 重新获取列表的接口
              this.getList()
            })
          }

          // 清空表单的数据
          this.$refs.form.resetFields()

          // 关闭弹窗
          this.dialogVisible = false
        }
      })
    },

    // 弹窗关闭之后去除form表单项
    handleClose() {
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },

    // 点击取消按钮
    cancel() {
      this.handleClose()
    },

    // 点击操作列的编辑按钮事件处理逻辑
    handleEdit(row) {
      this.modalType = 1
      this.dialogVisible = true
      // 注意需要对当前数据进行深拷贝，否则会出错
      this.form = JSON.parse(JSON.stringify(row))
    },

    // 点击操作列的删除按钮事件处理逻辑
    handleDelete(row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // 删除操作:根据后端接口,参数是对象,id是唯一标识符
          delUser({ id: row.id }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
            this.getList()
          })
        })
        .catch(() => {
          // 点击取消:不删除了
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },

    // table信息添加逻辑
    handleAdd() {
      this.modalType = 0
      this.dialogVisible = true
    },

    // 获取列表数据的封装
    getList() {
      // 调用Mock路由获取列表数据
      getUser({ params: { ...this.userForm, ...this.pageData } }).then(({ data }) => {
        this.tableData = data.list
        this.total = data.count || 0
      })
    },

    // 分页点击切换逻辑
    handlePage(val) {
      console.log(val)
      this.pageData.page = val

      // 重新获取列表数据
      this.getList()
    },

    // 列表搜索按钮点击实现功能
    onSubmit() {
      this.getList()
    },
  },

  mounted() {
    this.getList()
  },
}
</script>

<style scoped lang="less">
.manage {
  height: 90%;
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .common-tabel {
    position: relative;
    height: calc(100% - 62px);
    .pager {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
</style>

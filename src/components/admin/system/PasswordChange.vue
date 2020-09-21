<template>
  <div style="text-align: left">
    <el-button
      class="add-button"
      type="success"
      @click="dialogFormVisible = true"
      >修改密码</el-button
    >
    <el-dialog
      title="修改密码"
      :visible.sync="dialogFormVisible"
      @close="clear"
      width="25%"
    >
      <el-form
        :rules="rules"
        label-position="left"
        label-width="0px"
        v-loading="loading"
      >
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="密码确认" label-width="120px" prop="passwordCheck">
          <el-input
            placeholder="请确认密码"
            v-model="passwordCheck"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-tag v-if="passwordCheck"
            >@{{ passwordValidate.errorText }}</el-tag
          >
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changePassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'PasswordChange',
  data() {
    return {
      dialogFormVisible: false,
      checked: true,
      password: '',
      passwordCheck: '',
      passwordFlag: false,
      rules: {
        passwordCheck: [{ validator: passwordFlag, trigger: 'blur' }],
      },
      loading: false,
    }
  },
  computed: {
    passwordValidate: {
      get: function() {
        var errorText
        if (!/^[0-9A-Za-z]{6,15}$/.test(this.password)) {
          errorText = '密码少于6位'
        } else if (this.passwordCheck !== this.password) {
          errorText = '两次密码不匹配'
        } else {
          errorText = ''
        }
        return {
          errorText,
        }
      },
      set: function() {
        this.passwordFlag = false
      },
    },
  },
  methods: {
    clear() {
      this.password = ''
      this.passwordCheck = ''
    },
    changePassword() {
      this.$axios
        .put('/admin/user/passwordchange', {
          password: this.password,
          passwordCheck: this.passwordCheck,
        })
        .then((resp) => {
          if (resp.data.code === 200) {
            this.$alert(resp.data.data, '提示', {
              confirmButtonText: '确定',
            })
            this.clear()
            this.$emit('onSubmit')
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定',
            })
          }
        })
        .catch((failResponse) => {})
      this.dialogFormVisible = false
    },
  },
}
</script>

<style scoped>
.add-button {
  margin: 18px 0 0 10px;
}
</style>

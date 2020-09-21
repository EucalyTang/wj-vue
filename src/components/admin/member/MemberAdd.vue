<template>
  <div style="text-align: left">
    <el-button class="top-item" type="success" @click="dialogFormVisible = true"
      >添加客户</el-button
    >
    <el-dialog
      title="新增客户信息"
      :visible.sync="dialogFormVisible"
      @close="clear"
    >
      <el-form :model="addForm" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="22">
            <el-form-item label="中文名" prop="nameZh">
              <el-input
                type="text"
                v-model="addForm.nameZh"
                auto-complete="off"
                placeholder="中文名"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="英文名" prop="nameEn">
              <el-input
                type="text"
                v-model="addForm.nameEn"
                auto-complete="off"
                placeholder="英文名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="addForm.sex" placeholder="性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="addForm.email" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="护照号" prop="passportNumber">
              <el-input
                v-model="addForm.passportNumber"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="护照相片" prop="passportImg">
              <el-input
                v-model="addForm.passportImg"
                autocomplete="off"
              ></el-input>
              <img-upload @onUpload="uploadImg" ref="imgUpload"></img-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="初始密码" prop="password">
              <el-input
                v-model="addForm.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="生日" prop="birthDate">
              <el-input
                v-model="addForm.birthDate"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="IDPA编号" prop="idpaNumber">
              <el-input
                v-model="addForm.idpaNumber"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="是否军警" prop="militaryOrPolice">
            <el-select
              v-model="addForm.militaryOrPolice"
              placeholder="是否军警"
            >
              <el-option label="军警" value="true"></el-option>
              <el-option label="非军警" value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
      </el-form>
      <div class="dialog-footer" style="text-align: right">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit(selectedMember)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ImgUpload from '../../common/ImgUpload'
export default {
  name: 'MemberAdd',
  components: {
    ImgUpload,
  },
  data() {
    return {
      dialogFormVisible: false,
      rules: {
        nameZh: [
          {
            required: true,
            message: '中文名不能为空',
            trigger: 'blur',
          },
        ],
        nameEh: [
          {
            required: true,
            message: '英文名不能为空',
            trigger: 'blur',
          },
        ],
      },
      addForm: {
        nameZh: '',
        nameEn: '',
        sex: '',
        email: '',
        passportNumber: '',
        passportImg: '',
        password: '',
        birthDate: '',
        idpaNumber: '',
        militaryOrPolice: '',
      },
    }
  },
  methods: {
    clear() {
      this.addForm = {
        nameZh: '',
        nameEn: '',
        sex: '',
        email: '',
        passportNumber: '',
        passportImg: '',
        password: '',
        birthDate: '',
        idpaNumber: '',
        militaryOrPolice: '',
      }
    },
    register() {
      this.$axios
        .post('/admin/member/add', {
          nameZh: this.addForm.nameZh,
          nameEn: this.addForm.nameEn,
          sex: this.addForm.sex,
          email: this.addForm.email,
          passportNumber: this.addForm.passportNumber,
          passportImg: this.addForm.passportImg,
          password: this.addForm.password,
          birthDate: this.addForm.birthDate,
          idpaNumber: this.addForm.idpaNumber,
          militaryOrPolice: this.addForm.militaryOrPolice,
        })
        .then((resp) => {
          if (resp.data.code === 200) {
            this.$alert('注册成功', '提示', {
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
    },
    uploadImg() {
      this.selectedMember.passportImg = this.$refs.imgUpload.url
    },
  },
}
</script>

<style scoped>
.top-item {
  margin: 0 0 0 10px;
}
</style>

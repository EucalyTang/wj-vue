<template>
  <div>
    <el-dialog title="修改会员信息" :visible.sync="dialogFormVisible">
      <el-form
        v-model="selectedMember"
        style="text-align: left"
        ref="dataForm"
        label-width="120px"
      >
        <el-form-item label="中文名" prop="nameZh">
          <label>{{ selectedMember.nameZh }}</label>
        </el-form-item>
        <el-row>
          <el-col :span="11">
            <el-form-item label="英文名" prop="nameEn">
              <el-input
                v-model="selectedMember.nameEn"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="selectedMember.sex" placeholder="性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="selectedMember.email"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="护照号" prop="passportNumber">
              <el-input
                v-model="selectedMember.passportNumber"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="护照相片" prop="passportImg">
              <el-input
                v-model="selectedMember.passportImg"
                autocomplete="off"
                placeholder="图片 URL"
              ></el-input>
              <img-upload @onUpload="uploadImg" ref="imgUpload"></img-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="初始密码" prop="password">
              <el-input
                v-model="selectedMember.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="生日" prop="birthDate">
              <el-date-picker
                v-model="selectedMember.birthDate"
                type="date"
                placeholder="选择生日"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="IDPA编号" prop="idpaNumber">
              <el-input
                v-model="selectedMember.idpaNumber"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="是否军警" prop="militaryOrPolice">
            <el-select
              v-model="selectedMember.militaryOrPolice"
              placeholder="非军警"
            >
              <el-option label="军警" value="true"></el-option>
              <el-option label="非军警" value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit(selectedMember)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-row style="margin: 18px 0px 0px 18px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: 'admin/dashboard' }"
          >管理中心</el-breadcrumb-item
        >
        <el-breadcrumb-item>会员管理</el-breadcrumb-item>
        <el-breadcrumb-item>会员信息管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <member-add @onSubmit="loadMembers()"></member-add>
    <el-card style="margin: 18px 2%;width: 95%;">
      <el-table
        :data="members"
        stripe
        style="width: 100%;"
        :max-height="tableHeight"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form
              label-position="left"
              label-width="120px"
              class="demo-table-expand"
            >
              <el-form-item label="email : ">
                <span>{{ scope.row.email }}</span>
              </el-form-item>
              <el-form-item label="护照 : ">
                <el-popover placement="right" trigger="click">
                  <el-image
                    style="width: 300px; height: 300px"
                    :src="scope.row.passportImg"
                  ></el-image>
                  <el-image
                    slot="reference"
                    style="width: 50px; height: 50px;"
                    :src="scope.row.passportImg"
                  ></el-image>
                </el-popover>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="nameZh" label="中文名" fit></el-table-column>
        <el-table-column prop="nameEn" label="英文名" fit></el-table-column>
        <el-table-column prop="sex" label="性别" fit></el-table-column>
        <el-table-column
          prop="passportNumber"
          label="护照号"
          fit
        ></el-table-column>
        <el-table-column
          prop="birthDate"
          label="出生日期"
          fit
        ></el-table-column>
        <el-table-column
          prop="idpaNumber"
          label="IDPA编号"
          fit
        ></el-table-column
        ><el-table-column
          prop="password"
          label="初始密码"
          fit
        ></el-table-column>
        <el-table-column
          prop="militaryOrPolice"
          label="军警"
          fit
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="editMember(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button
              v-if="!scope.row.enabled"
              @click="enableMember(scope.row.id)"
              type="text"
              size="small"
              >通过审核</el-button
            >
            <el-button
              @click="deleteMember(scope.row.id)"
              type="text"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="margin: 20px 0 50px 0;">
        <el-pagination
          background
          style="float: right;"
          layout="total, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import MemberAdd from './MemberAdd'
import ImgUpload from '../../common/ImgUpload'
export default {
  name: 'MemberManagement',
  components: {
    ImgUpload,
    MemberAdd,
  },
  data() {
    return {
      members: [],
      pageSize: 10,
      total: 0,
      dialogFormVisible: false,
      selectedMember: [],
      formLabelWidth: '120px',
    }
  },
  mounted() {
    this.loadMembers()
  },
  computed: {
    tableHeight() {
      return window.innerHeight - 320
    },
  },
  methods: {
    loadMembers() {
      var _this = this
      this.$axios.get('/admin/member/' + this.pageSize + '/1').then((resp) => {
        if (resp && resp.status === 200) {
          _this.members = resp.data.content
          _this.total = resp.data.totalElements
          //console.log(_this.members)
        }
      })
    },
    handleCurrentChange(page) {
      var _this = this
      this.$axios
        .get('/admin/member/' + this.pageSize + '/' + page)
        .then((resp) => {
          if (resp && resp.status === 200) {
            _this.members = resp.data.content
            _this.total = resp.data.totalElements
          }
        })
    },
    onSubmit(member) {
      this.$axios
        .put('/admin/member/modify', {
          id: member.id,
          nameZh: member.nameZh,
          nameEn: member.nameEn,
          sex: member.sex,
          email: member.email,
          passportNumber: member.passport,
          passportImg: member.passportImg,
          password: member.password,
          birthDate: member.birthDate,
          idpaNumber: member.idpaNumber,
          militaryOrPolice: member.militaryOrPolice,
        })
        .then((resp) => {
          if (resp && resp.status === 200) {
            this.$alert('用户信息修改成功')
            this.dialogFormVisible = false
            // 修改角色后重新请求用户信息，实现视图更新
            this.loadMembers()
          }
        })
    },
    editMember(member) {
      this.dialogFormVisible = true
      this.selectedMember = member
    },
    enableMember(id) {
      this.$axios.put('/admin/member/enable/' + id).then((resp) => {
        if (resp && resp.status === 200) {
          this.loadMembers()
        }
      })
    },
    deleteMember(id) {
      this.$confirm('此操作将永久删除该客户，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$axios.delete('/admin/member/' + id).then((resp) => {
            if (resp && resp.status === 200) {
              this.loadMembers()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    uploadImg() {
      //console.log("upload");
      this.selectedMember.passportImg = this.$refs.imgUpload.url
      //console.log(this.selectedMember.passportImg);
    },
  },
}
</script>

<style scoped></style>

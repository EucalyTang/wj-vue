<template>
  <div style="text-align: left">
    <el-button class="top-item" type="success" @click="dialogFormVisible = true"
      >提交预定信息</el-button
    >
    <el-dialog
      title="提交场地预定"
      :visible.sync="dialogFormVisible"
      @close="clear"
    >
      <el-form :model="addForm" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="22">
            <el-form-item label="会员" prop="memberId">
              <el-select v-model="addForm.memberId" placeholder="请选择">
                <el-option
                  v-for="member in members"
                  :key="member.value"
                  :label="member.nameZh"
                  :value="member.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="场地" prop="shootRangeId">
              <el-select v-model="addForm.shootRangeId" placeholder="请选择">
                <el-option
                  v-for="range in ranges"
                  :key="range.value"
                  :label="range.name"
                  :value="range.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="预定日期" prop="scheduleDatetime">
              <el-date-picker
                v-model="addForm.scheduleDatetime"
                type="date"
                placeholder="选择预定日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="dialog-footer" style="text-align: right">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'RangeReserveAdd',
  components: {},
  data() {
    return {
      dialogFormVisible: false,
      rules: {
        memberId: [
          {
            required: true,
            message: '请选择会员',
            trigger: 'blur',
          },
        ],
        shootRangeId: [
          {
            required: true,
            message: '请选择场地',
            trigger: 'blur',
          },
        ],
        scheduleDatetime: [
          {
            required: true,
            message: '请选择日期',
            trigger: 'blur',
          },
        ],
      },
      members: '',
      ranges: '',
      addForm: {
        memberId: '',
        shootRangeId: '',
        scheduleDatetime: '',
      },
    }
  },
  mounted() {
    this.getMembers()
    this.getRanges()
  },
  methods: {
    clear() {
      this.addForm = {
        memberId: '',
        shootRangeId: '',
        scheduleDatetime: '',
      }
    },
    submit() {
      this.$emit('onSubmit', this.addForm)
      this.dialogFormVisible = false
      this.clear()
    },
    getMembers() {
      this.$axios.get('/member/byuser').then((resp) => {
        this.members = resp.data
      })
    },
    getRanges() {
      this.$axios.get('/item/range').then((resp) => {
        this.ranges = resp.data
      })
    },
  },
}
</script>

<style scoped>
.top-item {
  margin: 0 0 0 10px;
}
</style>

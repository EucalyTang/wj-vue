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
          <el-col :span="10">
            <el-form-item label="会员">
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
          <el-col :span="10">
            <el-form-item label="预定日期">
              <el-date-picker
                v-model="addForm.scheduleDatetime"
                type="date"
                placeholder="选择预定日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="枪型">
              <el-select
                v-model="addForm.gunId"
                placeholder="枪型"
                @change="getBullets"
              >
                <el-option
                  v-for="item in guns"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="数量">
              <el-input-number
                v-model="addForm.gunQuantity"
                :min="1"
                :max="10"
                label="数量"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="子弹">
              <el-select
                v-model="select_bullet"
                placeholder="请先选择枪型"
                @change="setBullet"
              >
                <el-option
                  v-for="item in bullets"
                  :key="item.value"
                  :label="getBulletName(item)"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="数量">
              <el-input-number
                v-model="addForm.bulletQuantity"
                :min="1"
                :max="10"
                label="数量"
              ></el-input-number>
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
  name: 'EquipReserveAdd',
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
        scheduleDatetime: [
          {
            required: true,
            message: '请选择日期',
            trigger: 'blur',
          },
        ],
        gunName: [
          {
            required: true,
            message: '请选择枪型',
            trigger: 'blur',
          },
        ],
        bulletBrand: [
          {
            required: true,
            message: '请选择子弹',
            trigger: 'blur',
          },
        ],
      },
      members: '',
      select_gun: '',
      select_bullet: '',
      guns: '',
      bullets: '',
      addForm: {
        memberId: '',
        gunId: '',
        gunQuantity: '',
        bulletId: '',
        bulletQuantity: '',
        scheduleDatetime: '',
      },
    }
  },
  mounted() {
    this.getMembers()
    this.getGuns()
  },
  methods: {
    clear() {
      this.addForm = {
        memberId: '',
        gunId: '',
        gunQuantity: '',
        bulletId: '',
        bulletQuantity: '',
        scheduleDatetime: '',
      }
      this.select_gun = ''
      this.select_bullet = ''
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
    getGuns() {
      this.$axios.get('/item/gun').then((resp) => {
        this.guns = resp.data
      })
    },
    getBullets(gid) {
      this.addForm.gunId = gid
      this.$axios
        .get('/item/bullet', {
          params: { gunid: gid },
        })
        .then((resp) => {
          this.bullets = resp.data
        })
    },
    getBulletName(bullet) {
      return bullet.brand + '-' + bullet.level
    },
    setBullet(bid) {
      this.addForm.bulletId = bid
    },
  },
}
</script>

<style scoped>
.top-item {
  margin: 0 0 0 10px;
}
</style>

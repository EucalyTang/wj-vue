<template>
  <div style="text-align: left">
    <el-button class="top-item" type="success" @click="dialogFormVisible = true"
      >添加优惠方案</el-button
    >
    <el-dialog
      title="新增优惠方案"
      :visible.sync="dialogFormVisible"
      @close="clear"
    >
      <el-form :model="addForm" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="20">
            <el-form-item label="名称" prop="name">
              <el-input
                type="text"
                v-model="addForm.name"
                auto-complete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="枪型优惠值" prop="gunDiscountValue">
              <el-input
                v-model="addForm.gunDiscountValue"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="子弹优惠值" prop="bulletDiscountValue">
              <el-input
                v-model="addForm.bulletDiscountValue"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="addForm.remark" autocomplete="off"></el-input>
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
import { checkMaxVal } from '../../../js/validate.js'
export default {
  name: 'DiscountAdd',
  components: {},
  data() {
    return {
      dialogFormVisible: false,
      rules: {
        name: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'blur',
          },
        ],
        gunDiscountValue: [
          {
            required: true,
            message: '枪型优惠值不能为空',
            trigger: 'blur',
          },
          {
            validator: checkMaxVal,
            trigger: 'blur',
          },
        ],
        bulletDiscountValue: [
          {
            required: true,
            message: '子弹优惠值不能为空',
            trigger: 'blur',
          },
          {
            validator: checkMaxVal,
            trigger: 'blur',
          },
        ],
      },
      addForm: {
        name: '',
        gunDiscountType: 'VAL',
        gunDiscountValue: '',
        bulletDiscountType: 'VAL',
        bulletDiscountValue: '',
        remark: '',
      },
      discountType: [
        { label: '折扣率', value: 'PER' },
        { label: '优惠值', value: 'VAL' },
      ],
    }
  },
  methods: {
    clear() {
      this.addForm = {
        name: '',
        gunDiscountType: '',
        gunDiscountValue: '',
        bulletDiscountType: '',
        bulletDiscountValue: '',
        remark: '',
      }
    },
    submit() {
      this.$emit('onSubmit', this.addForm)
      this.dialogFormVisible = false
      this.clear()
    },
  },
}
</script>

<style scoped>
.top-item {
  margin: 0 0 0 10px;
}
</style>

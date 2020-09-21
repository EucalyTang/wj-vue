<template>
  <div style="text-align: left">
    <el-button class="top-item" type="success" @click="dialogFormVisible = true"
      >添加子弹</el-button
    >
    <el-dialog
      title="新增子弹"
      :visible.sync="dialogFormVisible"
      @close="clear"
    >
      <el-form :model="addForm" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="20">
            <el-form-item label="口径" prop="bore">
              <el-input
                type="text"
                v-model="addForm.bore"
                auto-complete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="品牌" prop="brand">
              <el-input
                type="text"
                v-model="addForm.brand"
                auto-complete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="数量/盒" prop="quantity">
              <el-input
                type="text"
                v-model="addForm.quantity"
                auto-complete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="级别" prop="level">
              <el-select v-model="addForm.level" placeholder="级别">
                <el-option label="training" value="training"></el-option>
                <el-option label="match" value="match"></el-option>
                <el-option label="iron" value="iron"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="价格" prop="price">
              <el-input v-model="addForm.price" autocomplete="off"></el-input>
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
import { isInteger } from '../../../js/validate.js'
export default {
  name: 'BulletAdd',
  components: {},
  data() {
    return {
      dialogFormVisible: false,
      rules: {
        bore: [
          {
            required: true,
            message: '口径不能为空',
            trigger: 'blur',
          },
        ],
        brand: [
          {
            required: true,
            message: '品牌不能为空',
            trigger: 'blur',
          },
        ],
        quantity: [
          {
            required: true,
            message: '数量不能为空',
            trigger: 'blur',
          },
          {
            validator: isInteger,
            trigger: 'blur',
          },
        ],
        level: [
          {
            required: true,
            message: '级别不能为空',
            trigger: 'blur',
          },
        ],
        price: [
          {
            required: true,
            message: '价格不能为空',
            trigger: 'blur',
          },
          {
            validator: isInteger,
            trigger: 'blur',
          },
        ],
      },
      addForm: {
        bore: '',
        brand: '',
        quantity: '',
        level: '',
        price: '',
      },
    }
  },
  methods: {
    clear() {
      this.addForm = {
        bore: '',
        brand: '',
        quantity: '',
        level: '',
        price: '',
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

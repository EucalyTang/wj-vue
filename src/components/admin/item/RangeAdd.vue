<template>
  <div style="text-align: left">
    <el-button class="top-item" type="success" @click="dialogFormVisible = true"
      >添加场地</el-button
    >
    <el-dialog
      title="新增场地"
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
          <el-col :span="20">
            <el-form-item label="类型" prop="type">
              <el-input
                type="text"
                v-model="addForm.type"
                auto-complete="off"
              ></el-input>
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
        <el-row>
          <el-col :span="20">
            <el-form-item label="状态" prop="status">
              <el-select v-model="addForm.status" placeholder="状态">
                <el-option label="可用" value="可用"></el-option>
                <el-option label="不可用" value="不可用"></el-option>
              </el-select>
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
  name: 'RangeAdd',
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
        type: [
          {
            required: true,
            message: '类型不能为空',
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
        status: [
          {
            required: true,
            message: '状态不能为空',
            trigger: 'blur',
          },
        ],
      },
      addForm: {
        name: '',
        type: '',
        price: '',
        status: '',
      },
    }
  },
  methods: {
    clear() {
      this.addForm = {
        name: '',
        type: '',
        price: '',
        status: '',
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

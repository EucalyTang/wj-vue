<template>
  <div style="text-align: left">
    <el-button class="top-item" type="success" @click="dialogFormVisible = true"
      >添加枪型</el-button
    >
    <el-dialog
      title="新增枪型"
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
            <el-form-item label="型号" prop="type">
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
            <el-form-item label="口径" prop="bore">
              <el-input v-model="addForm.bore" autocomplete="off"></el-input>
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
            <el-form-item label="数量" prop="quantity">
              <el-input
                v-model="addForm.quantity"
                autocomplete="off"
              ></el-input>
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
  name: 'GunAdd',
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
        brand: [
          {
            required: true,
            message: '品牌不能为空',
            trigger: 'blur',
          },
        ],
        type: [
          {
            required: true,
            message: '型号不能为空',
            trigger: 'blur',
          },
        ],
        bore: [
          {
            required: true,
            message: '口径不能为空',
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
      },
      addForm: {
        name: '',
        brand: '',
        type: '',
        bore: '',
        price: '',
        quantity: '',
      },
    }
  },
  methods: {
    clear() {
      this.addForm = {
        name: '',
        brand: '',
        type: '',
        bore: '',
        price: '',
        quantity: '',
      }
    },
    submit() {
      this.$emit('onSubmit', this.addForm)
      this.dialogFormVisible = false
      this.clear()
      // this.$axios
      //   .put('/admin/item/gun/modify', {
      //     name: this.addForm.name,
      //     brand: this.addForm.brand,
      //     type: this.addForm.type,
      //     bore: this.addForm.bore,
      //     price: this.addForm.price,
      //     quantity: this.addForm.quantity,
      //   })
      //   .then((resp) => {
      //     if (resp.data.code === 200) {
      //       this.$alert('添加成功', '提示', {
      //         confirmButtonText: '确定',
      //       })
      //       this.clear()
      //       this.dialogFormVisible = false
      //       this.$parent.loadItems()
      //     } else {
      //       this.$alert(resp.data.message, '提示', {
      //         confirmButtonText: '确定',
      //       })
      //     }
      //   })
      //   .catch((failResponse) => {})
    },
  },
}
</script>

<style scoped>
.top-item {
  margin: 0 0 0 10px;
}
</style>

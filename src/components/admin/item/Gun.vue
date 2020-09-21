<template>
  <div>
    <el-dialog title="修改枪型信息" :visible.sync="dialogFormVisible">
      <el-form
        v-model="selectedItem"
        style="text-align: left"
        ref="dataForm"
        label-width="120px"
      >
        <el-form-item label="名称" prop="name">
          <label>{{ selectedItem.name }}</label>
        </el-form-item>
        <el-row>
          <el-col :span="20">
            <el-form-item label="品牌" prop="brand">
              <el-input
                v-model="selectedItem.brand"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="型号" prop="type">
              <el-input
                v-model="selectedItem.type"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="口径" prop="bore">
              <el-input
                v-model="selectedItem.bore"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="价格" prop="price">
              <el-input
                v-model="selectedItem.price"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="数量" prop="quantity">
              <el-input
                v-model="selectedItem.quantity"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit(selectedItem)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/dashboard' }"
          >管理中心</el-breadcrumb-item
        >
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>枪型管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-card style="margin: 18px 2%;width: 95%">
      <gun-add @onSubmit="onSubmit"></gun-add>
      <el-table
        :data="items"
        stripe
        style="width: 100%"
        :max-height="tableHeight"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name" label="名称" fit> </el-table-column>
        <el-table-column prop="brand" label="品牌" fit> </el-table-column>
        <el-table-column prop="type" label="型号" fit> </el-table-column>
        <el-table-column prop="bore" label="口径" fit> </el-table-column>
        <el-table-column prop="price" label="价格" fit> </el-table-column>
        <el-table-column prop="quantity" label="数量" fit> </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="editItem(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button
              @click="deleteItem(scope.row.id)"
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
import GunAdd from './GunAdd'
export default {
  name: 'Gun',
  components: {
    GunAdd,
  },
  data() {
    return {
      items: [],
      pageSize: 10,
      total: 0,
      dialogFormVisible: false,
      selectedItem: [],
      formLabelWidth: '120px',
    }
  },
  mounted() {
    this.loadItems()
  },
  computed: {
    tableHeight() {
      return window.innerHeight - 320
    },
  },
  methods: {
    loadItems() {
      var _this = this
      this.$axios
        .get('/admin/item/gun/' + this.pageSize + '/1')
        .then((resp) => {
          if (resp && resp.status === 200) {
            _this.items = resp.data.content
            _this.total = resp.data.totalElements
          }
        })
    },
    handleCurrentChange(page) {
      var _this = this
      this.$axios
        .get('/admin/item/gun/' + this.pageSize + '/' + page)
        .then((resp) => {
          if (resp && resp.status === 200) {
            _this.items = resp.data.content
            _this.total = resp.data.totalElements
          }
        })
    },
    onSubmit(item) {
      this.$axios
        .put('/admin/item/gun/modify', {
          id: item.id,
          name: item.name,
          brand: item.brand,
          type: item.type,
          bore: item.bore,
          price: item.price,
          quantity: item.quantity,
        })
        .then((resp) => {
          if (resp && resp.status === 200) {
            this.$alert('商品信息修改成功')
            this.dialogFormVisible = false
            // 修改角色后重新请求用户信息，实现视图更新
            this.loadItems()
          }
        })
    },
    editItem(item) {
      this.dialogFormVisible = true
      this.selectedItem = item
    },
    deleteItem(id) {
      this.$confirm('此操作将永久删除该商品，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$axios.delete('/admin/item/gun/' + id).then((resp) => {
            if (resp && resp.status === 200) {
              this.loadItems()
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
  },
}
</script>

<style scoped>
.add-button {
  float: left;
  margin: 18px 0 18px 10px;
}
</style>

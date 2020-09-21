<template>
  <div>
    <el-dialog title="修改场地信息" :visible.sync="dialogFormVisible">
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
            <el-form-item label="类型" prop="type">
              <el-input
                v-model="selectedItem.type"
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
            <el-form-item label="状态" prop="level">
              <el-select v-model="selectedItem.status" placeholder="状态">
                <el-option label="可用" value="可用"></el-option>
                <el-option label="不可用" value="不可用"></el-option>
              </el-select>
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
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>场地管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-card style="margin: 18px 2%;width: 95%">
      <range-add @onSubmit="onSubmit"></range-add>
      <el-table
        :data="items"
        stripe
        style="width: 100%"
        :max-height="tableHeight"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name" label="名称" fit> </el-table-column>
        <el-table-column prop="type" label="类型" fit> </el-table-column>
        <el-table-column prop="price" label="价格" fit> </el-table-column>
        <el-table-column prop="status" label="状态" fit> </el-table-column>
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
import RangeAdd from './RangeAdd'
export default {
  name: 'Range',
  components: {
    RangeAdd,
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
        .get('/admin/item/range/' + this.pageSize + '/1')
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
        .get('/admin/item/range/' + this.pageSize + '/' + page)
        .then((resp) => {
          if (resp && resp.status === 200) {
            _this.items = resp.data.content
            _this.total = resp.data.totalElements
          }
        })
    },
    onSubmit(item) {
      this.$axios
        .put('/admin/item/range/modify', {
          id: item.id,
          name: item.name,
          type: item.type,
          price: item.price,
          status: item.status,
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
    deleteItem(item) {
      this.$confirm('此操作将永久删除该商品，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$axios.delete('/admin/item/range/' + id).then((resp) => {
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

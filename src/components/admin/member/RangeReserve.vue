<template>
  <div>
    <el-dialog title="修改场地预定" :visible.sync="dialogFormVisible">
      <el-form
        v-model="selectedItem"
        style="text-align: left"
        ref="dataForm"
        label-width="120px"
      >
        <el-row>
          <el-col :span="20">
            <el-form-item label="会员" prop="memberNameZh">
              <label>{{ selectedItem.memberNameZh }}</label>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="场地" prop="shootRangeName">
              <label>{{ selectedItem.shootRangeName }}</label>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="预定日期" prop="scheduleDatetime">
              <el-date-picker
                v-model="selectedItem.scheduleDatetime"
                type="date"
                placeholder="选择预定日期"
              ></el-date-picker>
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
        <el-breadcrumb-item>预定信息</el-breadcrumb-item>
        <el-breadcrumb-item>场地预定信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>

    <el-card style="margin: 18px 2%;width: 95%">
      <range-reserve-add @onSubmit="onSubmit"></range-reserve-add>
      <el-table
        :data="items"
        stripe
        style="width: 100%"
        :max-height="tableHeight"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="memberNameZh" label="会员" fit>
        </el-table-column>
        <el-table-column prop="shootRangeName" label="场地" fit>
        </el-table-column>
        <el-table-column
          prop="scheduleDatetime"
          label="预定时间"
          :formatter="dateFormat"
          fit
        >
        </el-table-column>
        <el-table-column prop="shootRangePrice" label="价格" fit>
        </el-table-column>
        <el-table-column
          prop="submitDatetime"
          label="提交时间"
          :formatter="dateTimeFormat"
          fit
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          :formatter="statusFormat"
          fit
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              v-if="!scope.row.status"
              @click="editItem(scope.row)"
              type="text"
              size="small"
              >编辑</el-button
            >
            <el-button
              v-if="!scope.row.status"
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
let moment = require('moment')
import RangeReserveAdd from './RangeReserveAdd'
export default {
  name: 'RangeReserve',
  components: {
    RangeReserveAdd,
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
      this.$axios.get('/reserve/range/' + this.pageSize + '/1').then((resp) => {
        if (resp && resp.status === 200) {
          _this.items = resp.data.content
          _this.total = resp.data.totalElements
        }
      })
    },
    handleCurrentChange(page) {
      var _this = this
      this.$axios
        .get('/reserve/range/' + this.pageSize + '/' + page)
        .then((resp) => {
          if (resp && resp.status === 200) {
            _this.items = resp.data.content
            _this.total = resp.data.totalElements
          }
        })
    },
    onSubmit(item) {
      this.$axios
        .put('/admin/order/range/modify', {
          id: item.id,
          memberId: item.memberId,
          shootRangeId: item.shootRangeId,
          scheduleDatetime: item.scheduleDatetime,
        })
        .then((resp) => {
          if (resp && resp.status === 200) {
            this.$alert('预约信息修改成功')
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
          this.$axios.delete('/admin/order/range/' + id).then((resp) => {
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
    dateTimeFormat(row, column) {
      var date = row[column.property]
      if (date == undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    dateFormat(row, column) {
      var date = row[column.property]
      if (date == undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD')
    },
    statusFormat(row, column) {
      var val = row[column.property]
      if (val == 1) {
        return '已审核'
      } else if (val == 0) {
        return '未审核'
      } else {
        return ''
      }
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

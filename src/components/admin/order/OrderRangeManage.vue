<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/dashboard' }"
          >管理中心</el-breadcrumb-item
        >
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>场地订单管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-card style="margin: 18px 2%;width: 95%">
      <!-- <el-button type="primary" plain class="top-item-left"
        >提交预定信息</el-button
      > -->
      <el-input
        placeholder="请输入关键字"
        v-model="keyword"
        class="input-with-select top-item-right"
      >
        <el-select
          v-model="option"
          slot="prepend"
          placeholder="查询条件"
          class="select-item"
        >
          <el-option
            v-for="item in condition"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="loadItems()"
        ></el-button>
      </el-input>
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
          label="预约使用日期"
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
        <el-table-column prop="submitUserName" label="提交用户" fit>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          fit
          :formatter="statusFormat"
          :filters="itemStatus"
          :filter-method="statusFilter"
          filter-placement="bottom-end"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              v-if="!scope.row.status"
              @click="verifyItem(scope.row.id)"
              type="text"
              size="small"
              >审核</el-button
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
let moment = require('moment')
export default {
  name: 'OrderRangeManage',
  components: {},
  data() {
    return {
      items: [],
      pageSize: 10,
      total: 0,
      dialogFormVisible: false,
      selectedItem: [],
      formLabelWidth: '120px',
      option: 'memberNameZh',
      keyword: '',
      itemStatus: [
        { text: '未审核', value: 0 },
        { text: '已审核', value: 1 },
      ],
      condition: [
        { label: '会员', value: 'memberNameZh' },
        { label: '提交用户', value: 'submitUserName' },
      ],
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
        .get('/admin/order/range/' + _this.pageSize + '/1', {
          params: { option: this.option, keyword: this.keyword },
        })
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
        .get('/admin/order/range/' + this.pageSize + '/' + page, {
          params: { option: this.option, keyword: this.keyword },
        })
        .then((resp) => {
          if (resp && resp.status === 200) {
            _this.items = resp.data.content
            _this.total = resp.data.totalElements
          }
        })
    },
    verifyItem(id) {
      var _this = this
      this.$axios.put('/admin/order/range/verify/' + id).then((resp) => {
        if (resp && resp.status === 200) {
          this.loadItems()
        }
      })
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
    statusFilter(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
  },
}
</script>

<style scoped>
.top-item-left {
  float: left;
  margin: 5px 0 5px 10px;
}

.top-item-right {
  float: right;
  margin: 5px 0 5px 10px;
}

.input-with-select {
  width: 360px;
}
.select-item {
  width: 100px;
}
</style>

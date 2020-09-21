<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/dashboard' }"
          >管理中心</el-breadcrumb-item
        >
        <el-breadcrumb-item>系统设置</el-breadcrumb-item>
        <el-breadcrumb-item>操作日志</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        :data="logs"
        stripe
        style="width: 100%"
        :max-height="tableHeight"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="参数">
                <span>{{ props.row.methodArgs }}</span>
              </el-form-item>
            </el-form>
          </template> </el-table-column
        ><el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="userAction" label="操作" fit> </el-table-column>
        <el-table-column prop="methodName" label="方法" fit> </el-table-column>
        <el-table-column prop="execTime" label="用时" fit> </el-table-column>
        <el-table-column
          prop="createDatetime"
          label="时间"
          width="300"
          :formatter="dateFormat"
        ></el-table-column>
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
  name: 'SystemLog',
  components: {},
  data() {
    return {
      logs: [],
      pageSize: 10,
      total: 0,
      dialogFormVisible: false,
      formLabelWidth: '120px',
    }
  },
  mounted() {
    this.loadLogs()
  },
  computed: {
    tableHeight() {
      return window.innerHeight - 320
    },
  },
  methods: {
    loadLogs() {
      var _this = this
      this.$axios.get('/log/' + this.pageSize + '/1').then((resp) => {
        if (resp && resp.status === 200) {
          _this.logs = resp.data.content
          _this.total = resp.data.totalElements
          //console.log(_this.members)
        }
      })
    },
    handleCurrentChange(page) {
      var _this = this
      this.$axios.get('/log/' + this.pageSize + '/' + page).then((resp) => {
        if (resp && resp.status === 200) {
          _this.logs = resp.data.content
          _this.total = resp.data.totalElements
        }
      })
    },
    dateFormat(row, column) {
      var date = row[column.property]
      if (date == undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
  },
}
</script>

<style scoped>
.add-button {
  float: left;
  margin: 18px 0 18px 10px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 90%;
}
</style>

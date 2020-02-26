<template>
	<div>
		<el-row style="margin: 18px 0px 0px 18px;">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: 'admin/dashboard' }">管理中心</el-breadcrumb-item>
				<el-breadcrumb-item>问卷管理</el-breadcrumb-item>
				<el-breadcrumb-item>健康申报</el-breadcrumb-item>
			</el-breadcrumb>
		</el-row>
		<el-card style="margin: 18px 2%;width: 95%;">
			<el-table :data="healths" stripe style="width: 100%;" :max-height="tableHeight">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-form label-position="left" class="demo-table-expand">
							<el-form-item label="手机号码">
								<span>{{ props.row.mobilePhone }}</span>
							</el-form-item>
							<el-form-item label="地址">
								<span>{{ props.row.address1 + props.row.address2}}</span>
							</el-form-item>
							<el-form-item label="证件">
								<span>{{ props.row.passportType + " : " + props.row.idNumber}}</span>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="姓名" fit></el-table-column>				
				<el-table-column prop="sex" label="性别" fit></el-table-column>
				<el-table-column prop="birthDate" label="出生日期" fit></el-table-column>
				<el-table-column prop="flightDate" label="航班日期" fit></el-table-column>
				<el-table-column prop="flight" label="航班号" fit></el-table-column>
				<el-table-column prop="departureCity" label="出发" fit></el-table-column>
				<el-table-column prop="arrivalCity" label="到达" fit></el-table-column>
				<el-table-column prop="seatNumber" label="座位号" fit></el-table-column>
				<el-table-column fixed="right" label="操作" width="180">
					<template slot-scope="scope">
						<el-button @click.native.prevent="viewHealth(scope.row.id)" type="text" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div style="margin: 20px 0 50px 0;">
				<el-pagination background style="float: right;" layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange"
				 :page-size="pageSize" :total="total"></el-pagination>
			</div>
		</el-card>
	</div>
</template>

<script>
	export default {
		name: 'HealthSurvey',
		data() {
			return {
				dialogFormVisible: false,
				healths: [],
				pageSize: 10,
				total: '',
				selectedHealth: []
			}
		},
		mounted() {
			this.loadHealths()
		},
		computed: {
			tableHeight() {
				return window.innerHeight - 320
			}
		},
		methods: {
			loadHealths() {
				var _this = this
				this.$axios.get('/survey/health/' + this.pageSize + '/1').then(resp => {
					if (resp && resp.status === 200) {
						_this.healths = resp.data.content
						_this.total = resp.data.totalElements
					}
				})
			},
			handleCurrentChange(page) {
				var _this = this
				this.$axios.get('/survey/health/' + this.pageSize + '/' + page).then(resp => {
					if (resp && resp.status === 200) {
						_this.healths = resp.data.content
						_this.total = resp.data.totalElements
					}
				})
			},
			viewHealth(health) {
				this.dialogFormVisible = true
				this.selectedHealth = health
			}
		}
	}
</script>

<style scoped>
	.add-link {
		margin: 18px 0 15px 10px;
		float: left;
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
		width: 50%;
	}
</style>

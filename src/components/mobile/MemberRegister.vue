<template>
  <div id="app">
    <van-form id="appForm">
      <van-image
        :src="require('../../assets/images/bg/banner.jpg')"
        width="98%"
        height="10%"
        fit="fill"
      />
      <h2 class="title">Chinese Name</h2>
      <van-field
        v-model="formData.nameZh"
        name="中文名"
        label="中文名"
        placeholder="请填写中文名"
        input-align="center"
        :rules="[{ required: true, message: '请填写中文名' }]"
      />
      <h2 class="title">English Name</h2>
      <van-field
        v-model="namePy"
        name="英文名"
        label="英文名"
        placeholder="请填写英文名"
        input-align="center"
        :rules="[{ required: true, message: '请填写英文名' }]"
      />
      <h2 class="title">Sex</h2>
      <van-field
        class="pickerCol"
        label="性别"
        placeholder="Sex"
        readonly
        clickable
        :value="formData.sex"
        input-align="center"
        @click="showSex = true"
      />
      <van-popup v-model="showSex" position="bottom">
        <van-picker
          show-toolbar
          :columns="sexColumns"
          @confirm="sexConfirm"
          @cancel="showSex = false"
        />
      </van-popup>
      <h2 class="title">Birth Date</h2>
      <van-field
        class="pickerCol"
        label="出生日期"
        placeholder="请选择"
        readonly
        clickable
        :value="formData.birthDate"
        input-align="center"
        :rules="[{ required: true, message: '请选择日期' }]"
        @click="showDate = true"
      />
      <van-popup v-model="showDate" position="bottom">
        <van-datetime-picker
          v-model="defaultDate"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="showDate = false"
          @confirm="dateConfirm"
        />
      </van-popup>
      <h2 class="title">Passport Number</h2>
      <van-field
        v-model="formData.passport"
        name="护照号"
        label="护照号"
        placeholder="请填写护照号"
        input-align="center"
        :rules="[{ required: true, message: '请填写护照号' }]"
      />
      <h2 class="title">IDPA Number</h2>
      <van-field
        v-model="formData.idpa"
        name="IDPA编号"
        label="IDPA编号"
        placeholder="请填写IDPA编号"
        input-align="center"
        :rules="[{ required: true, message: '请填写IDPA编号' }]"
      />
      <h2 class="title">Military or police?</h2>
      <van-field
        class="pickerCol"
        label="是否军警"
        placeholder="Sex"
        readonly
        clickable
        :value="formData.type"
        input-align="center"
        @click="showType = true"
      />
      <van-popup v-model="showType" position="bottom">
        <van-picker
          show-toolbar
          :columns="typeColumns"
          @confirm="typeConfirm"
          @cancel="showType = false"
        />
      </van-popup>
      <h2 class="title">Email</h2>
      <van-field
        v-model="formData.email"
        name="邮箱"
        label="邮箱"
        placeholder="请填写邮箱"
        input-align="center"
        :rules="[{ required: true, message: '请填写邮箱' }]"
      />
      <h2 class="title">Upload Passport</h2>
      <van-field
        name="uploader"
        label="上传护照内页"
        input-align="center"
        label-width="120px"
        style="height: 120px"
      >
        <template #input>
          <img-upload @onUpload="uploadImg" ref="imgUpload"></img-upload>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="primary"
          size="large"
          native-type="submit"
          @click="onSubmit(formData)"
        >
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import VuePy from '../../js/vue-py.js'
import ImgUpload from './ImgUpload'
export default {
  name: 'MemberRegister',
  components: {
    ImgUpload,
  },
  data() {
    return {
      showType: false,
      showDate: false,
      showSex: false,
      defaultDate: new Date(1980, 1, 1),
      minDate: new Date(1950, 1, 1),
      maxDate: new Date(2020, 1, 1),
      sexColumns: ['男', '女'],
      typeColumns: ['军警', '非军警'],
      formData: {
        nameZh: '',
        nameEn: '',
        sex: '男',
        birthDate: '',
        passport: '',
        passportImg: '',
        idpa: '',
        email: '',
        type: '非军警',
      },
    }
  },
  computed: {
    namePy: {
      get() {
        var _nameZh = this.formData.nameZh
        return _nameZh === null ? '' : VuePy.chineseToPinYin(_nameZh)
      },
      set(val) {
        this.formData.nameEn = val
      },
    },
  },
  watch: {
    namePy(newValue, oldValue) {
      this.formData.nameEn = newValue
    },
  },
  methods: {
    dateConfirm(date) {
      this.formData.birthDate =
        date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      this.showDate = false
    },
    sexConfirm(sex) {
      this.formData.sex = sex
      this.showSex = false
    },
    typeConfirm(type) {
      this.formData.type = type
      this.showType = false
    },
    clear() {
      this.formData = {
        nameZh: '',
        nameEn: '',
        sex: '男',
        birthDate: '',
        passport: '',
        passportImg: '',
        email: '',
        type: '非军警',
      }
    },
    onSubmit(formData) {
      this.$toast.success('会员注册成功\n请等待审核')
      if (formData.passportImg == '') {
        this.$toast.fail('请上传护照内页')
        return false
      }
      this.$axios
        .post('/member/register', {
          nameZh: formData.nameZh,
          nameEn: formData.nameEn,
          sex: formData.sex,
          email: formData.email,
          passportNumber: formData.passport,
          passportImg: formData.passportImg,
          idpaNumber: formData.idpaNumber,
          birthDate: new Date(formData.birthDate),
          militaryOrPolice: formData.type,
        })
        .then((resp) => {
          if (resp && resp.status === 200) {
            Toast.success('会员注册成功，请等待审核')
            this.dialogFormVisible = false
            this.clear()
          }
        })
    },
    uploadImg() {
      this.formData.passportImg = this.$refs.imgUpload.url
      //console.log(this.formData.passportImg)
    },
  },
}
</script>

<style scoped>
#app {
  background-color: #f7f8fa;
  text-align: left;
}
.title {
  margin: 0;
  padding: 22px 16px 6px;
  color: rgba(69, 90, 100, 0.6);
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
}
.van-cell {
  font-size: 18px;
  height: 60px;
  line-height: 40px;
}
#uploader {
  height: 120px;
}
#logo {
  src: require(url('../../assets/images/bg/logo-black.jpg'));
}
</style>

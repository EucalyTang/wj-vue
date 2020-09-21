<template>
  <van-uploader
    :after-read="afterRead"
    :before-read="beforeRead"
    v-model="fileList"
    :max-count="1"
  />
</template>

<script>
export default {
  name: 'ImgUpload',
  data() {
    return {
      url: '',
      fileList: []
    }
  },
  computed: {},
  methods: {
    beforeRead(file) {
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        Toast('请上传 jpg/png 格式图片')
        return false
      }
      let isLt1M = file.size / 1024 / 1024 <= 1
      if (!isLt1M) {
        Toast('图片大小1M以内')
        return false
      }
      return true
    },
    afterRead(file) {
      var fileContent = file.content
      this.$axios
        .post(
          '/member/passportimg',
          { content: fileContent },
          {
            'Content-type': 'application/x-www-form-urlencoded'
          }
        )
        .then(response => {
          this.url = response.data
          this.$emit('onUpload')
        })
    }
  }
}
</script>

<style scoped></style>

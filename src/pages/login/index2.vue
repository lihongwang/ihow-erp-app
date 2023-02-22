<template>
  <button open-type="getPhoneNumber" @getphonenumber="getphoneNumber">用户授权登陆</button>
</template>

<script>
export default {
  onload() {},
  methods: {
    //用户授权登陆允许后，返回encryptedData, iv参数
    getPhoneNumber(e) {
      //拿到参数后进一步去解密....
      // 授权通过后轮询等待获取sessionKey响应成功
      if (['getPhoneNumber:ok'].includes(e?.detail?.errMsg)) {
        this.handlePolling(e)
      }
    },

    /**
     * 轮询查询是否有sessionKey,防止初始化接口响应时间过长拿不到解密入参，用户解密失败
     */
    handlePolling(e) {
      this.timer = setInterval(() => {
        if (this.sessionKey) {
          this.decryptDataInfo(e.detail)
          this.timer = null
        }
      }, 300)
    },

    decryptDataInfo(detail) {
      uni.request({
        url: 'https://trial.ihownet.com/v1.0.0/erp/wechat/miniapp/api/userAccess',
        method: 'GET',
        data: {
          code: detail.wx_code, //wx.login 登录成功后的code
        },
        success: (cts) => {
          uni.request({
            url: 'https://trial.ihownet.com/v1.0.0/erp/wechat/miniapp/api/userInfo',
            method: 'GET',
            data: {
              code: this.wx_code, //wx.login 登录成功后的code
            },
            header: {
              Authorization: cts.token, //自定义请求头信息
            },
            success: (res) => {
              let data = res.data.data
              uni.setStorageSync('userInfo', data)
              // console.log(data);
              uni.navigateBack({})
            },
          })
        },
      })
    },
  },
}
</script>

<style></style>

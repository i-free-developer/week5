//app.js
let config = require('./key')
App({
  onLaunch: function () {
    wx.BaaS = requirePlugin('sdkPlugin')
    wx.BaaS.wxExtend(wx.login,
     wx.getUserInfo,
     wx.requestPayment)

    wx.BaaS.init(config.appKey)
    
    wx.BaaS.auth.loginWithWechat().then(res => {
      console.log(res)
    })
  },
  globalData: {
    userInfo: null
  }
})
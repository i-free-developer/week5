// pages/user/user.js
Page({
  data: {
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let page = this
    wx.BaaS.auth.getCurrentUser().then(user => {
      console.log(user)
      page.setData({currentUser: user})

      let Order = new wx.BaaS.TableObject('orders')
      let query = new wx.BaaS.Query()
      query.compare('user_id', '=', user.id)
      Order.setQuery(query).expand(['meal_id']).find().then(res => {
        console.log(res)
        page.setData({orders: res.data.objects})
      })
    })
    // let currentUser = wx.getStorageSync('user');
    // console.log(currentUser)
    // this.setData({currentUser: currentUser})
  },
  login: function (e) {
    console.log(e)
    wx.BaaS.auth.loginWithWechat(e).then(res => {
      console.log(res)
      wx.setStorageSync('user', res)
      this.setData({currentUser: res})
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },

  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})
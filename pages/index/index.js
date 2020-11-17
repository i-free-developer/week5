Page({
  data: {
  },
  onLoad: function () {
    let Restaurant = new wx.BaaS.TableObject('restaurants');
    Restaurant.find().then(res => {
      console.log(res)
      this.setData({restaurants: res.data.objects})
    })

  },
  goToRestaurant: function(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/show/show?id=${id}`,
    })
  }
})

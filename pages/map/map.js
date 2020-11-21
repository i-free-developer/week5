// pages/map/map.js
Page({

  /**
   * Page initial data
   */
  data: {
    markers: [
      {
        iconPath: "/images/marker.png",
        id: 100,
        latitude: 22.53332,
        longitude: 113.93041,
        width: 50,
        height: 50,
        callout: { 
          content: "Lewagon Shenzhen",
          fontSize: 15, 
          color: "#d81e06", 
          padding: 1
        }
      }
    ],
    scale: 14
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let page = this
    wx.getLocation({
      type: 'gcj-02',
      success: function (res) {
        page.setData({latitude: res.latitude, longitude: res.longitude})
      }
    })
    let Restaurant = new wx.BaaS.TableObject('restaurants')
    Restaurant.find().then(res => {
      let restaurants = res.data.objects
      console.log(res)
      let markers = restaurants.map(item => {
        return {
          iconPath: "/images/marker.png",
          id: item.id,
          latitude: item.latitude,
          longitude: item.longitude,
          width: 50,
          height: 50,
          callout: { 
            content: item.name,
            fontSize: 15, 
            color: "#d81e06", 
            padding: 1
          }
        }
      })
      console.log(markers)
      page.setData({restaurants: restaurants, markers: markers})
    })
  },
  tapMarker: function (e) {
    console.log(e)
    this.setData({markerId: e.detail.markerId})
    wx.navigateTo({
      url: `/pages/show/show?id=${e.detail.markerId}`,
    })
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {
    
  }
})
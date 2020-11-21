Page({
  data: {
  },
  onLoad: function () {
    console.log('on load')
    this.fetchRestaurants()
    this.getUserLocation()
    wx.showNavigationBarLoading({
      success: function(res) {
        console.log(res)
      }
    })

    // wx.getClipboardData({
    //   success (res){
    //     console.log(res)
    //     let id = res.data
    //     wx.navigateTo({
    //       url: `/pages/show/show?id=${id}`,
    //     })
    //   }
    // })
    // wx.showActionSheet({
    //   itemList: ['A', 'B', 'C'],
    //   success (res) {
    //     console.log(res.tapIndex)
    //   },
    //   fail (res) {
    //     console.log(res.errMsg)
    //   }
    // })
    
    // wx.showToast({
    //   title: 'Success',
    //   icon: 'success',
    //   duration: 2000
    // }) 
    // wx.showModal({
    //   title: 'Prompt',
    //   content: 'This is a modal pop-up window',
    //   success (res) {
    //     if (res.confirm) {
    //       console.log('"OK" is tapped')
    //     } else if (res.cancel) {
    //       console.log('"Cancel" is tapped')
    //     }
    //   }
    // })
    wx.getBatteryInfoSync(function(res) {
      console.log(res)
    }) 
    
    wx.onNetworkStatusChange(function (res) {
      console.log(res.isConnected)
      console.log(res.networkType)
    })
    wx.setScreenBrightness({value: 0, success: function(res) {
      console.log(res)
    }})
  },
  onShow: function() {
    console.log('on show')
    this.fetchRestaurants()
    wx.showNavigationBarLoading({
      success: function(res) {
        console.log(res)
      }
    })
  },
  phoneCall: function() {
    wx.makePhoneCall({
      phoneNumber: '13530650312' //This number for demonstration purposes only is not a real phone number
    })
  },
  vibrate: function() {
    // wx.scanCode({
    //   onlyFromCamera: true,
    //   success (res) {
    //     console.log(res)
    //     wx.showToast({
    //       title: 'Scaned!',
    //       duration: 3000
    //     })
    //   }
    // })
    wx.chooseAddress({success: function(res) {
      console.log(res)
    }})
    wx.setClipboardData({
      data: 'data setted again',
      success (res) {
        console.log(res)
      }
    })
    // wx.vibrateLong({success: function(res) {console.log(res)}})
  },
  onHide: function() {
    console.log('on hide')
  },
  onUnload: function() {
    console.log('on Unload')
  },
  fetchRestaurants: function() {
    wx.showLoading({
      title: 'Loading',
    })
    let Restaurant = new wx.BaaS.TableObject('restaurants')
    Restaurant.find().then(res => {
      console.log(res)
      wx.hideLoading()
      this.setData({restaurants: res.data.objects})
    })
  },
  getUserLocation: function() {
    let indexPage = this
    wx.getLocation({
      type: 'gcj-02',
      success: function(res) {
        console.log(res)
        indexPage.setData({latitude: res.latitude, longitude: res.longitude})
      }
    })
  },
  goToRestaurant: function(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/show/show?id=${id}`,
    })
  },
  takePhoto: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['camera'],
      success: function (res) {
        console.log(res)
        let File = new wx.BaaS.File()
        let fileParams = {filePath: res.tempFilePaths[0]}
        let metaData = {categoryName: 'SDK'}
        File.upload(fileParams, metaData).then(res => {
          console.log(res)
          let Restaurant = new wx.BaaS.TableObject('restaurants')
          Restaurant.create().set({name: 'New Restaurant', description: 'New!', photo: res.data.path}).save().then(res => {
            console.log(res)
          })
        })
      }
    })
  },
  openLocation: function() {
    let page = this
    wx.openLocation({
      latitude: page.data.latitude,
      longitude: page.data.longitude,
    })
  },
  chooseLocation: function () {
    let page = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        page.setData({latitude: res.latitude, longitude: res.longitude, address: res.address})
        let Restaurant = new wx.BaaS.TableObject('restaurants')
        Restaurant.create().set({name: 'New with Location', description: 'Location', latitude: res.latitude, longitude: res.longitude, address: res.address}).save().then(res => {
          console.log(res)
        })
      },
    })
  }
})

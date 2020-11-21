// pages/show/show.js
Page({

  /**
   * Page initial data
   */
  data: {
    ratings: [1, 2, 3, 4, 5, 7, 8, 10],
    rating: 'tap to rate'
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let currentUser = wx.getStorageSync('user')
    this.setData({currentUser: currentUser})
    console.log(options)
    let Restaurant = new wx.BaaS.TableObject('restaurants');
    let Review  = new wx.BaaS.TableObject('reviews')
    let query = new wx.BaaS.Query()
    query.compare('restaurant_id', '=', options.id)

    Restaurant.get(options.id).then(res => {
      console.log(res)
      this.setData({restaurant: res.data})
    })
    
    Review.setQuery(query).find().then(res => {
      console.log(res)
      this.setData({reviews: res.data.objects})
    })

    let Meal = new wx.BaaS.TableObject('meals')
    let mealQuery = new wx.BaaS.Query()
    mealQuery.compare('restaurant_id', '=', options.id)
    Meal.setQuery(mealQuery).find().then(res => {
      console.log(res)
      this.setData({meals: res.data.objects})
    })
  },
  createReview: function (e) {
    console.log(e)
    let Review = new wx.BaaS.TableObject('reviews')
    let review = Review.create()
    let data = {
      content: e.detail.value.content,
      rating: this.data.rating,
      restaurant_id: this.data.restaurant.id
    }
    review.set(data).save().then(res => {
      console.log(res)
    })
  },
  onRating: function (e) {
    console.log(e)
    let index = e.detail.value
    let rating = this.data.ratings[index]
    console.log(rating)
    this.setData({rating: rating})
  },
  createOrder: function (e) {
    console.log(e)
    let mealId = e.currentTarget.dataset.mealid
    let Order = new wx.BaaS.TableObject('orders')
    let orderData = {
      user_id: this.data.currentUser.id,
      meal_id: mealId
    }
    Order.create().set(orderData).save().then(res => {
      console.log(res)
      wx.navigateTo({
        url: '/pages/user/user',
      })
    })
  },
  goToUser: function () {
    wx.navigateTo({
      url: '/pages/user/user',
    })
  },
  showOnMap: function () {
    wx.openLocation({
      latitude: this.data.restaurant.latitude,
      longitude: this.data.restaurant.longitude,
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
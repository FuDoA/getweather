const app = getApp()
var city = ''
var district=''
Page({
  data:{
    userlongitude:'',
    userlatitude:'',
    gotlocation:false,
    weatherdata:[],
    city:'未知',
    district:'',
    data:[]
  },
  onLoad:function(){
    
  
  },
  onShow:function(){
  
    var that = this
    wx.getLocation({
      success: function(res) {
        that.setData({
          userlatitude: res.latitude,
          userlongitude: res.longitude,
          userlocation: res.longitude + "," + res.latitude
        });
        var locationString = res.longitude + "," + res.latitude;
        wx.request({
          url: 'https://free-api.heweather.com/s6/weather/now',
          data: {
            "location":locationString,
            "key": "7372b077b6ba443c9643b96f22d88207"
          },
          method: 'GET',
          success: function (res1) {
            that.setData({
              weatherdata: res1.data.HeWeather6[0].now,
              city: res1.data.HeWeather6[0].basic.parent_city,
              district: res1.data.HeWeather6[0].basic.location,
              gotweather:true
            });
            


          }
        });
                  
      }
    })
  }
})
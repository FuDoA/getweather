const app = getApp()
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var city = ''
var district=''
var weatherdata=[]
Page({
  data:{
    userlongitude:'',
    userlatitude:'',
    gotlocation:false,
    weatherdata:[],
    district:'未知'
  },
  onLoad:function(){
    qqmapsdk = new QQMapWX({
      key: 'JIMBZ-YE36G-FYXQ4-IQ3YB-C3NG2-KIBCU'
    }); 
    var that = this
    wx.getLocation({
      success: function(res) {
        that.setData({
          userlatitude: res.latitude,
          userlongitude: res.longitude
        })
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res1) {
          var district = res1.result.address_component.district
          var city = res1.result.address_component.city 
          that.setData({
            district:district
          })
          wx.request({
            url: 'http://wthrcdn.etouch.cn/weather_mini?city='+district,
            success:function(res2){
              weatherdata = JSON.parse(res2)
              thie.setData({
                weatherdata: weatherdata,
                gotlocation: true
              }) 
            }

          })
          }          
        })     
      }
    });
  }
})
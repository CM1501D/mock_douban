
const wechat = require('./utils/wechat.js')


const douban = require('./utils/douban.js')


const baidu = require('./utils/baidu.js')

App({

  data: {
    name: 'Douban Movie',
    version: '0.1.0',
    currentCity: '北京'
  },

  
  wechat: wechat,

 
  douban: douban,

 
  baidu: baidu,

 
  onLaunch () {
    wechat
      .getLocation()
      .then(res => {
        const { latitude, longitude } = res
        return baidu.getCityName(latitude, longitude)
      })
      .then(name => {
        this.data.currentCity = name.replace('市', '')
        console.log(`currentCity : ${this.data.currentCity}`)
      })
      .catch(err => {
        this.data.currentCity = '北京'
        console.error(err)
      })
    console.log(' ========== Application is launched ========== ')
  },
  
  onShow () {
    console.log(' ========== Application is showed ========== ')
  },
 
  onHide () {
    console.log(' ========== Application is hid ========== ')
  }
})

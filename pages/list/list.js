
const app = getApp()

Page({

  data: {
    title: '',
    subtitle: '加载中...',
    type: 'in_theaters',
    loading: true,
    hasMore: true,
    page: 1,
    size: 20,
    movies: []
  },

  handleLoadMore () {
    if (!this.data.hasMore) return

    this.setData({ subtitle: '加载中...', loading: true })

    return app.douban.find(this.data.type, this.data.page++, this.data.size)
      .then(d => {
        if (d.subjects.length) {
          this.setData({ subtitle: d.title, movies: this.data.movies.concat(d.subjects), loading: false })
        } else {
          this.setData({ subtitle: d.title, hasMore: false, loading: false })
        }
      })
      .catch(e => {
        this.setData({ subtitle: '获取数据异常', loading: false })
        console.error(e)
      })
  },

 
  onLoad (params) {
    this.data.title = params.title || this.data.title

   
    this.data.type = params.type || this.data.type

    this.handleLoadMore()
  },

  
  onReady () {
    wx.setNavigationBarTitle({ title: this.data.title + ' « 电影 « 豆瓣' })
  },

  
  onShow () {
    
  },

  
  onHide () {
    
  },

 
  onUnload () {
    
  },

 
  onPullDownRefresh () {
    this.setData({ movies: [], page: 1, hasMore: true })
    this.handleLoadMore()
      .then(() => app.wechat.original.stopPullDownRefresh())
  }
})

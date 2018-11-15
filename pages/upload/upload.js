const uploadFileUrl = require('../../config').uploadFileUrl

Page({
  onShareAppMessage() {
    return {
      title: '上传文件',
      path: 'pages/index/index'
    }
  },

  chooseImage() {
    const self = this

    wx.chooseImage({
      count: 1,

      success(res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths[0])

        const imageSrc = res.tempFilePaths[0]

        wx.uploadFile({
          url: uploadFileUrl,
          filePath: imageSrc,
          name: 'data',
          success(res) {
            console.log('uploadImage success, res is:', res)

            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 1000
            })

            self.setData({
              imageSrc
            })
          },
          fail({ errMsg }) {
            console.log('uploadImage fail, errMsg is', errMsg)
          }
        })
      },

      fail({ errMsg }) {
        console.log('chooseImage fail, err is', errMsg)
      }
    })
  }
})

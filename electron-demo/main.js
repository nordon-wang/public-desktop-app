//  项目入口文件

// 开启一个应用  需要引入 app
const { app, BrowserWindow } = require('electron')
const path = require('path')

// 当启动 main.js 时, 会自动触发 app 的 ready 事件
app.on('ready', () => {
  //  在 ready 事件中, 一般进行当前应用的窗口的创建
  createWindow()
})


// 通过一个函数来创建应用的窗口
function createWindow(){
  let win = new BrowserWindow({
    width:1200,
    height:700,
    title:'nordon-calc'
  })


  // 设置窗口中所加载的页面内容
  win.loadURL(path.join(__dirname, '/views/index.html'))

  // 打开开发者工具
  win.webContents.openDevTools()

  // 窗口关闭事件
  win.on('close', event => {
    win = null

    app.quit()
  })

  // 窗口加载完毕 准备显示时
  win.on('ready-to-show', () => {
    win.show()

    win.focus()
  })

  // 引入 菜单
  require('./mainProcess/menu')
}
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

app.on('ready', () => {
  createWindow()
})

let win 

function createWindow(){
  win = new BrowserWindow({
    width:1200,
    height:700,
    title:'测试通信'
  })

  win.loadURL(path.join(__dirname, '/views/renderProcess.html'))
  win.webContents.openDevTools()

  win.on('close', () => {
    win = null
    app.quit()
  })

  // 若是直接使用 webContents 发送消息， 必须添加一个剑灵事件
  // did-finish-load: 触发这个事件，说明 webContents 已经加载完毕
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('sendToRender', 'sendToRender 使用 window.webContents 发送消息')
  })

}

// 监听 渲染进程发送的数据 
ipcMain.on('sendToMain', (event, msg) => {
  // 在 主进程 中打印的数据 是在 终端打印
  // 在 渲染进程 中打印的数据  是在 开发者工具中打印
  console.log(msg)

  // 主进程向渲染进程发送消息
  // event.sender.send('sendToRender', 'sendToRender 主进程向渲染进程发送消息')

  // 使用 window.webContents 发送消息
  // win.webContents.send('sendToRender', 'sendToRender 使用 window.webContents 发送消息')
})

// 设置全局对象，在这个对象中存储不同渲染进程间需要共享的数据
global.shardData = {
  data:'shardData的原始数据'
}
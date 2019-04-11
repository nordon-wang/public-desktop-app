const { ipcRenderer, remote } = require('electron')

const tomain = document.getElementById('tomain')
const newwindow = document.getElementById('newwindow')

// 渲染进程中发送消息给主进程
tomain.addEventListener('click', () => {
  // 通过 ipcRenderer 向主进程发送消息
  // ipcRenderer.send(事件名称, 发送的数据)
  ipcRenderer.send('sendToMain', 'sendToMain 发送的数据')
})

// 渲染进程 监听 主进程 发送的消息
ipcRenderer.on('sendToRender', (event, msg) => {
  console.log(msg)
})

// 弹出一个新的窗口
newwindow.addEventListener('click', () => {

  // BrowserWindow 只能在主进程中使用
  const { BrowserWindow } = remote
  
  const win = new BrowserWindow({
    width:400,
    height:400,
    title:'弹出一个新的窗口'
  })

  win.setMenu(null)

})
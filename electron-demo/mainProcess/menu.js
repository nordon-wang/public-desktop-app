const { Menu, BrowserWindow, dialog } = require('electron')
const path = require('path')

// 构建具体的菜单项
const template = [
  {
    label:'王耀的计算器',
    submenu:[
      {
        label:'关于',
        click:function(){
          aboutWindow()
        }
      },
      {
        label:'退出',
        // role:'quit',
        click: function(menuItem, win, event){
          dialog.showMessageBox({
            type:'info',
            title:'退出提示',
            message:'亲! 别走',
            buttons:[
              '确定',
              '取消'
            ]
          }, (btnIndex) => {
            // 确定退出
            if(btnIndex === 0){
              win.destroy()
            }
          })
        }
      }
    ]
  },
  {
    label:'格式',
    submenu:[
      {
        label:'color',
        // accelerator:'F11',
        accelerator:(function(){
          // 判断操作系统
        if(process.platform === 'darwin'){
          return 'command + shift + c'
        }else{
          return 'control + shift + c'
        }
        })(),
        click: function(){
          console.log('F11')
        }
      },
      {
        label:'字体增大',
        accelerator:'F11',
        click: function(){

        }
      },
      {
        label:'字体减小',
        accelerator:'F12',
        click: function(){

        }
      },
      {
        label:'默认字体',
        accelerator:'F10',
        click: function(){

        }
      }
    ]
  }
]

// 构建菜单项
const menu = Menu.buildFromTemplate(template)

// 将构建好的菜单项 添加到 应用程序
Menu.setApplicationMenu(menu)


function aboutWindow(){
  const win = new BrowserWindow({
    width:700,
    height:600,
    title:"关于"
  })

  win.loadURL(path.join(__dirname, '../views/about.html'))

  // 设置当前窗体不显示菜单项
  win.setMenu(null)
}
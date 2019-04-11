
const one = document.getElementById('one')

// 一些模块或者成员只能在主进程中使用，如果在渲染进程中想使用，必须通过remote模块实现
const { remote } = require('electron')

one.addEventListener('click', () => {

  remote.getGlobal('shardData').data = '修改之后的数据 '
  let { data } = remote.getGlobal('shardData')
  console.log('主进程中存储的数据', data)
})
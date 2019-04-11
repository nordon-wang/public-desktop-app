
const two = document.getElementById('two')

// 一些模块或者成员只能在主进程中使用，如果在渲染进程中想使用，必须通过remote模块实现
const { remote } = require('electron')

two.addEventListener('click', () => {

  const { data } = remote.getGlobal('shardData')
  console.log('被修改之后的数据', data)
})
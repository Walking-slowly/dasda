/** When your routing table is too long, you can split it into small modules**/

const chartsRouter = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    title: '首页',
    url: '/dashboard/index',
    icon: 'qq'
  },
  {
    path: '/permission',
    name: 'Permission',
    title: '设置',
    icon: 'lock',
    list: [
      {
        path: '/directive',
        url: '/permission/directive',
        name: 'DirectivePermission',
        title: '测试测试测试'
      }
    ]
  }
]

export default chartsRouter

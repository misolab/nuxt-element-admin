export default [
  {key: 'index', 'name': '首页', icon: 'icon-shouye', submenu: false},
  {
    key: 'goods', 'name': '商品', icon: 'icon-paihangbang',
    submenu: [
      {key: 'goods', 'name': '商品列表', icon: 'icon-shangquan'},
    ]
  },
  {key: 'order', 'name': '订单', icon: 'icon-dingdan'},
  {key: 'comment', 'name': '评价', icon: 'icon-huati'},
  {
    key: 'store', 'name': '门店', icon: 'icon-shangquan',
    submenu: [
      {key: 'store', 'name': '门店列表', icon: 'icon-shangquan'},
      {key: 'store-staff', 'name': '人员列表', icon: 'icon-shangquan'}
    ]
  },
  {key: 'finance', 'name': '财务', icon: 'icon-yulebao'},
  {key: 'setting', 'name': '设置', icon: 'icon-shezhi'},
];

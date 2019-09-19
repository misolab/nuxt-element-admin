export default [
  {
    key: 'index',
    path: '/',
    name: '首页',
    icon: 'el-icon-s-home',
    children: false,
    permission: null
  },
  {
    key: 'order',
    name: '订单管理',
    icon: 'el-icon-document',
    permission: null,
    children: [
      // {
      //   key: 'order-list',
      //   path: '/goods-list',
      //   name: '订单列表',
      //   permission: null
      // },
      // {
      //   key: 'goods-category',
      //   path: '/goods-category',
      //   name: '商品分类',
      //   permission: null
      // }
    ],
  },

  {
    key: 'goods',
    name: '商品管理',
    icon: 'el-icon-star-off',
    permission: null,
    children: [
      {
        key: 'goods-create',
        path: '/goods/create',
        name: '添加商品',
        permission: null
      },
      {
        key: 'goods',
        path: '/goods',
        name: '商品管理',
        permission: null
      },
      {
        key: 'goods-category',
        path: '/goods/category',
        name: '商品分类',
        permission: null
      }
    ],
  },

  {
    key: 'operation',
    name: '运营管理',
    icon: 'el-icon-s-opportunity',
    permission: null,
    children: [
      {
        key: 'operation-recommend',
        path: '/operation/recommend',
        name: '商品推荐',
        permission: null
      },

      {
        key: 'operation-carousel',
        path: '/operation/carousel',
        name: '商城轮播',
        permission: null
      },
    ],
  },

  {
    key: 'area',
    // path: '/area',
    name: '区域管理',
    icon: 'el-icon-orange',
    permission: null,
    children: [
      {
        key: 'area',
        path: '/area',
        name: '地区管理',
        icon: 'el-icon-discover',
        permission: null
      },
      {
        key: 'area-custom',
        path: '/area/custom',
        name: '自定义地区',
        icon: 'el-icon-discover',
        permission: null
      },
      // {
      //   key: 'self-taking-point',
      //   path: '/self-taking-point',
      //   name: '自取点管理',
      //   icon: 'el-icon-place',
      //   permission: null
      // }
    ],
  },

  {
    key: 'merchant',
    name: '商户管理',
    icon: 'el-icon-ship',
    permission: null,
    children: [
      {
        key: 'merchant',
        path: '/merchant',
        name: '商户列表',
        icon: 'el-icon-discover',
        permission: null
      },
      {
        key: 'merchant-store',
        path: '/merchant/store',
        name: '商户门店',
        icon: 'el-icon-place',
        permission: null
      },
      {
        key: 'merchant-staff',
        path: '/merchant/staff',
        name: '门店员工',
        icon: 'el-icon-place',
        permission: null
      }
    ],
  },

];

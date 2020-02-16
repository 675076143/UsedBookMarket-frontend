import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/category'
  },
  {
    name: 'home',
    component: () => import('../page/index'),
    meta: {
      title: 'Home'
    }
  },
  {
		path: '/login',
    component: () => import('../page/account/login'),
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/register',
    component: () => import('../page/account/register'),
    meta: {
      title: 'Register'
    }
  },
  {
    path: '/addSelling',
    component: () => import('../page/sell/AddSelling'),
    meta: {
      title: 'Selling'
    }
  },
  {
    path: '/published',
    component: () => import('../page/sell/Published'),
    meta: {
      title: 'Published'
    }
  },

  {
    path: '/sold',
    component: () => import('../page/sell/Sold'),
    meta: {
      title: 'Sold'
    }
  },

  {
		path: '/user/index',
    component: () => import('../page/user/index'),
    name: 'user',
    meta: {
      title: 'Profile'
    }
  },
  {
		path: '/user/info',
    component: () => import('../page/user/info/detail'),
    name: 'user',
    meta: {
      title: 'Account '
    }
  },
  {
    path: '/user/modify',
    component: () => import('../page/user/modify'),
    name: 'user',
    meta: {
      title: 'Account '
    }
  },
  {
    path: '/user/balance',
    component: () => import('../page/user/balance'),
    name: 'balance',
    meta: {
      title: 'Balance '
    }
  },
  {
    path: '/user/address',
    component: () => import('../page/user/address/list'),
    meta: {
      title: 'Address'
    }
  },
  {
    path: '/user/address/edit',
    component: () => import('../page/user/address/edit'),
    meta: {
      title: 'Edit Address'
    }
  },
  {
    path: '/user/favorite',
    component: () => import('../page/user/favorite/list'),
    meta: {
      title: 'Star'
    }
  },

  {
    path: '/user/order',
    component: () => import('../page/user/order/list'),
    meta: {
      title: 'Order'
    }
  },
  {
    path: '/user/payment',
    component: () => import('../page/user/order/list'),
    meta: {
      title: 'Order'
    }
  },
  {
    path: '/user/ship',
    component: () => import('../page/user/order/shipList'),
    meta: {
      title: 'To be shipped'
    }
  },
  {
    path: '/user/receive',
    component: () => import('../page/user/order/receiveList'),
    meta: {
      title: 'To be received'
    }
  },
  {
    path: '/user/completed',
    component: () => import('../page/user/order/completed'),
    meta: {
      title: 'Completed'
    }
  },
  {
    path: '/user/order/info/:id',
    component: () => import('../page/user/order/info'),
    meta: {
      title: 'Order'
    }
  },
  {
    path: '/user/order/logistics/:id',
    component: () => import('../page/user/order/logistics'),
    meta: {
      title: '订单追踪'
    }
  },
  {
    path: '/user/aftersale',
    component: () => import('../page/user/aftersale/list'),
    meta: {
      title: '售后'
    }
  },
  {
    path: '/user/aftersale/apply',
    component: () => import('../page/user/aftersale/apply'),
    meta: {
      title: '申请售后'
    }
  },
  {
    path: '/user/aftersale/detail',
    component: () => import('../page/user/aftersale/detail'),
    meta: {
      title: '服务单详情'
    }
  },
  {
    path: '/user/aftersale/track/:id',
    component: () => import('../page/user/aftersale/track'),
    meta: {
      title: '进度详情'
    }
  },
  {
    path: '/product/:id',
    component: () => import('../page/product/detail'),
    meta: {
      title: '商品详情'
    }
  },
  {
    name:'search',
    path: '/search',
    component: () => import('../page/product/list'),
    meta: {
      title: '商品列表'
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../page/cart/index'),
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/order',
    name:'order',
    component: () => import('../page/order/order'),
    meta: {
      title: 'confirm order'
    }
  },
  {
    name: 'category',
    component: () => import('../page/category/index'),
    meta: {
      title: 'Category'
    }
  },
  {
    name: 'communicateService',
    path:'/communicateService',
    component: () => import('../page/communicateService/index'),
    meta: {
      title: 'CommunicateService'
    }
  },
  {
    name: 'messages',
    path:'/user/messages',
    component: () => import('../page/communicateService/list'),
    meta: {
      title: 'Messages'
    }
  },
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};

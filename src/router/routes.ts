const routes = [
  {
    path: '/',
    name: 'address',
    meta: {
      title: 'ثبت آدرس'
    },
    component: () => import('../views/AddressPage.vue'),
  },
  {
    path: '/address-list',
    name: 'addressList',
    meta: {
      title: 'مشاهده آدرس ها'
    },
    component: () => import('../views/AddressPage.vue'),
  },
]

export default routes

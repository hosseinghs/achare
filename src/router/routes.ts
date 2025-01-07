const routes = [
  {
    path: '/',
    name: 'address',
    meta: {
      title: 'ثبت آدرس'
    },
    component: () => import('@/views/AddAddress.vue'),
  },
  {
    path: '/address-list',
    name: 'addressList',
    meta: {
      title: 'مشاهده آدرس ها'
    },
    component: () => import('@/views/AddressList.vue'),
  },
]

export default routes

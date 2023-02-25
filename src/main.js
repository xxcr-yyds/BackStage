import Vue from 'vue'
import App from './App.vue'
import { Input, Form, MessageBox, Pagination, Message, FormItem, DatePicker, Select, Option, Tag, Row, Col, Card, Button, Breadcrumb, BreadcrumbItem, Dialog, Table, TableColumn, Container, Aside, Header, Main, Menu, Submenu, MenuItemGroup, MenuItem, Dropdown, DropdownMenu, DropdownItem } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store/index'
import './api/mock'
import Cookie from 'js-cookie'

Vue.config.productionTip = false
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

Vue.use(Tag);
Vue.use(Input);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Button);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Container);
Vue.use(Dialog);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Main);
Vue.use(Select);
Vue.use(Option);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Table);
Vue.use(Form);
Vue.use(Pagination);
Vue.use(FormItem);
Vue.use(TableColumn);
Vue.use(DatePicker);

// 添加全局前置导航守卫
router.beforeEach((to, from, next) => {
  // token 存在与否
  const token = Cookie.get('token')

  // token 不存在，说明当前用户是未登录，应该跳转到登录页
  if (!token && to.name !== 'login') {
    next({ name: 'login' })

    // token 存在,说明用户登陆，此时跳转带首页
  } else if (token && to.name === 'login') {
    next({ name: 'home' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')

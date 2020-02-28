import Vue from 'vue'
import Router from 'vue-router'
/*登录
*/
import Login from '@/page/Login'
/*经销商
*/
import Client from '@/page/Client'
import cliTip from '@/Components/cli-tip'//经销商网络订单交易提示
import cards from '@/Components/cards'//4张资料卡的父组件
import cliFilecard1 from '@/Components/cli-filecard1'
import protocol from '@/Components/protocol'//协议书
import certificate from '@/Components/certificate'//授权书
/*业务员
*/
import Server from '@/page/server'
import table1 from "@/Components/server/table1";
import table2 from "@/Components/server/table2";
import table3 from "@/Components/server/table3";
import table4 from "@/Components/server/table4";
import table5 from "@/Components/server/table5";
import spotCheck from "@/Components/server/spotCheck";
import spotCheckPass from "@/Components/server/spotCheckPass";
import spotCheckNoPass from "@/Components/server/spotCheckNoPass";

Vue.use(Router)

export default new Router({
  // mode: 'history',
  mode: "hash",
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/client',    //这里是经销商路由
      name: 'client',
      redirect: '/client/tip',
      component: Client,
      children: [
        {
          path: 'tip',
          name: 'cliTip',
          component: cliTip,
          meta: { auth: true },
        },
        {
          path: 'cards',
          name: 'cards',
          component: cards,
          meta: { auth: true },
        },
        {
          path: 'protocol',
          name: "protocol",
          component: protocol,
          meta: { auth: true },
        },
        {
          path: 'certificate',
          name: "certificate",
          component: certificate,
          meta: { auth: true },
        }
      ]
    },
    {
      path: '/server',   //这里是业务员路由
      name: 'server',
      component: Server,
      children: [
        {
          path: 'card-gather',
          name: 'card-gather',
          component: table1,
          meta: { auth: true },
        },
        {
          path: 'pending-protocol',
          name: 'pending-protocol',
          component: table2,
          meta: { auth: true },
        },
        {
          path: 'pended-protocol',
          name: 'pended-protocol',
          component: table3,
          meta: { auth: true },
        },
        {
          path: 'card-exe-gather',
          name: 'card-exe-gather',
          component: table4,
          meta: { auth: true },
        },
        {
          path: 'cert-exe-gather',
          name: 'cert-exe-gather',
          component: table5,
          meta: { auth: true },
        },
        {
          path: 'spotCheck',
          name: 'spotCheck',
          component: spotCheck,
          meta: { auth: true },
        },
        {
          path: 'spotCheckPass',
          name: 'spotCheckPass',
          component: spotCheckPass,
          meta: { auth: true },
        },
        {
          path: 'spotCheckNoPass',
          name: 'spotCheckNoPass',
          component: spotCheckNoPass,
          meta: { auth: true },
        },
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
import { createRouter, createWebHashHistory } from 'vue-router'
import ControllPanel from "../views/ControllPanelView.vue"
import TotemView from "../views/TotemView.vue"
import AttendantView from "../views/AttendantView.vue"
import WaitingRoomView from "../views/WaitingRoomView.vue"

const routes = [
    {
      path: '/',
      name: 'ControllPanel',
      component: ControllPanel
    },
    {
      path: '/totem/:env',
      name: 'TotemView',
      component: TotemView
    },
    {
      path: '/Attendant/:env',
      name: 'AttendantView',
      component: AttendantView
    },
    {
      path: '/WaitingRoom/:env',
      name: 'WaitingRoomView',
      component: WaitingRoomView
    },
  ]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})

export default router

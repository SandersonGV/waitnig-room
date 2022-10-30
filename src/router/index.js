import { createRouter, createWebHashHistory } from 'vue-router'
import ControllPanel from "../views/ControllPanelView.vue"
import TotemView from "../views/TotemView.vue"
import AttendantView from "../views/AttendantView.vue"
import WaitingRoomView from "../views/WaitingRoomView.vue"
import EnvironmentView from "../views/EnvironmentView.vue"

const routes = [
    {
      path: '/',
      name: 'ControllPanel',
      component: ControllPanel
    },
    {
      path: '/environment/:env',
      name: 'EnvironmentView',
      component: EnvironmentView
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

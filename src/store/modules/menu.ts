import { getMenus } from '@/apis/menu'
import { defineStore } from 'pinia'
import { store } from '@/store'
import menuMock from '../mock/menu.json'
interface MenuState {
  list: any
}
export interface MenuListItem {
  title?: string
  list?: []
}
export const useMenuStore = defineStore({
  id: 'app-menu',
  state: (): MenuState => ({
    // token
    list: menuMock,
  }),
  getters: {
    purchase(state) {
      return state.list.purchase
    },
    menuList(state) {
      return state.list
    },
  },
  actions: {
    init() {
      return new Promise((resolve) => {
        getMenus().then((menus: any) => {
          console.log(menus)
          this.list = (menus || []).map((menu) => {
            return {
              title: menu.name,
              list: (menu.children || []).map((c) => {
                return {
                  title: c.name,
                  url: `/pages${c.route}`,
                }
              }),
            }
          })
          resolve(this.list)
        })
      })
    },
    resetState() {
      this.list = {}
    },
  },
})

// Need to be used outside the setup
export function useMenuStoreWithOut() {
  return useMenuStore(store)
}

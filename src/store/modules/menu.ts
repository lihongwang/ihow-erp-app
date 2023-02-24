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
    resetState() {
      this.list = {}
    },
  },
})

// Need to be used outside the setup
export function useMenuStoreWithOut() {
  return useMenuStore(store)
}

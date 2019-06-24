import * as types from './mutation-types'

const state = {
  headerMenu: false,
  shareMenu: false
}

const getters = {
  getHeaderMenu: state => state.headerMenu,
  getShareMenu: state => state.shareMenu

}

const actions = {
  updateHeaderMenu ({commit},info) {
    commit(types.UPDATE_HEADER_MENU,info)
  },
  updateShareMenu ({commit},info) {
    commit(types.UPDATE_SHARE_MENU,info)
  }
}

const mutations = {
  [types.UPDATE_HEADER_MENU] (state,info) {
    state.headerMenu = info
  },
  [types.UPDATE_SHARE_MENU] (state,info) {

    state.shareMenu = info
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

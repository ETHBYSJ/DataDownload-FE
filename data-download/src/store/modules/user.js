import types from '../types'
import api from '../../api'
import {USER_TYPE} from '../../utils/constants'

const state = {
  user: {}
}

const getters = {
  user: state => state.user,
  isAuthenticated: (state, getters) => {
    return !!getters.user.id
  },
  isAdmin: (state, getters) => {
    return getters.user.userType ===  USER_TYPE.ADMIN
  }
}

const mutations = {
  [types.CHANGE_USER] (state, {user}) {
    state.user = user
    if(user.language) {
      this.$i18n.locale = user.language
    }
    // console.log(state.user)
  }
}

const actions = {
  getUser ({commit}) {
    api.user.getUserInfo().then(res => {
      // console.log(res)
      commit(types.CHANGE_USER, {
        user: res.data.data || {}
      })
    }).catch(() => {
      this.$error(this.$t('m.Check_Login'))
    })
  },
  clearUser ({commit}) {
    commit(types.CHANGE_USER, {
      user: {}
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

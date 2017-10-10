import * as types from './mutation-types'

export const addToCart = ({ commit }, token) => {
  commit(types.RECEIVE_DASHBOARD, {
    id: token
  })
}

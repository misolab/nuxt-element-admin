export const state = () => ({
  is_virtual: false,
  multiple_spec: false,
})

export const mutations = {
  setVirtual(state, val) {
    state.is_virtual = val
  },

  setMultipleSpec(state, val) {
    state.multiple_spec = val
  },
}

export const getter = {
  getVirtual(state) {
    return state.is_virtual
  },
}


export default {
  state: {
    count: 9899
  },
  mutations: {
    increment: state => state.count++,
  },
  actions: {
    add() {
      this.commit('increment')
    }
  },
  getters: {
    getCount : state => state.count 
  }
}
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: '',
    repoData: []
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setData(state, payload) {
      state.repoData = payload;
    }
  },
  actions: {
    loadMeetups({ commit, getters }) {
      commit('setLoading', true);
    }
  }
});

export default store;

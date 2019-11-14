import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import axios from 'axios';

const store = new Vuex.Store({
  state: {
    username: '',
    repoData: []
  },
  mutations: {
    setUser(state, payload) {
      state.username = payload;
    },
    setData(state, payload) {
      state.repoData = payload;
    }
  },
  actions: {
    loadData(context, payload) {
      return axios
        .get(`https://api.github.com/users/${payload}/repos`)
        .then(response => {
          console.log(response.data);
          context.commit('setData', response.data);
        })
        .catch(error => {});
    }
  }
});

export default store;

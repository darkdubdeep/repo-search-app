import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import axios from 'axios';

const store = new Vuex.Store({
  state: {
    username: '',
    repoData: [],
    contributionsData: []
  },
  mutations: {
    setUser(state, payload) {
      state.username = payload;
    },
    setRepoData(state, payload) {
      state.repoData = payload;
    },
    setContributionsData(state, payload) {
      state.contributionsData = payload;
      console.log(state.contributionsData, 'store');
    }
  },
  actions: {
    loadData(context, payload) {
      return axios
        .get(`https://api.github.com/users/${payload}/repos`)
        .then(response => {
          context.commit('setRepoData', response.data);
        })
        .catch(error => {});
    },
    loadContributions(context, payload) {
      return axios
        .get(
          `https://api.github.com/repos/${context.state.username}/${payload}/contributors`
        )
        .then(response => {
          context.commit('setContributionsData', response.data);
        })
        .catch(error => {});
    }
  }
});

export default store;

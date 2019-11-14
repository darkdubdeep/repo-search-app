import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import axios from 'axios';

const store = new Vuex.Store({
  state: {
    username: '',
    repoData: [],
    contributionsData: [],
    loading: false,
    error: null
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
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    }
  },
  actions: {
    loadData(context, payload) {
      localStorage.setItem('gitHubUser', payload);
      return axios
        .get(`https://api.github.com/users/${payload}/repos`)
        .then(response => {
          context.commit('setRepoData', response.data);
        })
        .catch(error => {
          context.commit('setError', error.response.data.message);
        })
        .finally(() => {
          context.commit('setLoading', false);
        });
    },
    loadContributions(context, payload) {
      context.commit('setLoading', true);
      const repoName = payload;
      const user = context.state.username || localStorage.getItem('gitHubUser');
      return axios
        .get(`https://api.github.com/repos/${user}/${repoName}/contributors`)
        .then(response => {
          context.commit('setContributionsData', response.data);
        })
        .catch(error => {
          context.commit('setError', error.response.data.message);
        })
        .finally(() => {
          context.commit('setLoading', false);
        });
    }
  }
});

export default store;

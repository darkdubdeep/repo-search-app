<template>
  <div>
    <h1>REPO LIST</h1>
    <input
      type="text"
      name="gh-username"
      placeholder="Search for a GitHub username..."
      v-model="username"
      @keydown.13="search"
      :class="{ 'has-error': error }"
    />
    <span class="loading" v-if="loading"
      >Searching GitHub for "{{ username }}"...</span
    >
    <ul v-if="results">
      <li v-for="item in results" :key="item.id">
        <router-link :to="{ path: `repository/${item.name}` }">{{
          item.name
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'RepoSearchList',
  props: {
    msg: String
  },
  data: () => ({
    username: '',
    error: '',
    loading: false
  }),
  computed: {
    results: function() {
      return this.$store.state.repoData;
    }
  },
  watch: {
    username: function(val) {
      this.error = '';
    }
  },
  mounted() {
    console.log('store', this.$store.state);
  },
  methods: {
    search: function() {
      if (this.username) {
        this.loading = true;
        this.$store.dispatch('loadData', this.username);
        this.$store.commit('setUser', this.username);
      } else {
        this.error = '';
      }
    }
  }
};
</script>

<style scoped lang="scss"></style>

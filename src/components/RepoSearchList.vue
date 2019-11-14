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
    <span class="loading" v-if="loading">Searching GitHub for "{{ username }}"...</span>
    <ul v-if="results">
      <li v-for="item in results" :key="item.id">
        <router-link :to="{ path: `repository/${item.name}`}">{{ item.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RepoSearchList",
  props: {
    msg: String
  },
  data: () => ({
    username: "",
    results: "",
    error: "",
    loading: false
  }),
  watch: {
    username: function(val) {
      this.error = "";
    }
  },
  methods: {
    search: function() {
      if (this.username) {
        this.loading = true;
        axios
          .get(`https://api.github.com/users/${this.username}/repos`)
          .then(response => {
            console.log(response.data);

            this.results = response.data;
            this.error = "";

            this.loading = false;
          })
          .catch(error => {
            this.results = "";
            this.error = error;

            this.loading = false;
          });
      } else {
        this.results = "";
        this.error = "";

        this.loading = false;
      }
    }
  }
};
</script>

<style scoped lang="scss">
</style>

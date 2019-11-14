<template>
  <div>
    <h1>REPOSITORY LIST</h1>
    <h2 class="loading" v-if="loading">Searching</h2>
    <input
      type="text"
      name="gh-username"
      placeholder="Search for a GitHub username..."
      v-model="username"
      @keyup="search"
    />
    <ul v-if="!error && !loading">
      <li v-for="item in repoData" :key="item.id">
        <router-link :to="{ path: `repository/${item.name}` }">{{ item.name }}</router-link>
      </li>
    </ul>
    <h4 v-if="error">{{error}}</h4>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "RepoSearchList",
  data: () => ({
    username: "",
    timeOut: null
  }),
  computed: {
    ...mapState(["loading", "repoData", "error"])
  },
  methods: {
    search: function() {
      if (this.username) {
        this.$store.commit("setLoading", true);
        this.$store.commit("setError", null);
        if (this.timeOut) {
          clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(() => {
          this.$store.dispatch("loadData", this.username);
          this.$store.commit("setUser", this.username);
        }, 500);
      }
    }
  }
};
</script>

<style scoped lang="scss"></style>

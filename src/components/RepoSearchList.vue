<template>
  <div>
    <h1>REPOSITORY LIST</h1>
    <input
      type="text"
      name="gh-username"
      placeholder="Search for a GitHub username..."
      v-model="username"
      @keydown="search"
    />
    <h2 class="loading" v-if="loading">Searching</h2>
    <ul v-if="results">
      <li v-for="item in results" :key="item.id">
        <router-link :to="{ path: `repository/${item.name}` }">{{ item.name }}</router-link>
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
    error: "",
    loading: false,
    timeOut: null
  }),
  computed: {
    results: function() {
      return this.$store.state.repoData;
    }
  },
  watch: {
    username: function(val) {
      this.error = "";
    }
  },
  methods: {
    search: function() {
      if (this.username) {
        console.log(this.username);
        if (this.timeOut) {
          clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(() => {
          console.log("typed");
          this.$store.dispatch("loadData", this.username);
          this.$store.commit("setUser", this.username);
        }, 500);
      } else {
        this.error = "";
      }
    }
  }
};
</script>

<style scoped lang="scss"></style>

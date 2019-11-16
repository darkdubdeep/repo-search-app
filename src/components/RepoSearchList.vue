<template>
  <div>
    <div class="search">
      <input
        type="text"
        name="gh-username"
        placeholder="Search for a GitHub repository by username"
        autocomplete="off"
        :value="username"
        @keyup="search"
        class="search-input"
      />
      <ul v-show="!error && !loading && username.length > 0" class="search-list">
        <li v-for="item in repoData" :key="item.id" class="search-list__item">
          <router-link
            :to="{ path: `repository/${item.name}` }"
            class="search-list__item__link"
          >{{ item.name }}</router-link>
        </li>
      </ul>
    </div>
    <h4 v-if="error">{{ error }}</h4>
    <h4 v-if="!error && !loading && repoData.length < 1 && username.length > 0">No repositories</h4>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "RepoSearchList",
  data: () => ({
    timeOut: null
  }),
  computed: {
    ...mapState(["loading", "repoData", "error", "username"])
  },
  methods: {
    search: function(e) {
      this.$store.commit("setUser", e.target.value);
      if (e.target.value.length) {
        this.$store.commit("setLoading", true);
        this.$store.commit("setError", null);
        if (this.timeOut) {
          clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(() => {
          this.$store.dispatch("loadData", e.target.value);
        }, 500);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.search {
  width: 300px;
  margin: 0 auto;
  &-input {
    height: 30px;
    width: 90%;
    transition: 0.7s;
    outline-color: #1895ff;
    padding: 0 5px 0 5px;
  }
  &-list {
    background-color: #f5faff;
    margin-top: 0;
    text-align: left;
    list-style-type: none;
    padding-left: 0;
    &__item {
      width: 95%;
      margin-left: 8px;
      transition: 0.3s;
      &:hover {
        background: #a2d4ff;
      }
      &__link {
        color: rgb(28, 53, 83);
        text-decoration: none;
        display: inline-block;
        padding: 8px 0 8px 3px;
        width: 100%;
      }
    }
  }
}
</style>

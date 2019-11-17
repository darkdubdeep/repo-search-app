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
      <div v-if="!error && !loading && username.length && repoData.length">
        <ul class="search-list">
          <li v-for="item in repoData" :key="item.id" class="search-list__item">
            <router-link
              :to="{ path: `repository/${item.name}` }"
              class="search-list__item__link"
            >{{ item.name }}</router-link>
          </li>
        </ul>
      </div>
      <div v-else-if="!error && !loading && !repoData.length && username.length">
        <h4>No repositories</h4>
      </div>
      <div v-else>
        <h4>{{ error }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "RepoSearchList",
  data() {
    return {
      timeOut: null
    };
  },
  computed: {
    ...mapState(["loading", "repoData", "error", "username"])
  },
  methods: {
    search(e) {
      let userName = e.target.value;
      this.$store.commit("setUser", userName);
      /**
       * In this case, i chosed to use :value of userName from state insted of v-model
       * in search input, because it  can be annoing to a user to type username
       * every time when he back from repository detail page.
       */
      if (userName.length) {
        this.$store.commit("setLoading", true);
        this.$store.commit("setError", null);
        /**
         *  Settimeout function needed here for avoid sending to much requests to the server
         */
        if (this.timeOut) {
          clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(() => {
          this.$store.dispatch("loadData", userName);
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

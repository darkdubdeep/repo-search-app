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
      <!--Will show if the user has no repositories-->
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
       * In this case, i chosed to use :value of userName from state instead of v-model
       * in search input, because it could be annoying to a user to type username
       * every time when he goes back from repository detail page.
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
/* Styles for desktop screens */
.search {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
  &-input {
    height: 30px;
    width: 300px;
    box-sizing: border-box;
    transition: 0.7s;
    outline-color: #1895ff;
    padding: 0 5px 0 5px;
  }
  &-list {
    background-color: #f5faff;
    margin-top: 0;
    width: 300px;
    text-align: left;
    list-style-type: none;
    margin-right: 0;
    padding-left: 0;
    &__item {
      width: 300px;
      padding-left: 8px;
      box-sizing: border-box;
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
/* Styles for mobile screens */
@media only screen and (max-width: 480px) {
  .search {
    width: 100%;
    margin: 0 15px 15px 0;
    &-input {
      border: 1px solid #1895ff;
      font-size: 16px;
      height: 45px;
      width: initial;
    }
    &-list {
      width: 100%;
      &__item {
        border-bottom: 1px solid #1895ff;
        width: initial;
        margin: 0px;
      }
    }
  }
}
/* Styles for tablet screens */
@media only screen and (max-width: 960px) {
}
</style>
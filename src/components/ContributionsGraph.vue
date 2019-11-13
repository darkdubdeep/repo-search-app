<template>
  <div>detail</div>
</template>

<script>
import axios from "axios";

export default {
  name: "ContributionsGraph",
  props: {
    data: Array
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
          .get("https://api.github.com/users/" + this.username + "/repos")
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

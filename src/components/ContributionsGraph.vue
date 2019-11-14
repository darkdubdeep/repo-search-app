<template>
  <div>
    {{ name }}
    {{ newsletterPopup }}
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ContributionsGraph",
  props: {
    name: String,
    newsletterPopup: String,
    data: Array
  },
  data: () => ({
    error: "",
    loading: false
  }),
  mounted() {
    console.log(this.$route);
  },
  methods: {
    search: function() {
      if (this.username) {
        this.loading = true;
        axios
          .get(`https://api.github.com/repos/${this.username}/${name}/`)
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

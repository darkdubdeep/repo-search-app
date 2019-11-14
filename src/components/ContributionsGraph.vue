<template>
  <div>
    <h3 v-if="loading">Loading</h3>
    <ve-histogram v-else :data="countributionsData" :settings="chartSettings"></ve-histogram>
    <button @click="goBack">Back</button>
    <h4 v-if="error">{{error}}</h4>
  </div>
</template>

<script>
import axios from "axios";
import { VeHistogram } from "v-charts";
import { mapState } from "vuex";
export default {
  name: "ContributionsGraph",
  components: {
    VeHistogram
  },
  props: {
    name: String
  },
  data: () => ({
    columns: ["contributions"],
    chartSettings: {
      metrics: ["contributions"],
      dimension: ["login"]
    }
  }),
  computed: {
    ...mapState(["contributionsData", "error", "loading"]),
    countributionsData: function() {
      return {
        columns: this.columns,
        rows: this.contributionsData
      };
    }
  },
  methods: {
    goBack: function() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.$store.dispatch("loadContributions", this.$route.params.name);
  },
  beforeDestroy() {
    this.$store.commit("setError", null);
    this.$store.commit("setLoading", false);
  }
};
</script>

<style scoped lang="scss"></style>

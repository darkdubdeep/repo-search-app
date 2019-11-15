<template>
  <div>
    <LoadingIndicator :loading="loading" />
    <ve-histogram :data="countributionsData" :settings="chartSettings"></ve-histogram>
    <h4 v-if="error">{{error}}</h4>
  </div>
</template>

<script>
import axios from "axios";
import LoadingIndicator from "./LoadingIndicator";

import { VeHistogram } from "v-charts";
import { mapState } from "vuex";
export default {
  name: "ContributionsGraph",
  components: {
    VeHistogram,
    LoadingIndicator
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

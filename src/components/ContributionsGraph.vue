<template>
  <div>
    <ve-histogram :data="countributionsData" :settings="chartSettings"></ve-histogram>
    <h4 v-if="error">{{ error }}</h4>
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
  data() {
    return {
      columns: ["contributions"],
      chartSettings: {
        metrics: ["contributions"],
        dimension: ["login"]
      }
    };
  },
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
    /**
     *  if you want to clear user name on every back, please, uncomment the she state mutation bellov
     */
    //this.$store.commit('setUser', '');
  }
};
</script>

<style scoped lang="scss"></style>

<template>
  <div>
    <ve-histogram
      :data="countributionsData"
      :settings="chartSettings"
    ></ve-histogram>
  </div>
</template>

<script>
import axios from 'axios';
import { VeHistogram } from 'v-charts';
export default {
  name: 'ContributionsGraph',
  components: {
    VeHistogram
  },
  props: {
    name: String
  },
  data: () => ({
    error: '',
    loading: false,
    columns: ['contributions'],
    chartSettings: {
      metrics: ['contributions'],
      dimension: ['login']
    }
  }),
  computed: {
    countributionsData: function() {
      return {
        columns: this.columns,
        rows: this.$store.state.contributionsData
      };
    }
  },
  mounted() {
    this.$store.dispatch('loadContributions', this.$route.params.name);
  }
};
</script>

<style scoped lang="scss"></style>

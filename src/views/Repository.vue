<template>
  <div class="home">
    <ContributionsGraph />
    <button @click="goBack">Back</button>
  </div>
</template>

<script>
import ContributionsGraph from "@/components/ContributionsGraph.vue";

export default {
  name: "Repository",
  components: {
    ContributionsGraph
  },
  methods: {
    goBack: function() {
      this.$router.go(-1);
    }
  },
  mounted() {}
};
</script>


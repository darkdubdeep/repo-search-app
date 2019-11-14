<template>
  <div class="home">
    <ContributionsGraph />
  </div>
</template>

<script>
import ContributionsGraph from "@/components/ContributionsGraph.vue";

export default {
  name: "Repository",
  components: {
    ContributionsGraph
  },
  mounted() {}
};
</script>


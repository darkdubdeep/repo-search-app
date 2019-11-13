<template>
  <div class="home">
    <ContributionsGraph />
    {{ $route.params.name }}
  </div>
</template>

<script>
import ContributionsGraph from "@/components/ContributionsGraph.vue";

export default {
  name: "home",
  components: {
    ContributionsGraph
  },
  mounted() {}
};
</script>


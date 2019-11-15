<template>
  <div class="home">
    <ContributionsGraph />
    <button @click="goBack" class="btn--primary">Back</button>
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

    

<style scoped lang="scss">
.btn--primary {
  background-color: #1895ff;
  width: 200px;
  color: #fff;
  padding: 0 16px;
  height: 62px;
  cursor: pointer;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.3);
  transition: all 0.15s ease-in-out;
  font-size: 18px;
  &:hover {
    box-shadow: 0 3px 2px 0 rgba(0, 0, 0, 0.3);
    background-color: #006ecb;
  }
}
</style>

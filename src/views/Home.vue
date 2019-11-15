<template>
  <div class="home">
    <h1>REPOSITORY LIST</h1>
    <RepoSearchList />
  </div>
</template>

<script>
import RepoSearchList from "@/components/RepoSearchList.vue";

export default {
  name: "home",
  components: {
    RepoSearchList
  }
};
</script>



<style scoped lang="scss">
h1 {
  margin-top: 150px;
  color: rgb(28, 53, 83);
}
</style>

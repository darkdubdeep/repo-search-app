<template>
  <div class="home">
    <h1>REPOSITORY LIST</h1>
    <LoadingIndicator />
    <RepoSearchList />
  </div>
</template>

<script>
import RepoSearchList from '@/components/RepoSearchList.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';

export default {
  name: 'home',
  components: {
    RepoSearchList,
    LoadingIndicator
  }
};
</script>

<style scoped lang="scss">
h1 {
  margin-top: 50px;
  color: rgb(28, 53, 83);
}
</style>

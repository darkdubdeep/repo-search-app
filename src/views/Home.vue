<template>
  <div class="home">
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

<template>
  <div class="loading-indicator">
    <h3 v-if="loading">Loading...</h3>
  </div>
</template>

<script>
export default {
  props: {
    loading: Boolean
  }
};
</script>



<style scoped lang="scss">
.loading-indicator {
  min-height: 35px;
}
</style>

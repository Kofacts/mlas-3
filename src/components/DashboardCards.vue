<template>
  <div class="container">
    <div class="card p-5 mt-2">
      <div class="card-content">
        <slot name="card-content__fields"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["stage"]
};
</script>

<style lang="scss" scoped>
.card {
  height: 100%;
}
</style>

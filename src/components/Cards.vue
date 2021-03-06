<template>
  <div class="container">
    <div class="card p-5">
      <div class="card-content">
        <div v-show="stage" class="card-content__s" :id="'stage'+stage">
          <h6 class="text-small">Step {{stage}} of 4</h6>
          <div class="card-content__stage">
            <div class="card-content__stage-progress"></div>
          </div>
        </div>
        <div class="mt-5 pt-4">
          <div class="pt-5 pb-5">
            <slot name="card-content__fields"></slot>
          </div>
        </div>
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
.card-content {
  #stage2 {
    .card-content__stage-progress {
      width: calc(400px / 3);
    }
  }
  #stage3 {
    .card-content__stage-progress {
      width: calc(400px / 2);
    }
  }
  #stage4 {
    .card-content__stage-progress {
      width: calc(400px /1);
    }
  }
}
</style>

<template>
  <div class="alert" v-if="show">
    <slot name="description"></slot>
    <span class="close" @click="show=false">
      <i class="zmdi zmdi-close"></i>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.alert {
  background: wheat;
  font-size: 10px !important;
  width: 50%;
  margin: 0 auto;
  position: relative;
  h6 {
    font-size: 14px;
    line-height: 20px;
    text-align: left;
  }

  .close {
    position: absolute;
    top: -10px;
    right: 0;
    font-size: 13px;
    height: 20px;
    width: 20px;
    background: black;
    color: white;
    text-shadow: navajowhite;
    opacity: 1;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    display: flex;
    cursor: pointer;
  }
}
</style>
<script>
  export default {
    data() {
      return {
        show:true,
      }
    },
  }
</script>

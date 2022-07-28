<template>
  <div class="current-month">
    <h3>{{ data }} events</h3>
    <h5>This month</h5>
  </div>
</template>

<script>
export default {
  name: "stats",
  props: {
    data: {
      type: Number,
      required: true,
      default: 0
    }
  }
};
</script>

<style lang="css" scoped>
.current-month {
  position: fixed;
  left: 91%;
  top: 28%;
  padding: 7px;
  width: 136px;
  text-align: center;
  border-radius: 5px;
  background: #fff;
}
</style>
<template>
  <div style="width: 50%; margin: 0 auto; padding: 30px 0">
   {{ msg }}
  </div>
</template>

<script>
export default {
  name: "BeAdded",
  props: {
    msg: {
      type: String,
      default: "Insert some random motivational quote :/",
      required: true
    }
  },
};
</script>
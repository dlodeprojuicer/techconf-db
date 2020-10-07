<template>
  <div class="current-month">
    <h3>{{ data }} events</h3>
    <h5>This month</h5>
  </div>
</template>

<script>
// import { IonIcon, IonFabButton, IonFabList, IonFab } from "@ionic/vue";
// import {
//   add,
//   logInOutline,
//   lockOpenOutline,
//   informationCircleOutline,
// } from "ionicons/icons";
// import { mapGetters } from "vuex";

export default {
  name: "stats",
  props: {
    data: {
      type: Number,
      required: true,
      default: 0
    }
  },
  // components: { IonIcon, IonFabButton, IonFabList, IonFab },
  // setup() {
  //   return {
  //     add,
  //     logInOutline,
  //     lockOpenOutline,
  //     informationCircleOutline,
  //   };
  // },
  mounted() {
    // this.addEventModal();
  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>
.current-month {
  position: fixed;
  left: 75%;
  top: 40%;
  padding: 20px;
  border-radius: 5px;
  background: #fff;
}
</style>
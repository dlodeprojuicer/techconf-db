<template>
  <div class="current-month">
    <h3>4</h3>
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
import { mapGetters } from "vuex";

export default {
  name: "stats",
  // components: { IonIcon, IonFabButton, IonFabList, IonFab },
  // setup() {
  //   return {
  //     add,
  //     logInOutline,
  //     lockOpenOutline,
  //     informationCircleOutline,
  //   };
  // },
  computed: {
    ...mapGetters(["loginToken"]),
  },
  mounted() {
    // this.addEventModal();
  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>

</style>
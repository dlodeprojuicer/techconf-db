<template>
  <ion-app>
    <Header />
    <ion-router-outlet id="menuContent" />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import Header from "./components/Header";

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    Header
  },
  mounted() {
    console.log(this.$route.query.ref);
    if (this.$route.query.ref) {
      this.$store.dispatch("refTracker", this.$route.query.ref).then(() => {
        console.log("refTracker updated");
      }).catch(err => {
        console.log("refTracker updated error: ", err);
      });
    }
  }
});
</script>

<style>
ion-router-outlet {
  margin-top: 25px;
}
</style>
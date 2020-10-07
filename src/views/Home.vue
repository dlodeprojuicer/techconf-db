<template>
  <ion-page>
    <Header />
    <ion-content class="ion-padding">
      <SkeletonText v-if="loading" />
      <h2 class="heading-h2" v-if="events.length > 0 ">
        A  concise list of tech conferences in ZA
      </h2>
      <ConfList :data="events" v-if="events.length > 0 " />
      <NoEvents v-if="!loading && events.length < 1" />
      <!-- <Stats /> -->
    </ion-content>
    <!-- <Fab /> -->
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonContent
} from "@ionic/vue";

import { defineComponent } from 'vue';

import Header from "../components/Header";
import ConfList from "../components/ConfList";
// import Fab from "../components/Fab";
import SkeletonText from "../components/SkeletonText";
import NoEvents from "../components/NoEvents";
// import Stats from "../components/Stats";

import { mapGetters } from 'vuex';

export default defineComponent({
  name: "home",
  title: "Home",
  requiresAuth: false,
  components: {
    IonContent,
    IonPage,
    Header,
    ConfList,
    SkeletonText,
    // Fab,
    NoEvents
    // Stats
  },
  computed: {
    ...mapGetters(['loginToken', 'events']),
  },
  mounted() {
    this.fetchEvents()
  },
  data() {
    return {
      // events: [],
      loading: true
    }
  },
  methods: {
    fetchEvents() {
      this.$store.dispatch("getEvents").then(data => {
        console.log("eee", data);
        this.events = data;
        this.loading = false;
      }).catch(error => {
          this.loading = false;
        // eslint-disable-next-line
        console.log(error);
      });
    },

  },
});
</script>


<style lang="scss">
.heading-h2 {
  font-size: 20px;
  text-align: center;
  color: #000;
}
</style>
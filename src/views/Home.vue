<template>
  <ion-page>
    <ion-content class="ion-padding">
      <Highlights :data="monthEventCount" class="desktop-only"/>
      <!-- <h1 class="heading-h2">
        A concise list of tech conferences in ZA
      </h1> -->
      <div class="lg-content-center">
        <SearchFilters :venue="true" />
        <SkeletonText v-if="loading" />
        <ConfList :data="filteredEvents" v-if="filteredEvents.length > 0" />
        <h2 v-if="filteredEvents.length < 1">No search results</h2>
      </div>
    </ion-content>
    <Fab />
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';

import {
  IonPage,
  IonContent
} from "@ionic/vue";

import ConfList from "../components/ConfList";
import Fab from "../components/Fab";
import SkeletonText from "../components/SkeletonText";
import SearchFilters from "../components/SearchFilters";
import Highlights from "../components/Highlights";

import { mapGetters } from 'vuex';

export default defineComponent({
  name: "home",
  title: "Home",
  requiresAuth: false,
  components: {
    IonContent,
    IonPage,
    ConfList,
    SkeletonText,
    Highlights,
    SearchFilters,
    Fab,
  },
  computed: {
    ...mapGetters(['events', 'filteredEvents', 'monthEventCount']),
  },
  data() {
    return {
      loading: true
    }
  },
  methods: {
    ionViewDidEnter() {
      this.fetchEvents();
    },
    fetchEvents() {
      this.$store.dispatch("getEvents").then(() => {
        this.loading = false;
      }).catch(error => {
          this.loading = false;
        // eslint-disable-next-line
        console.log(error);
      });
    },
  }
});
</script>

<style lang="scss">
.heading-h2 {
  font-size: 20px;
  text-align: center;
  color: #000;
}
</style>

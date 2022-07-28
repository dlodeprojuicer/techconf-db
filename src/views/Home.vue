<template>
  <ion-page>
    <ion-content class="ion-padding">
      <Highlights 
        :data="monthEventCount"
        text="A concise list of tech conferences in S.A" 
        class="desktop-only"
      />
      <div class="lg-content-center">
        <SearchFilters :venue="true" />
        <SkeletonText v-if="loading" />

        <div>
          <h1>Upcoming ({{ filteredEvents.future.length - 1 }})</h1>
          <ConfList :data="filteredEvents.future" v-if="filteredEvents.future.length > 0" />
        </div>

        <div>
          <h1>Previous ({{ filteredEvents.past.length }})</h1>
          <ConfList :data="filteredEvents.past" v-if="filteredEvents.past.length > 0" />
        </div>

        <div>
          <h1>Past ({{ filteredEvents.previous.length - 1 }})</h1>
          <ConfList :data="filteredEvents.previous" v-if="filteredEvents.previous.length > 0" />
        </div>
      </div>
    </ion-content>
    <!-- <Fab /> -->
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';

import {
  IonPage,
  IonContent
} from "@ionic/vue";

import ConfList from "../components/ConfList";
// import Fab from "../components/Fab";
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
    // Fab,
  },
  computed: {
    ...mapGetters(['events','filteredEvents', 'monthEventCount']),
  },
  data() {
    return {
      loading: true,
    }
  },
  methods: {
    ionViewDidEnter() {
      // display localstorage events while fetchEvents is running
      this.loading = this.events.length < 0;

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

<style lang="css">
.heading-h2 {
  font-size: 20px;
  text-align: center;
  color: #000;
}
</style>

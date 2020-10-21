<template>
  <ion-page>
    <Header />
    <ion-content class="ion-padding">
      <h2 class="heading-h2">
        A  concise list of tech conferences in ZA
      </h2>
      <div class="home-content">
        <div class="lg-content-center">
          <SearchFilters :venue="true" />
          <SkeletonText v-if="loading" />
          <ConfList :data="filteredEvents" v-if="filteredEvents.length > 0" />
          <NoEvents v-if="!loading && events.length < 1" />
          <h1 v-if="filteredEvents.length < 1">No search results</h1>
          <br /><br />
          If you wish to add a conference please email simodms@gmail.com
        </div>
      </div>
    </ion-content>
    <Fab />
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
import Fab from "../components/Fab";
import SkeletonText from "../components/SkeletonText";
import NoEvents from "../components/NoEvents";
import SearchFilters from "../components/SearchFilters";

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
    SearchFilters,
    Fab,
    NoEvents,
  },
  computed: {
    ...mapGetters(['loginToken', 'events', 'filteredEvents', 'monthEventCount']),
  },
  mounted() {
    this.fetchEvents()
  },
  data() {
    return {
      loading: true
    }
  },
  methods: {
    fetchEvents() {
      this.$store.dispatch("getEvents").then(() => {
        // this.filteredEvents = data;
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
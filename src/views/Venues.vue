<template>
  <ion-page>
    <Header @searchFn="searchFn" />
    <ion-content class="ion-padding">
      <h2 class="heading-h2">
        A  concise list of tech conference venues in ZA
      </h2>
      <div class="home-content">
        <div class="lg-content-center">
          <!-- <SearchFilters /> -->
          <SkeletonText v-if="loading" />
          <VenueList :data="filteredVenues" v-if="filteredVenues.length > 0" />
          <NoEvents v-if="!loading && venues.length < 1" />
          <h1 v-if="filteredVenues.length < 1">No search results</h1>
          Contact me by email simodms@gmail.com if you wish to add your venue
        </div>
      </div>
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
import VenueList from "../components/VenueList";
// import Fab from "../components/Fab";
import SkeletonText from "../components/SkeletonText";
import NoEvents from "../components/NoEvents";
// import SearchFilters from "../components/SearchFilters";

import { mapGetters } from 'vuex';

export default defineComponent({
  name: "home",
  title: "Home",
  requiresAuth: false,
  components: {
    IonContent,
    IonPage,
    Header,
    VenueList,
    SkeletonText,
    // SearchFilters,
    // Fab,
    NoEvents
  },
  computed: {
    ...mapGetters(['loginToken', 'venues', 'filteredVenues', 'searchString']),
  },
  mounted() {
    this.fetchVenues();
  },
  data() {
    return {
      loading: true
    }
  },
  methods: {
    searchFn(searchString) {
      this.$store.commit("updateSearchString", searchString);
    },
    fetchVenues() {
      this.$store.dispatch("getVenues").then(() => {
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
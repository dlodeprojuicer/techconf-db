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
          Contact me by email simodms@gmail.com if you wish to add a venue
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
    // this.seedEvents();
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
    seedEvents() {
      const list = [
        {
          "area": "Cape Town",
          "phone": "021 528 2000",
          "venueName": "Lagoon Beach Hotel - Rainbow Room",
          "width": 7.27,
          "equipment": [
            "Projector",
            "Overhead Projector",
            "PA System"
          ],
          "aircon": true,
          "createdBy": "JE3Bh37hpOch095fAEAcNbwrQWI3",
          "email": "confer1@lagoonbeachhotel.co.za",
          "squareMeter": "",
          "wheelchairFriendly": true,
          "website": "https://www.lagoonbeachhotel.co.za/conferencing/",
          "capacityMax": 16,
          "length": 5.36,
          "wifi": true,
          "height": "",
          "verified": true,
          "capacityMin": 5
        },
        {
          "area": "Cape Town",
          "phone": "021 528 2000",
          "venueName": "Lagoon Beach Hotel - Atlantic Suite",
          "width": 36.5,
          "length": 11.8,
          "height": "",
          "equipment": [
            "Overhead Projector",
            "PA System"
          ],
          "aircon": true,
          "createdBy": "JE3Bh37hpOch095fAEAcNbwrQWI3",
          "email": "confer1@lagoonbeachhotel.co.za",
          "squareMeter": "",
          "wheelchairFriendly": true,
          "website": "https://www.lagoonbeachhotel.co.za/conferencing/",
          "capacityMax": 600,
          "wifi": true,
          "verified": true,
          "capacityMin": 150
        },
        {
          "area": "Cape Town",
          "phone": "021 528 2000",
          "venueName": "Lagoon Beach Hotel - Avoca Suite",
          "width": 10,
          "length": 7,
          "height": "",
          "equipment": [
            "Projector",
            "Overhead Projector",
            "PA System"
          ],
          "aircon": true,
          "createdBy": "JE3Bh37hpOch095fAEAcNbwrQWI3",
          "email": "confer1@lagoonbeachhotel.co.za",
          "squareMeter": "",
          "wheelchairFriendly": true,
          "website": "https://www.lagoonbeachhotel.co.za/conferencing/",
          "capacityMax": 60,
          "wifi": true,
          "verified": true,
          "capacityMin": 10
        },
        {
          "area": "Cape Town",
          "phone": "021 528 2000",
          "venueName": "Lagoon Beach Hotel - The Boardroom",
          "width": 10,
          "length": 7,
          "height": "",
          "equipment": [
            "Flat screen TV"
          ],
          "aircon": true,
          "createdBy": "JE3Bh37hpOch095fAEAcNbwrQWI3",
          "email": "confer1@lagoonbeachhotel.co.za",
          "squareMeter": "",
          "wheelchairFriendly": true,
          "website": "https://www.lagoonbeachhotel.co.za/conferencing/",
          "capacityMax": 12,
          "wifi": true,
          "verified": true,
          "capacityMin": 5
        },
        {
          "area": "Cape Town",
          "phone": "021 528 2000",
          "venueName": "Lagoon Beach Hotel - The Brasserie",
          "width": 30,
          "length": 10,
          "height": "",
          "equipment": [
            "Projector",
            "Overhead Projector",
            "PA System"
          ],
          "aircon": true,
          "createdBy": "JE3Bh37hpOch095fAEAcNbwrQWI3",
          "email": "confer1@lagoonbeachhotel.co.za",
          "squareMeter": "",
          "wheelchairFriendly": true,
          "website": "https://www.lagoonbeachhotel.co.za/conferencing/",
          "capacityMax": 250,
          "wifi": true,
          "verified": true,
          "capacityMin": 50
        }
      ]

      for(let x = 0; list.length > x; x++) {
        this.$store.dispatch("createVenue", list[x]);
      }
    }
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
<template>
  <ion-page>
    <ion-content class="ion-padding">
      <h2 class="heading-h2">
        A  concise list of tech conference venues in ZA
      </h2>
      <div class="home-content">
        <div class="lg-content-center">
          <SearchFilters />
          <SkeletonText v-if="loading" />
          <VenueList :data="filteredVenues" v-if="filteredVenues.length > 0" />
          <NoEvents v-if="!loading && venues.length < 1" />
          <h1 v-if="filteredVenues.length < 1">No search results</h1>
          <br /><br />
          If you wish to add a venue please email simodms@gmail.com
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

import VenueList from "../components/VenueList";
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
    VenueList,
    SkeletonText,
    SearchFilters,
    Fab,
    NoEvents
  },
  computed: {
    ...mapGetters(['venues', 'filteredVenues', 'searchString']),
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
          "phone": "021 412 9999",
          "venueName": "The Wistin",
          "width": 80.6,
          "length": 50.2,
          "height": 5.63,
          "equipment": [
            "Overhead Projector",
            "PA System"
          ],
          "aircon": true,
          "createdBy": "JE3Bh37hpOch095fAEAcNbwrQWI3",
          "email": "gallagher@gallagher.co.za",
          "squareMeter": 27000,
          "wheelchairFriendly": true,
          "website": "https://gallagher.co.za/hall2",
          "capacityMax": 2500,
          "capacityMin": 20,
          "wifi": true,
          "verified": true
        },
        {
          "area": "Midrand, Johannesburg",
          "phone": "011 266 3000",
          "venueName": "Hall 2 - Gallagher Converntion Center",
          "width": 107.9,
          "length": 61.5,
          "height": 9.83,
          "equipment": [
            "Overhead Projector",
            "PA System"
          ],
          "aircon": true,
          "createdBy": "JE3Bh37hpOch095fAEAcNbwrQWI3",
          "email": "gallagher@gallagher.co.za",
          "squareMeter": 27000,
          "wheelchairFriendly": true,
          "website": "https://gallagher.co.za/hall2",
          "capacityMax": 7000,
          "capacityMin": 20,
          "wifi": true,
          "verified": true
        },
        {
          "area": "Midrand, Johannesburg",
          "phone": "011 266 3000",
          "venueName": "Hall 3 - Gallagher Converntion Center",
          "width": 105.5,
          "length": 53,
          "height": 10.4,
          "equipment": [
            "Overhead Projector",
            "PA System"
          ],
          "aircon": true,
          "createdBy": "JE3Bh37hpOch095fAEAcNbwrQWI3",
          "email": "gallagher@gallagher.co.za",
          "squareMeter": 27000,
          "wheelchairFriendly": true,
          "website": "https://gallagher.co.za/hall3",
          "capacityMax": 5500,
          "capacityMin": 20,
          "wifi": true,
          "verified": true
        },
        {
          "area": "Midrand, Johannesburg",
          "phone": "011 266 3000",
          "venueName": "Hall 4 - Gallagher Converntion Center",
          "width": 105.5,
          "length": 53,
          "height": 10.4,
          "equipment": [
            "Overhead Projector",
            "PA System"
          ],
          "aircon": true,
          "createdBy": "JE3Bh37hpOch095fAEAcNbwrQWI3",
          "email": "gallagher@gallagher.co.za",
          "squareMeter": 2520,
          "wheelchairFriendly": true,
          "website": "https://gallagher.co.za/hall4-3",
          "capacityMax": 4000,
          "capacityMin": 20,
          "wifi": true,
          "verified": true
        },
        {
          "area": "Midrand, Johannesburg",
          "phone": "011 266 3000",
          "venueName": "Hall 5 - Gallagher Converntion Center",
          "width": 105.5,
          "length": 53,
          "height": 10.4,
          "equipment": [
            "Overhead Projector",
            "PA System"
          ],
          "aircon": true,
          "createdBy": "JE3Bh37hpOch095fAEAcNbwrQWI3",
          "email": "gallagher@gallagher.co.za",
          "squareMeter": 27000,
          "wheelchairFriendly": true,
          "website": "https://gallagher.co.za/hall5",
          "capacityMax": 7000,
          "capacityMin": 20,
          "wifi": true,
          "verified": true
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
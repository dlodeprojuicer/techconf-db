<template>
  <ion-page>
    <ion-content class="ion-padding">
      <h2 class="heading-h2">
        A  concise list of tech conferences in ZA
      </h2>
      <div class="home-content">
        <div class="lg-content-center">
          <SearchFilters :venue="true" />
          <SkeletonText v-if="loading" />
          <ConfList :data="filteredEvents" v-if="filteredEvents.length > 0" />
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
import { defineComponent } from 'vue';

import {
  IonPage,
  IonContent
} from "@ionic/vue";

import ConfList from "../components/ConfList";
import Fab from "../components/Fab";
import SkeletonText from "../components/SkeletonText";
import SearchFilters from "../components/SearchFilters";

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
    SearchFilters,
    Fab,
  },
  computed: {
    ...mapGetters(['events', 'filteredEvents', 'monthEventCount']),
  },
  mounted() {
    this.fetchEvents();
    if(this.$route.query.ref) {
      console.log(this.$route.query.ref);
      // save ref to analytics
    }
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
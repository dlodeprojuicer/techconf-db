<template>
  <ion-page>
    <Header />
    <ion-content class="ion-padding">
      <ConfList :data="eventList" />
    </ion-content>
    <Fab />
    <Tabs />
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
import Tabs from "../components/Tabs";
import Fab from "../components/Fab";

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
    Tabs,
    Fab
  },
  computed: {
    ...mapGetters(['loginToken', 'events']),
  },
  mounted() {
    this.fetchEvents()
  },
  data() {
    return {
      eventList: this.events
    }
  },
  methods: {
    fetchEvents() {
      this.$store.dispatch("getEvents").then(data => {
        this.eventList = data;
      })
    },

  },
});
</script>


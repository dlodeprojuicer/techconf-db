<template>
  <ion-page>
    <Header />
    <ion-content class="ion-padding">
      <SkeletonText v-if="eventList.length < 1 " />
      <ConfList :data="eventList" v-if="eventList.length > 0 "/>
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
      eventList: []
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


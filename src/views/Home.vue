<template>
  <ion-page>
    <Header />
    <ion-content class="ion-padding">
      <SkeletonText v-if="loading" />
      <ConfList :data="eventList" v-if="eventList.length > 0 "/>
      <div class="no-events-img" v-if="!loading && eventList.length < 1">
        <img src="/assets/img/no-events.png" />
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
      eventList: [],
      loading: true
    }
  },
  methods: {
    fetchEvents() {
      this.$store.dispatch("getEvents").then(data => {
        this.eventList = data;
        this.loading = false;
      })
    },

  },
});
</script>

<style lang="scss" scoped>

.no-events-img {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  border-radius: 50%;
  filter: grayscale(10%);
  opacity: 0.7;
}

</style>
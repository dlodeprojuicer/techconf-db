<template>
  <ion-page>
    <Header />
    <ion-content class="ion-padding" v-if="profile">
      <ion-icon class="left-icons" :icon="personCircleOutline"></ion-icon> 
      <br />
      {{ profile.name }} {{ profile.lastname }}
      <ConfList :data="eventList" />
    </ion-content>
    <Tabs />
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonIcon,
  // modalController,
  IonContent
} from "@ionic/vue";
import { personCircleOutline } from "ionicons/icons";
import { defineComponent } from 'vue';

import Header from "../components/Header";
import ConfList from "../components/ConfList";
import Tabs from "../components/Tabs";
import { mapGetters } from 'vuex';

export default defineComponent({
  name: "home",
  title: "Home",
  requiresAuth: false,
  components: {
    IonContent,
    IonPage,
    IonIcon,
    Header,
    ConfList,
    Tabs,
  },
  setup() {
    return {
      personCircleOutline
    };
  },
  computed: {
    ...mapGetters(['loginToken', 'events', 'userProfile']),
  },
  mounted() {
    this.fetchEvents();
    this.fetchProfile();
  },
  data() {
    return {
      profile: this.userProfile
    }
  },
  methods: {
    fetchEvents() {
      this.$store.dispatch("getUserEvents").then(data => {
        this.eventList = data;
      })
    },
    fetchProfile() {
      this.$store.dispatch("getUserProfile", this.loginToken).then(data => {
        this.profile = data;
      })
    }
  },
});
</script>

<style lang="scss" scoped>
ion-fab-button[data-desc]::after {
  position: fixed;
  content: attr(data-desc);
  z-index: 1;
  bottom: 8px;
  left: 52px;
  background-color: #fff;
  color: #000;
  padding: 6px 10px;
  border-radius: 5px;
  box-shadow: var(--box-shadow);
}

</style>
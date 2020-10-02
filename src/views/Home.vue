<template>
  <ion-page>
    <Header />
    <ion-content class="ion-padding">
      <ConfList :data="confList" />
    </ion-content>
    <ion-fab vertical="bottom" horizontal="start">
      <ion-fab-button color="dark">
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
      <ion-fab-list side="top" v-if="!loginToken">
        <ion-fab-button data-desc="Please login or sign-up to add an event">
          <ion-icon :icon="informationCircleOutline"></ion-icon>
        </ion-fab-button>
        <ion-fab-button data-desc="Sign-up" @click="signUpModal">
          <ion-icon :icon="lockOpenOutline"></ion-icon>
        </ion-fab-button>
        <ion-fab-button data-desc="Login" @click="loginModal">
          <ion-icon :icon="logInOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab-list>
    </ion-fab>
    <Tabs />
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonFab,
  IonFabButton,
  IonIcon,
  modalController,
  IonContent
} from "@ionic/vue";
import { add, logInOutline, lockOpenOutline, informationCircleOutline } from "ionicons/icons";
import { defineComponent } from 'vue';

import Header from "../components/Header";
import ConfList from "../components/ConfList";
import Tabs from "../components/Tabs";
import UserSignUpModal from "../components/UserSignUpModal";
import NewEventModal from "../components/NewEventModal";
import LoginModal from "../components/LoginModal";
import { mapGetters } from 'vuex';

export default defineComponent({
  name: "home",
  title: "Home",
  requiresAuth: false,
  components: {
    IonContent,
    IonPage,
    IonFab,
    IonFabButton,
    IonIcon,
    Header,
    ConfList,
    Tabs,
  },
  setup() {
    return {
      add,
      logInOutline,
      lockOpenOutline,
      informationCircleOutline
    };
  },
  computed: {
    ...mapGetters(['loginToken']),
  },
  mounted() {
    this.fetchEvents()
  },
  data() {
    return {
      confList: [],
      confList2: [
        {
          name: "DevConf",
          contactPerson: "Name Lastname",
          venue: {
            place: "CTICC",
            town: "Cape Town",
          },
          address: "123 Street Name, Area, Town, Province",
          dates: [
            {
              date: "06/10/2020",
              startTime: "09:00",
              endTime: "16:00",
            },
            {
              date: "06/10/2020",
              startTime: "09:00",
              endTime: "16:00",
            },
          ],
          price: "R3 400",
          website: "http://example.com",
        },
        {
          name: "Coderetreat",
          contactPerson: "Name Lastname",
          venue: {
            place: "CTICC",
            town: "Cape Town",
          },
          address: "123 Street Name, Area, Town, Province",
          dates: [
            {
              date: "06/10/2020",
              startTime: "09:00",
              endTime: "16:00",
            },
          ],
          price: "R7 350",
          website: "http://example.com",
        },
        {
          name: "Open Source Week",
          contactPerson: "Name Lastname",
          venue: {
            place: "CTICC",
            town: "Cape Town",
          },
          address: "123 Street Name, Area, Town, Province",
          price: "R12 340",
          website: "http://example.com",
        },
        {
          name: "ScaleConf",
          contactPerson: "Name Lastname",
          venue: {
            place: "CTICC",
            town: "Cape Town",
          },
          dates: [
            {
              date: "06/10/2020",
              startTime: "09:00",
              endTime: "16:00",
            },
            {
              date: "06/10/2020",
              startTime: "09:00",
              endTime: "16:00",
            },
            {
              date: "06/10/2020",
              startTime: "09:00",
              endTime: "16:00",
            },
          ],
          price: "R8 800",
          website: "http://example.com",
        },
      ],
    };
  },
  methods: {
    async signUpModal() {
      const modal = await modalController
        .create({
          component: UserSignUpModal,
          cssClass: 'my-custom-class',
          componentProps: {
            data: {
              content: 'Content from parent',
              store: this.$store,
            },
            propsData: {
              title: 'Title from parent',
            },
          },
        })
      return modal.present();
    },
    async loginModal() {
      const modal = await modalController
        .create({
          component: LoginModal,
          cssClass: 'my-custom-class',
          componentProps: {
            data: {
              content: 'Content from parent',
              store: this.$store,
            },
            propsData: {
              title: 'Title from parent',
            },
          },
        })
      return modal.present();
    },
    async addEventModal() {
      const modal = await modalController
        .create({
          component: NewEventModal,
          cssClass: 'my-custom-class',
          componentProps: {
            data: {
              content: 'Content from parent',
              store: this.$store,
            },
            propsData: {
              title: 'Title from parent',
            },
          },
        })
      return modal.present();
    },
    fetchEvents() {
      this.$store.dispatch("getEvents").then(data => {
        console.log(data)
        this.confList = data;
      })
    },

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
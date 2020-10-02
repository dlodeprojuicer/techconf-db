<template>
  <ion-page>
    <Header />
    <ion-content class="ion-padding">
      <ConfList :data="confList" />
    </ion-content>
    <ion-fab vertical="bottom" horizontal="start">
      <ion-fab-button @click="openModal" color="dark">
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
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
  IonContent,
} from "@ionic/vue";
import { add } from "ionicons/icons";
import { defineComponent } from 'vue';

import Header from "../components/Header";
import ConfList from "../components/ConfList";
import Tabs from "../components/Tabs";
import Modal from "../components/Modal.vue";

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
    };
  },
  data() {
    return {
      confList: [
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
    async openModal() {
      const modal = await modalController
        .create({
          component: Modal,
          cssClass: 'my-custom-class',
          componentProps: {
            data: {
              content: 'New Content',
            },
            propsData: {
              title: 'New title',
            },
          },
        })
      return modal.present();
    },
  },
});
</script>

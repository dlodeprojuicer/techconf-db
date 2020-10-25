<template>
  <ion-grid>
    <ion-row v-for="(item, index) in data" :key="index">
      <ion-col>
        <b>{{ item.eventName }}</b>
        <p>{{ item.venue }}, {{ item.town }}</p>

        <p v-if="item.start && item.end">
          {{ `${item.start} - ${item.end}` }}
        </p>

        <p v-if="!item.start && !item.end" class="no-date">New dates TBA</p>

        <p class="mobile-only">
          <a :href="item.website" target="_blank">
            Website <ion-icon :icon="openOutline"></ion-icon>
          </a
        ></p>
      </ion-col>
      <ion-col offset="2" class="desktop-only">
        
      </ion-col>
      <ion-col class="desktop-only">
        <a :href="item.website" target="_blank">
          Website <ion-icon :icon="openOutline"></ion-icon>
        </a>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script>
import {
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  modalController
} from "@ionic/vue";
import { chevronForward, micOutline, openOutline } from "ionicons/icons";
import EditEventModal from "./EditEventModal";

var gapi = window.gapi;
var CLIENT_ID = "031294018380-slmm46ia8pp5ccpprhb6jbflgr5cbdg5.apps.googleusercontent.com";
var API_KEY = "AIzaSyBj7U_7kKbdtx7_laMPm5vI_VeFoVyMiTc";
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";


function googleCalandar() {
  gapi.load("client:auth2", () => {
    console.log("gapi loaded", gapi);

    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    })
  })

  gapi.client.load("calendar", "v3", () => console.log("client init"));

  gapi.auth2.getAuthInstace().signIn();
}

googleCalandar();
export default {
  name: "recent-list",
  props: {
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  components: {
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
  },
  setup() {
    return {
      chevronForward,
      micOutline,
      openOutline,
    };
  },
  mounted() {
  },
  data() {
    return {
      searchString: "",
      profilePage: window.location.pathname === "/profile" ? true : false,
      provinces: [
        "Western Cape",
        "Eastern Cape",
        "Northern Cape",
        "Free State",
        "Mpumalanga",
        "Limpopo",
        "North West",
        "KwaZulu-Natal",
        "Gauteng",
      ],
    };
  },
  methods: {
    async editEvent(event) {
      localStorage.setItem("updateEvent", JSON.stringify(event));

      const modal = await modalController.create({
        component: EditEventModal,
        componentProps: {
          data: event,
          propsData: {
            title: "Title from parent",
          },
        },
      });
      return modal.present();
    },
    deleteEvent(id) {
      this.$store
        .dispatch("deleteEvent", id)
        .then(() => {
          modalController.dismiss();
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
ion-row {
  background: #ffffff;
  margin-bottom: 10px;
  padding: 10px;
  border-left: 10px solid #226391;
}

.no-date {
  font-style: italic;
}

a {
  text-decoration: none;
}
</style>

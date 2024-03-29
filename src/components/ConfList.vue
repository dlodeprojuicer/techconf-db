<template>
  <ion-grid>
    <div v-for="(item, index) in data" :key="index">
      <ion-row v-if="!item.ad">
        <ion-col>
          <p class="conf-name">
            <b>{{ item.eventName }}</b>
          </p>
          <p>{{ item.venue }}, {{ item.town }}</p>

          <p v-if="item.start && item.end">
            {{ `${item.startFormatted} - ${item.endFormatted}` }}
          </p>

          <p v-if="!item.start && !item.end" class="no-date">New dates TBA</p>

          <!-- <p class="mobile-only">
            <a :href="item.website" target="_blank">
              <ion-icon :icon="openOutline"></ion-icon> Website
            </a
          ></p> -->
        </ion-col>
        <!-- <ion-col offset="2" class="desktop-only">
        </ion-col> -->
        <ion-col offset="2">
          <p>
            <a :href="item.website" target="_blank">
              <ion-icon :icon="openOutline"></ion-icon> Website
            </a>
          </p>
          <!-- <p @click="addToCalendar(item)" v-if="item.start && item.end" class="desktop-only">
            <ion-icon :icon="calendarClearOutline"></ion-icon> Add to Calendar
          </p> -->
          <!-- <p>
            <ion-icon :icon="heartOutline"></ion-icon> Spread love
          </p> -->
        </ion-col>
        <ion-text class="actions" size="small" v-if="profilePage">
          <ion-button color="dark" @click="editEvent(item)" aria-label="Edit">Edit</ion-button>
          <ion-button color="dark" @click="deleteEvent(item.id)" aria-label="Delete">Delete</ion-button>
        </ion-text>
      </ion-row>

      <ion-row v-if="item.ad">
        <ion-col>
          <p class="conf-name">
            <b>{{ item.name }}</b> <small>ad</small>
          </p>
          
          <p>
            {{ item.desc }}
          </p>

          <!-- <p class="mobile-only">
            <a :href="item.website" target="_blank">
              <ion-icon :icon="openOutline"></ion-icon> Website
            </a
          ></p> -->
        </ion-col>
        <!-- <ion-col offset="2" class="desktop-only">
        </ion-col> -->
        <ion-col offset="2">
          <p>
            <a :href="item.website" target="_blank">
              <ion-icon :icon="openOutline"></ion-icon> Website
            </a>
          </p>
          <!-- <p>
            <ion-icon :icon="heartOutline"></ion-icon> Spread love
          </p> -->
        </ion-col>
      </ion-row>
    </div>
  </ion-grid>
</template>

<script>
import {
  IonIcon,
  IonGrid,
  IonRow,
  IonText,
  IonButton,
  IonCol,
  modalController
} from "@ionic/vue";
import { chevronForward, micOutline, heartOutline, openOutline, calendarClearOutline } from "ionicons/icons";
import EditEventModal from "./EditEventModal";

const gapi = window.gapi;
const CLIENT_ID = process.env.VUE_APP_GOOGLE_CLIENT_ID;
const API_KEY = process.env.VUE_APP_API_KEY;
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar";

export default {
  name: "ConfList",
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
    IonText,
    IonButton,
    IonIcon,
  },
  setup() {
    return {
      chevronForward,
      micOutline,
      openOutline,
      calendarClearOutline,
      heartOutline
    };
  },
  mounted() {
  },
  beforeMount() {
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
    addToCalendar(event) {
      // So, gapi is undefined when I move this to vuex :(
      // this.$store.dispatch("gcEvent", event);
      gapi.load("client:auth2", () => {
        console.log("gapi loaded", gapi.client);

        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(() => {
          // console.log(gapi.auth2.getAuthInstance().isSignedIn.get())
          if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
            this.gcCreateEvent(event);
          } else {
            gapi.auth2.getAuthInstance().signIn().then(() => {
              this.gcCreateEvent(event);
            })
            .catch(() => {
              // console.log(err)
              alert(`You need to signin to your Google account before you can add event to your calendar`);
            });
          }
        })
        .catch((err) => {
          // console.log("Err", err);
          alert(err.details);
        })
      })
    },
    gcCreateEvent(event) {
      const gcEvent = {
        "summary": event.eventName,
        "location": event.venue,
        "start": {
          "dateTime": event.start,
          "timeZone": "Africa/Johannesburg"
        },
        "end": {
          "dateTime": event.end,
          "timeZone": "Africa/Johannesburg"
        },
        "reminders": {
          "useDefault": false,
          "overrides": [
            {"method": "email", "minutes": 24 * 60},
            {"method": "popup", "minutes": 30}
          ]
        }
      };

      var request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': gcEvent,
      });

      const rootWindow = window;

      request.execute(gcEvent => {
        // console.log(gcEvent);
        rootWindow.open(gcEvent.htmlLink);
      })
    }
  },
}
</script>

<style lang="css" scoped>
.conf-name {
  color: #000;
}

p, a {
  color: rgb(23, 21, 21);
}

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

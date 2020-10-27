<template>
  <ion-grid>
    <ion-row v-for="(item, index) in data" :key="index">
      <ion-col>
        <p class="conf-name">
          <b>{{ item.eventName }}</b>
        </p>
        <p>{{ item.venue }}, {{ item.town }}</p>

        <p v-if="item.start && item.end">
          {{ `${item.start} - ${item.end}` }}
        </p>

        <p v-if="!item.start && !item.end" class="no-date">New dates TBA</p>

        <!-- <p class="mobile-only">
          <a :href="item.website" target="_blank">
             <ion-icon :icon="openOutline"></ion-icon> Website
          </a
        ></p> -->
      </ion-col>
      <ion-col offset="2" class="desktop-only">
      </ion-col>
      <ion-col class="test" offset="2">
        <p>
          <a :href="item.website" target="_blank">
             <ion-icon :icon="openOutline"></ion-icon> Website
          </a>
        </p>
        <p @click="addToCalendar(item)">
          <ion-icon :icon="calendarClearOutline"></ion-icon> Add to Calendar
        </p>
        <!-- <p>
          <ion-icon :icon="heartOutline"></ion-icon> Spread love
        </p> -->
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
import { chevronForward, micOutline, heartOutline, openOutline, calendarClearOutline } from "ionicons/icons";
import EditEventModal from "./EditEventModal";
import moment from "moment";

var gapi = window.gapi;
var CLIENT_ID = "85418644814-d23l8dcdabf5tdfb7a4g4sbb7u3firs1.apps.googleusercontent.com";
var API_KEY = "AIzaSyA3LPByxDChFePmbkhK7EUIVr8o4b37U3s";
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar";

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
      // Timezones https://stackoverflow.com/questions/22526635/list-of-acceptable-google-calendar-api-time-zones/22597949#22597949
      // Convert dates to ISO https://stackoverflow.com/questions/28277272/convert-system-date-to-iso-format-using-momentjs/28287209
      // googleCalandar();
      console.log("E", event.start, moment(event.start).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"));
      gapi.load("client:auth2", () => {
        console.log("gapi loaded", gapi.client);

        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(() => {
          console.log(event);
          const gcEvent = {
            "summary": event.eventName,
            "location": event.venue,
            "start": {
              "dateTime": moment(event.start).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
              "timeZone": "Africa/Johannesburg"
            },
            "end": {
              "dateTime": moment(event.end).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
              "timeZone": "Africa/Johannesburg"
            },
            "reminders": {
              "useDefault": false,
              "overrides": [
                {"method": "email", "minutes": 24 * 60},
                {"method": "popup", "minutes": 10}
              ]
            }
          };

          var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': gcEvent,
          });

          const rootWindow = window;

          request.execute(gcEvent => {
            console.log(gcEvent);
            rootWindow.open(gcEvent.htmlLink);
          })
        })
      })


      // gapi.client.load("calendar", "v3", () => console.log("client init"));

      // gapi.auth2.getAuthInstace().signIn();
    }
  },
}
</script>

<style lang="scss" scoped>
.conf-name {
  color: #000;
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

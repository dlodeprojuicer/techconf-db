<template>
  <ion-list>
    <div v-for="(item, index) in data" :key="index">
      <!-- <ion-item>
        <ion-text
          slot="start"
          :class="item.status === 'canceled' ? `left event-canceled` : 'left'"
        >
          <ion-icon class="left-icons" :icon="micOutline"></ion-icon>
        </ion-text>
        <ion-label>
          <h2 :style="`color: ${item.color}`">{{ item.venueName }}</h2>
          <p>{{ item.area }}</p>
        </ion-label>
        <ion-text class="visit-website">
          <a :href="item.website" target="_blank">
            Website <ion-icon :icon="openOutline"></ion-icon>
          </a>
        </ion-text>
      </ion-item> -->

      <ion-item class="dates">
        <div class="person-card">
          <ion-avatar>
            <img src="https://ca.slack-edge.com/T03AJT6G5-UNRPKKADQ-fe590abd2cca-512">
          </ion-avatar>
          <ion-label>Simo Mafuxwana</ion-label>
          <ion-label>Software Engineer</ion-label>
          <h5>Highlights</h5>
          <ion-label>ScaleConf</ion-label>
          <ion-label>VueConf</ion-label>
          <ion-label>DevConf</ion-label>
              <ion-tab-button>
                <ion-icon :icon="logoTwitter" />
                <span>Twitter</span>
              </ion-tab-button>
                
              <ion-tab-button>
                <ion-icon :icon="globeOutline" />
                <span>Website</span>
              </ion-tab-button>
        </div>


          <ion-grid>
            <ion-row>
              <ion-col size="3"> 
              </ion-col>
              <ion-col> 
                
              </ion-col>
            </ion-row>
          </ion-grid>

        <ion-text class="actions" v-if="profilePage">
          <ion-button color="dark" @click="editEvent(item)"> Edit </ion-button>
          <ion-button color="dark" @click="deleteEvent(item.id)">
            Delete
          </ion-button>
        </ion-text>
      </ion-item>
    </div>
  </ion-list>
</template>

<script>
import {
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonButton,
  modalController,
  IonGrid,
  IonCol,
  IonTabButton,
  IonIcon,
  IonAvatar,
  IonRow
} from "@ionic/vue";
import { chevronForward, logoTwitter, globeOutline, micOutline, openOutline, tabletLandscapeOutline, tabletPortraitOutline } from "ionicons/icons";
import EditEventModal from "./EditEventModal";

export default {
  name: "venue-list",
  props: {
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonText,
    IonTabButton,
    IonIcon,
    IonButton,
    IonGrid,
    IonCol,
    IonRow
  },
  setup() {
    return {
      chevronForward,
      micOutline,
      openOutline,
      tabletLandscapeOutline,
      tabletPortraitOutline,
      logoTwitter,
      globeOutline
    };
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
    searchFn() {
      this.$emit("searchFn", this.searchString);
    },
    locationFilter() {
      
    },
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
.person-card {
  background: olive;
  width: 500px; 
  text-align: center;
  align-items: center;
}

ion-tab-button {
  display: inline-block;
}
h2 {
  font-weight: 600;
  color: #000000;
}

ion-item {
  --background: #ffffff;
  margin: 5px 0 0 -15px;
  line-height: 50px;
  border-radius: 5px;
}

ion-item.dates {
  --background: #ffffff;
  margin: -5px 0 0 auto;
  border-radius: 0 0 5px 5px;
  line-height: 20px;
  padding: 0 0 0 44px;
}

.no-date {
  font-style: italic;
}

ion-text.left {
  padding: 15px 10px 0px 10px;
  color: #000;
  border-radius: 5px 0 0 5px;
  margin: 0 15px 0 -2px;
  // background: #36AEEA;

  &:nth-of-type(odd) {
    background: #226391;
  }

  :nth-of-type(even) {
    background: #36aeea;
  }

  ion-icon.left-icons {
    color: #ffffff;
    font-size: 25px;
  }
}

ion-text.visit-website {
  // font-size: 13px;
  color: #626262;

  a {
    text-decoration: none;
  }
}

ion-icon.right-icons {
  color: #36aeea;
  margin-left: 5px;
}
</style>

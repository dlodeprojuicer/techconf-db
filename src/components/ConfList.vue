<template>
  <ion-list>
    <div v-for="(item, index) in data" :key="index">
      <ion-item>
        <!-- <template v-slot:start> -->
        <ion-text
          slot="start"
          :class="item.status === 'canceled' ? `left event-canceled` : 'left'"
        >
          <ion-icon class="left-icons" :icon="micOutline"></ion-icon>
        </ion-text>
        <!-- </template> -->
        <ion-label>
          <h2 :style="`color: ${item.color}`">{{ item.eventName }}</h2>
          <p>{{ item.venue }}, {{ item.town }}</p>
        </ion-label>
        <ion-text class="visit-website">
          <a :href="item.website" target="_blank">
            Website <ion-icon :icon="openOutline"></ion-icon>
          </a>
        </ion-text>
      </ion-item>
      <ion-item class="dates">
        <ion-label>
          <b v-if="item.start && item.end">
            {{ `${item.start} - ${item.end}` }}
          </b>
          <p v-if="!item.start && !item.end" class="no-date">New dates TBA</p>
          <!-- <p v-if="item.dates">
            <span v-for="(date, idx) in item.dates" :key="idx">
              <b>{{ date.date }}</b> {{`${date.startTime}-${date.endTime}`}}
              <ion-icon :icon="chevronForward"></ion-icon>
            </span>
          </p> -->
        </ion-label>
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
  IonIcon,
  IonButton,
  modalController
} from "@ionic/vue";
import { chevronForward, micOutline, openOutline } from "ionicons/icons";
import EditEventModal from "./EditEventModal";


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
    IonList,
    IonItem,
    IonLabel,
    IonText,
    IonIcon,
    IonButton
  },
  setup() {
    return {
      chevronForward,
      micOutline,
      openOutline,
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
  margin: -15px 0 0 auto;
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

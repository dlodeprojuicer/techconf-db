<template>
  <ion-grid>
    <ion-row>
      <ion-col size="4" v-for="(item, index) in data" :key="index">
        <ion-avatar>
          <img
            src="https://ca.slack-edge.com/T03AJT6G5-UNRPKKADQ-fe590abd2cca-512"
          />
        </ion-avatar>
        <ion-label>{{ item.name }} {{ item.lastname }}</ion-label>
        <br />
        <ion-label>{{ item.position }}</ion-label>
        <h5>Highlights</h5>
        <p class="highlight" v-for="(itm, idx) in item.highlights" :key="idx">
          {{ itm.name }} ({{ itm.year }})
        </p>
        <ion-label><b>Contact:</b><br /> {{ item.contact }}</ion-label>
        <br />
          <p v-for="(i, id) in item.social" :key="id">
            <ion-icon :icon="i.label === 'Website' ? globeOutline : logoTwitter" />
            {{ i.label }}
          </p>
        <!-- <ion-tab-button> -->
          <!-- <ion-icon :icon="globeOutline" /> -->
          <!-- <span>Website</span> -->
        <!-- </ion-tab-button> -->
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script>
import {
  IonLabel,
  modalController,
  // IonTabButton,
  IonIcon,
  IonAvatar,
} from "@ionic/vue";
import {
  chevronForward,
  logoTwitter,
  globeOutline,
  micOutline,
  openOutline,
  tabletLandscapeOutline,
  tabletPortraitOutline,
} from "ionicons/icons";
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
    IonLabel,
    IonAvatar,
    // IonTabButton,
    IonIcon,
  },
  setup() {
    return {
      chevronForward,
      micOutline,
      openOutline,
      tabletLandscapeOutline,
      tabletPortraitOutline,
      logoTwitter,
      globeOutline,
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
    locationFilter() {},
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
ion-avatar {
  margin: 15px auto;
}

ion-grid {
  
}

ion-col {
  // margin: 0 0 10px 0;
  background: #fff;
  border: 1px solid #efefef;
  // border-right: 1px solid #efefef;
}

ion-label {
  line-height: 9px;
  font-size: 15px;
}

h5 {
  font-size: 16px;
}

.highlight {
  line-height: 10px;
  font-size: 14px;
  color: #000;
}
// ion-tab-button {
//   display: inline-block;
// }


// .dates {
//   padding: 0 0 0 44px;
//   text-align: center;
//   align-items: center;
// }

</style>

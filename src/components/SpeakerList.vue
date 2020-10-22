<template>
  <ion-grid>
    <ion-row>
      <ion-col v-for="(item, index) in data" :key="index">
        <ion-avatar>
          <img
            :src="item.image"
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
            <a :href="i.link" target="_blank">
              <ion-icon :icon="globeOutline" v-if="i.label === 'Website' || i.label === 'Blog'" />
              <ion-icon :icon="logoTwitter" v-if="i.label === 'Twitter'" />
              <ion-icon :icon="logoLinkedin" v-if="i.label === 'LinkedIn'" />
              {{ i.label }}
            </a>
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
  IonGrid,
  IonCol,
  IonRow,
  IonAvatar,
} from "@ionic/vue";
import {
  chevronForward,
  logoTwitter,
  globeOutline,
  micOutline,
  openOutline,
  logoLinkedin,
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
    IonGrid,
    IonCol,
    IonRow,
    IonIcon,
  },
  setup() {
    return {
      chevronForward,
      micOutline,
      logoLinkedin,
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

a {
  text-decoration: none;
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

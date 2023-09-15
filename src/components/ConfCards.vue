<template>
  <ion-grid>
    <ion-row>
      <ion-col size="3" class="card-column" v-for="(item, index) in data" :key="index" @click="goto(item.website)">
        <ion-label>{{ item.eventName }}</ion-label>
        <br />
        <ion-label>{{ item.venue }}</ion-label>

        <p v-if="item.start && item.end">
          {{ `${item.startFormatted} - ${item.endFormatted}` }}
        </p>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script>
import {
  IonLabel,
  IonGrid,
  IonCol,
  IonRow,
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

export default {
  name: "confCards",
  props: {
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  components: {
    IonLabel,
    IonGrid,
    IonCol,
    IonRow,
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
    };
  },
  methods: {
    goto(link) {
      window.open(link)
    }
  },
};
</script>

<style lang="css" scoped>
ion-grid {
  text-align: center;
  margin: 0 auto;
  width: 95%;
}

ion-avatar {
  margin: 15px auto;
}

ion-col.card-column {
  background: #fff;
  margin: 2px;
}

ion-col.card-column:hover {
  cursor: pointer;
}

ion-label {
  line-height: 9px;
  font-size: 15px;
  font-weight: 500;
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

.social {
  margin: 8px;
}
/* // ion-tab-button {
//   display: inline-block;
// } */


/* // .dates {
//   padding: 0 0 0 44px;
//   text-align: center;
//   align-items: center;
// } */

</style>

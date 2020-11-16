<template>
  <ion-grid>
    <ion-row>
      <ion-col class="card-column" v-for="(item, index) in data" :key="index">
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
  // IonTabButton,
  IonGrid,
  IonCol,
  IonRow,
  // IonAvatar,
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
    // IonAvatar,
    // IonTabButton,
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
  },
};
</script>

<style lang="scss" scoped>
ion-grid {
  text-align: center;
  margin: auto;
  width: 30%;
}

ion-avatar {
  margin: 15px auto;
}

ion-col.card-column {
  background: #fff;
  border: 1px solid #efefef;
  margin: 0 5px;
  border-radius: 5px;
  width: 400px;
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
// ion-tab-button {
//   display: inline-block;
// }


// .dates {
//   padding: 0 0 0 44px;
//   text-align: center;
//   align-items: center;
// }

</style>

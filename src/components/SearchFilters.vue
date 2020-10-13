<template>
  <ion-grid>
    <ion-row>
      <ion-col>
        <ion-input v-model="searchString" placeholder="Search" @keyup="searchStringFn"></ion-input>
      </ion-col>
      <ion-col>
        <ion-select interface="popover" value="Province" @ionChange="locationFilterFn">
          <ion-select-option
            :value="item"
            v-for="(item, index) in provinces"
            :key="index"
            >{{ item }}</ion-select-option
          >
        </ion-select>
      </ion-col>
      <ion-col v-if="venue">
        <ion-select interface="popover" value="Venue" @ionChange="venueFilterFn">
          <ion-select-option
            :value="item"
            v-for="(item, idx) in venues"
            :key="idx"
            >{{ item }}</ion-select-option
          >
        </ion-select>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script>
import {
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonInput,
  IonCol,
  IonRow
} from "@ionic/vue";

export default {
  name: "searchFilter",
  props: {
    venue: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  components: {
    IonGrid,
    IonCol,
    IonRow,
    IonInput,
    IonSelect,
    IonSelectOption,
  },
  data() {
    return {
      searchString: "",
      provinces: [
        "Province",
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
      venues: [
        "Venue",
        "Virtual Conference",
        "Kirstenbosch",
        "University of Stellenbosch",
        "Microsoft Campus",
        "Lagoon Beach Hotel",
        "Bandwidth Barn",
        "Melrose Arch",
        "Gallagher Convention Centre"
      ],
    };
  },
  methods: {
    searchStringFn() {
      this.$store.commit("updateSearch", {field: "eventName", value: this.searchString});
    },
    locationFilterFn({ detail }) {
      this.$store.commit("updateSearch", {field: "province", value: detail.value === "Province" ? "" : detail.value});
    },
    venueFilterFn({ detail }) {
      this.$store.commit("updateSearch", {field: "venue", value: detail.value === "Venue" ? "" : detail.value });
    }
  },
};
</script>

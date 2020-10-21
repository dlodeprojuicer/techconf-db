<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="secondary">
        <!-- <ion-button v-if="userProfile.admin" @click="gotoDashboard">Dashboard</ion-button> -->
        <!-- <ion-searchbar @keyup="searchFn" v-model="searchString" placeholder="Search"></ion-searchbar> -->
        <ion-button @click="gotoHome">Conferences</ion-button>
        <ion-button @click="gotoVenues">Venues</ion-button>
        <!-- <ion-button @click="gotoSpeakers">Speakers</ion-button> -->
        <ion-button @click="gotoProfile" v-if="loginToken">Profile</ion-button>
        <ion-button @click="logout" v-if="loginToken">Logout</ion-button>
      </ion-buttons>
      <ion-buttons>
      </ion-buttons>
      <ion-title class="logo" @click="gotoHome">{{ name }} </ion-title>
      <ion-title class="logo2" @click="gotoHome">{{ name2 }} </ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script>
import { IonToolbar, IonHeader, IonTitle, IonButtons, IonButton } from "@ionic/vue";
import { ellipsisVertical } from "ionicons/icons";
import { mapGetters } from 'vuex';

export default {
  name: "recent-list",
  props: {
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  components: { IonToolbar, IonHeader, IonTitle, IonButtons, IonButton },
  computed: {
    ...mapGetters(['loginToken', 'userProfile']),
  },
  setup() {
    return {
      ellipsisVertical,
      name: "<TechConf-db />",
      name2: "TC-db",
    };
  },
  data() {
    return {
      searchString: ""
    }
  },
  methods: {
    searchFn() {
      this.$emit("searchFn", this.searchString);
    },
    gotoHome() {
      this.$router.push("/");
    },
    gotoDashboard() {
      this.$router.push("/dashboard");
    },
    gotoSpeakers() {
      this.$router.push("/speakers");
    },
    gotoVenues() {
      this.$router.push("/venues");
    },
    gotoProfile() {
      this.$router.push("/profile");
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
ion-toolbar {
  --background: #144d75;
  color: #ffffff;
}

ion-button.sign-out {
  font-size: 17px;
  font-weight: 500;
  margin-left: 5px;
  float: left;
  --color: #ffffff;
}

.ellipsis {
  color: #ffffff;
}
ion-title.logo {
  font-weight: 900;
  font-size: 25px;
  // text-align: center;
}

</style>

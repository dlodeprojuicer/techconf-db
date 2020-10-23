<template>
  <ion-header>
    <ion-toolbar class="desktop-nav">
      <ion-buttons slot="secondary">
        <!-- <ion-button v-if="userProfile.admin" @click="gotoDashboard">Dashboard</ion-button> -->
        <ion-button @click="gotoHome">Conferences</ion-button>
        <ion-button @click="gotoVenues">Venues</ion-button>
        <ion-button @click="gotoSpeakers">Speakers</ion-button>
        <ion-button @click="gotoProfile" v-if="loginToken">Profile</ion-button>
        <ion-button @click="logout" v-if="loginToken">Logout</ion-button> 
      </ion-buttons>
      <ion-buttons>
      </ion-buttons>
      <ion-title class="logo" @click="gotoHome">{{ name }} </ion-title>
      <ion-title class="logo2" @click="gotoHome">{{ name2 }} </ion-title>
    </ion-toolbar>
    <ion-toolbar class="mobile-nav">
      <ion-buttons slot="start">
        <ion-menu-button auto-hide="false" @click="openMenu"></ion-menu-button>
      </ion-buttons>
      <ion-buttons slot="primary">
        <ion-button>
          <ion-icon slot="icon-only" ios="ellipsis-horizontal" md="ellipsis-vertical"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title>{{ name }}</ion-title>
    </ion-toolbar>
  </ion-header>
	<ion-menu side="start" content-id="menuContent">
		<ion-content>
			<ion-list>
				<ion-item >
					<ion-label>{{ name }}</ion-label>
				</ion-item>
				<ion-item @click="gotoHome">
					<ion-label>Conferences</ion-label>
				</ion-item>
				<ion-item @click="gotoVenues">
					<ion-label>Venues</ion-label>
				</ion-item>
				<ion-item @click="gotoSpeakers">
					<ion-label>Speakers</ion-label>
				</ion-item>
				<ion-item @click="gotoProfile" v-if="loginToken">
					<ion-label>Profile</ion-label>
				</ion-item>
				<ion-item @click="logout" v-if="loginToken">
					<ion-label>Logout</ion-label>
				</ion-item>
			</ion-list>
		</ion-content>
	</ion-menu>
</template>

<script>
import { IonToolbar, IonMenuButton, IonLabel, IonItem, IonList, IonContent, IonMenu, IonHeader, IonTitle, IonIcon, IonButtons, IonButton, menuController } from "@ionic/vue";
import { ellipsisVertical, menuOutline } from "ionicons/icons";
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
  components: { IonIcon, IonMenuButton, IonList, IonLabel, IonItem, IonContent, IonMenu, IonToolbar, IonHeader, IonTitle, IonButtons, IonButton },
  computed: {
    ...mapGetters(['loginToken', 'userProfile']),
  },
  setup() {
    return {
      ellipsisVertical,
      menuOutline,
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
    async openMenu() {
      await menuController.open("start");
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

ion-menu-button {
  color: #ffffff;
}

</style>

<template>
  <Header />
  <ion-page>
    <ion-content class="ion-padding">
      <div class="lg-content-center">
        <ion-progress-bar type="indeterminate" color="dark" v-if="loading"></ion-progress-bar>
        <ion-title class="form-title">
          <ion-icon class="left-icons" :icon="personOutline"></ion-icon> 
          Subscribe
        </ion-title>
        <ion-item>
          <ion-label>Name</ion-label>
          <ion-input v-model="form.name" type="text"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Lastname</ion-label>
          <ion-input v-model="form.lastname" type="text"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Email</ion-label>
          <ion-input v-model="form.email_address"></ion-input>
        </ion-item>
        <p class="error-message">
          {{ endpointError.message }}
        </p>
        <div class="form-buttons">
          <ion-button size="small" color="success" @click="submit" aria-label="Subscribe">Subscribe</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import Header from "../components/Header";

import {
  IonContent,
  IonTitle,
  IonItem,
  IonLabel,
  IonPage,
  IonInput,
  IonButton,
  IonIcon,
  IonProgressBar,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { personOutline } from "ionicons/icons";

import authStore from "../store";

export default defineComponent({
  name: "Modal",
  props: ["store","content", "title"],
  components: {
		IonContent,
    IonTitle,
    IonProgressBar,
    IonItem,
    IonLabel,
    IonPage,
    IonIcon,
    IonInput,
    Header,
    IonButton,
  },
  data() {
    return {
      loading: false,
      endpointError: "",
      form: {
        email_address: "",
        password: "",
      },
    };
	},
  setup() {
    return {
      personOutline
    }
  },
  methods: {
    register() {
      this.$router.push("/register");
    },    
    goHome() {
      this.$router.push("/");
    },
    submit() {
      this.loading = true;
      authStore.dispatch("subscribe", this.form)
        .then(() => {
          this.loading = false;
        })
        .catch(error => {
          console.log("Error");
          this.loading = false;
          this.endpointError = error;
          switch(error.code) {
            case "auth/invalid-email":
            case "auth/wrong-password":
              error.message = "Invalid email or password.";
            break;
            case "auth/user-not-found":
              error.message = "No user with corresponding login credentials";
            break;
          }
        });
    }
  }
});
</script>

<style lang="css" scoped>
ion-content {
	height: 100vh;
}

.form-title {
  margin-top: 60px;
}

ion-item > ion-label {
  font-weight: bold;
}

.error-message {
  color: #ff0000;
  text-align: center;
}
</style>
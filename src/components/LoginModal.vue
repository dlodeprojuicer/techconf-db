<template>
  <div>
    <ion-header>
      <ion-toolbar class="modal-header">
        <ion-title>
          <ion-icon class="left-icons" :icon="personOutline"></ion-icon> 
          Login
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-progress-bar type="indeterminate" color="dark" v-if="loading"></ion-progress-bar>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label>Email</ion-label>
        <ion-input v-model="form.email"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Password</ion-label>
        <ion-input v-model="form.password" type="password"></ion-input>
      </ion-item>

      <div class="form-buttons">
        <ion-button size="small" color="danger" @click="closeModal">Cancel</ion-button>
        <ion-button size="small" color="success" @click="submit">Login</ion-button>
      </div>
    </ion-content>
  </div>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonProgressBar,
	modalController
} from "@ionic/vue";
import { defineComponent } from "vue";
import { personOutline } from "ionicons/icons";

import authStore from "../store";

export default defineComponent({
  name: "Modal",
  props: ["store","content", "title"],
  data() {
    return {
      loading: false,
      form: {
        email: "simodms@gmail.com",
        password: "1234567890",
      },
    };
	},
  setup() {
    return {
      personOutline
    }
  },
  components: {
		IonHeader,
		IonContent,
    IonTitle,
    IonProgressBar,
    IonToolbar,
    IonItem,
    IonLabel,
    IonIcon,
    IonInput,
    IonButton,
  },
  methods: {
    closeModal() {
			modalController.dismiss();
    },
    submit() {
      this.loading = true;
      authStore.dispatch("login", this.form)
        .then(() => {
          // eslint-disable-next-line
          console.log("done");
          this.loading = false;
          modalController.dismiss();
        })
        .catch(error => {
          this.loading = false;
        // eslint-disable-next-line
          console.log(error);
        });
    }
  }
});
</script>

<style lang="scss" scoped>
ion-content {
	height: 100vh;
}

ion-item > ion-label {
  font-weight: bold;
}

.form-buttons {
	margin-top: 25px;
	float: right;
	overflow-y: scroll;
}
</style>
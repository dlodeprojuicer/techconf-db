<template>
  <div>
    <ion-header>
      <ion-toolbar class="modal-header">
        <ion-title>
					<ion-icon class="left-icons" :icon="person"></ion-icon> 
					Register
				</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label>Name</ion-label>
        <ion-input v-model="form.name"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Lastname</ion-label>
        <ion-input v-model="form.lastname"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Email</ion-label>
        <ion-input v-model="form.email"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Password</ion-label>
        <ion-input v-model="form.password" type="password"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Province</ion-label>
        <ion-input v-model="form.address.province"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Organisation</ion-label>
        <ion-input v-model="form.organisation"></ion-input>
      </ion-item>
			<div class="form-buttons">
				<ion-button size="small" color="danger" @click="closeModal">Cancel</ion-button>
				<ion-button size="small" color="success" @click="submit">Signup</ion-button>
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
	modalController
} from "@ionic/vue";
import { defineComponent } from "vue";
import { person } from "ionicons/icons";

import authStore from "../store";

export default defineComponent({
  name: "Modal",
  props: ["store","content", "title"],
  data() {
    return {
      form: {
        name: "Simo",
        lastname: "Mafuxwana",
        email: "simodms@gmail.com",
        password: "1234567890",
        organisation: "DMS Ventures",
        address: {
					province: "Western Cape"
				}
      },
    };
	},
  setup() {
    return {
      person
    }
  },
  components: {
		IonHeader,
		IonContent,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
  },
  methods: {
    closeModal() {
			modalController.dismiss();
    },
    submit() {
      console.log(this.form.email)
      authStore.dispatch("signUp", this.form)
        .then(data => {
          // eslint-disable-next-line
          console.log(data);
          modalController.dismiss();
        })
        .catch(error => {
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

.form-buttons {
	margin-top: 25px;
	float: right;
	overflow-y: scroll;
}
</style>
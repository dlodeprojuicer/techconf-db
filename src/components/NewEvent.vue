<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-title>
					<ion-icon class="left-icons" :icon="micOutline"></ion-icon> 
					Add Conference
				</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label>Name</ion-label>
        <ion-input v-model="form.name"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Website</ion-label>
        <ion-input v-model="form.website"></ion-input>
      </ion-item>
      <!-- <ion-item>
        <ion-label>Price</ion-label>
        <ion-input v-model="form.price"></ion-input>
      </ion-item> -->

			<!-- <h5>Address</h5> -->
      <ion-item>
        <ion-label>Venue</ion-label>
        <ion-input v-model="form.venue.place"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Street</ion-label>
        <ion-input v-model="form.address.street"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Town</ion-label>
        <ion-input v-model="form.address.street"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Area</ion-label>
        <ion-input v-model="form.address.area"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Province</ion-label>
        <ion-input v-model="form.address.provice"></ion-input>
      </ion-item>
			<div class="form-buttons">
				<ion-button size="small" color="danger" @click="submit">Cancel</ion-button>
				<ion-button size="small" color="success" @click="closeModal">Submit</ion-button>
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
import { micOutline } from "ionicons/icons";

export default defineComponent({
  name: "NewEvent",
  data() {
    return {
      form: {
        eventame: "",
        contactPerson: "",
        venue: {
					place: "",
				},
        address: {
					street: "",
					area: "",
					town: "",
					province: ""
				},
        price: "",
        website: "",
        dates: [],
      },
    };
	},
  setup() {
    return {
      micOutline
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
			
    },
    submit() {
      this.$store.dispatch("createEvent", this.form)
        .then(data => {
          // eslint-disable-next-line
          console.log(data);
        })
        .catch(error => {
        // eslint-disable-next-line
          console.log(error);
        })
        .then(() => {
          modalController.dismiss();
        })
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
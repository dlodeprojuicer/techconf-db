<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="lg-content-center">
        <ion-progress-bar type="indeterminate" color="dark" v-if="loading"></ion-progress-bar>
        <div class="form">
          <AuthFormHeading data="Login" />
          <ion-item>
            <ion-label>Email</ion-label>
            <ion-input v-model="form.email"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Password</ion-label>
            <ion-input v-model="form.password" type="password"></ion-input>
          </ion-item>

          <AuthFormFooter 
            loginRegText="Don't have an account?"
            :err="endpointError.message"
            @submit="submit"
          />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonItem,
  IonLabel,
  IonPage,
  IonInput,
  IonProgressBar,
} from "@ionic/vue";
import { defineComponent } from "vue";

import authStore from "../store";
import AuthFormHeading from "../components/AuthFormHeading.vue";
import AuthFormFooter from "../components/AuthFormFooter.vue";

export default defineComponent({
  name: "Login",
  props: ["store","content", "title"],
  components: {
		IonContent,
    IonProgressBar,
    IonItem,
    IonLabel,
    IonPage,
    IonInput,
    AuthFormHeading,
    AuthFormFooter
  },
  data() {
    return {
      loading: false,
      endpointError: "",
      form: {
        email: "",
        password: "",
      },
    };
	},
  mounted() {
    window.FB.getLoginStatus(function(response) {
      console.log(response)
      // this.statusChangeCallback(response);
    });
  },
  methods: {
    register() {
      this.$router.push("/register");
    },
    submit() {
      this.loading = true;
      authStore.dispatch("login", this.form)
        .then(() => {
          this.loading = false;
          this.fetchEvents();
        })
        .catch(error => {
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
    },
    fetchEvents() {
      this.$store.dispatch("getEvents").then(() => {
        // this.filteredEvents = data;
        this.loading = false;
        this.$router.push("/");
      }).catch(error => {
          this.loading = false;
        // eslint-disable-next-line
        console.log(error);
      });
    },
  }
});
</script>

<style lang="css" scoped>
.lg-content-center {
  background: #ffffff;
  margin-top: 80px;
  padding: 150px;
  border-radius: 6px;
}

ion-content {
	height: 100vh;
}

ion-item {
    --background: #fff;
  ion-label {
    font-weight: bold;
  }
}

</style>

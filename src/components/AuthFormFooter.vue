<template>
  <p class="error-message" v-if="err">
    {{ err }}
  </p>

  <div class="form-buttons">
    <p>{{ loginRegText }} <a :href="loginRegLink"><u>{{ loginRegLink }}</u></a></p>
    <ion-button size="small" @click="goHome">Cancel</ion-button>
    <ion-button size="small" color="success" @click="submit">{{ loginRegBtn }}</ion-button>
    <br /><br />
    <ion-button size="small" @click="googleLogin" v-if="loginRegLink === 'register'">
      <ion-icon size="large" :icon="logoGoogle"></ion-icon> 
      Google Login
    </ion-button>
    <ion-button size="small" @click="facebookLogin" v-if="loginRegLink === 'register'">
      <ion-icon size="large" :icon="logoFacebook"></ion-icon> 
      Facebook Login
    </ion-button>
  </div>
</template>

<script>
import { 
  IonButton,
  IonIcon
} from "@ionic/vue";
import { logoGoogle, logoFacebook } from "ionicons/icons";

export default {
  name: "AuthFormFooter",
  emits: ["submit"],
  props: {
    err: {
      type: String,
      required: true,
      default: ""
    },
    loginRegText: {
      type: String,
      required: true,
      default: ""
    }
  },
  components: { 
    IonButton,
    IonIcon
  },
  setup() {
    return {
      logoGoogle,
      logoFacebook
    }
  },
  data() {
      let loginRegLink = null; 
      let loginRegBtn = null;
      if (window.location.pathname === "/login") {
        loginRegLink = "register";
        loginRegBtn = "Login";
      } else {
        loginRegLink = "login";
        loginRegBtn = "Register";
      }
    return {
      loginRegLink,
      loginRegBtn,
    }
  }, 
  methods: {
    goHome() {
      this.$router.push("/");
    },
    submit() {
      this.$emit("submit");
    },
    facebookLogin() {
      this.$store.dispatch("facebookLogin", this.form)
        .then(() => {
          this.$router.push("/profile");
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
    googleLogin() {
      this.$store.dispatch("googleLogin", this.form)
        .then(() => {
          this.$router.push("/profile");
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
  }
};
</script>

<style lang="css" scoped>
ion-icon {
  padding-right: 10px;
  /* font-size: 164px; */
}
.form-title {
  text-align: center;
  margin-bottom: 30px;
}

.error-message {
  color: #ff0000;
  text-align: center;
}

.form-buttons {
  margin: 20px auto;
  text-align: center;
}

ion-button {
  width: 200px;
  height: 40px;
}
</style>
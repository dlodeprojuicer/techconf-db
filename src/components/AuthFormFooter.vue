<template>
  <p class="error-message" v-if="err">
    {{ err }}
  </p>

  <div class="form-buttons">
    <p>{{ loginRegText }} <a :href="loginRegLink"><u>{{ loginRegLink }}</u></a></p>
    <ion-button size="small" @click="goHome">Cancel</ion-button>
    <ion-button size="small" color="success" @click="submit">{{ loginRegBtn }}</ion-button>
    <br /><br />
    <div 
      class="fb-login-button" 
      data-width="200" 
      data-size="large" 
      data-button-type="login_with" 
      data-layout="default" 
      data-auto-logout-link="false" 
      data-use-continue-as="false"
    />
  </div>
</template>

<script>
import { 
  IonButton 
} from "@ionic/vue";
import { personOutline } from "ionicons/icons";

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
    IonButton
  },
  setup() {
    return {
      personOutline,
    };
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
    }
  }
};
</script>

<style lang="css" scoped>
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
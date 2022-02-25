<template>
  <p class="error-message" v-if="err">
    {{ err }}
  </p>

  <div class="form-buttons">
    <p>{{ loginRegText }} <a :href="loginRegLink"><u>Register</u></a></p>
    <ion-button size="small" color="danger" @click="goHome">Cancel</ion-button>
    <ion-button size="small" color="success" @click="submit">Login</ion-button>
  </div>
</template>

<script>
import { 
  IonButton 
} from "@ionic/vue";
import { personOutline } from "ionicons/icons";

export default {
  name: "stats",
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
    const loginRegLink = window.location.pathname === "/login" ? "/register" : "/login";
    const loginRegBtn= window.location.pathname === "/login" ? "Register" : "Login";
    
    return {
      personOutline,
      loginRegLink,
      loginRegBtn
    };
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
</style>
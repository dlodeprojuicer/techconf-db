<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="secondary" v-if="loginToken" @click="logout">
        <ion-button> Logout </ion-button>
      </ion-buttons>
      <ion-title class="logo">{{ name }} </ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script>
import { IonToolbar, IonHeader, IonTitle } from "@ionic/vue";
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
  components: { IonToolbar, IonHeader, IonTitle },
  computed: {
    ...mapGetters(['loginToken']),
  },
  setup() {
    return {
      ellipsisVertical,
      name: "<TechConf-db />",
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
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
}
</style>

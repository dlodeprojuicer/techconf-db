<template>
  <h3 class="form-title">
    <ion-icon class="left-icons" :icon="personOutline"></ion-icon> 
    {{ data }}
  </h3>
</template>

<script>
import { IonIcon } from "@ionic/vue";
import { personOutline } from "ionicons/icons";

export default {
  name: "stats",
  props: {
    data: {
      type: String,
      required: true,
      default: ""
    }
  },
  components: { 
    IonIcon 
  },
  setup() {
    return {
      personOutline
    };
  }
};
</script>

<style lang="scss" scoped>
.form-title {
  text-align: center;
  margin-bottom: 30px;
}

</style>
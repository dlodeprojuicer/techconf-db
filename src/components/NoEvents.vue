<template>
  <div class="no-events-img">
    <img src="/assets/img/no-events.png" />
    <ion-button expand="block" color="dark" @click="addEventModal">Add conference</ion-button>
  </div>
</template>

<script>
import { IonButton, modalController } from "@ionic/vue";
import { mapGetters } from "vuex";
import NewEventModal from "./NewEventModal";

export default {
  name: "stats",
  components: { IonButton },
  computed: {
    ...mapGetters(["loginToken"]),
  },
  mounted() {
    // this.addEventModal();
  },
  methods: {
    async addEventModal() {
      if (this.loginToken) {
        const modal = await modalController.create({
          component: NewEventModal,
          cssClass: "my-custom-class",
          componentProps: {
            data: {
              content: "Content from parent",
              store: this.$store,
            },
            propsData: {
              title: "Title from parent",
            },
          },
        });
        return modal.present();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.no-events-img {
  width: 25%;
  margin: 5% 39%;
  text-align: center;
  img {
    filter: grayscale(20%);
    opacity: 0.7;
  }
  ion-button {
    opacity: 0.9;
  }
}
</style>
<template>
  <ion-page>
    <ion-content class="ion-padding">
      <h1 class="heading-h2">
        Speakers you can reach out to if you are planning a conference
        <!-- <span v-if="!loginToken">
          <br /><br />
          <ion-button size="medium" @click="speakerReg" aria-label="Register as a speaker">Register as a speaker</ion-button>
        </span> -->
      </h1>
      
      <br />
      <div class="lg-content-center">
        <SkeletonText v-if="loading" />
        <SpeakerList :data="speakers" />

        <BeAdded msg=" If you wish to be added as a speaker please email simo@controln.co.za" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonContent,
  // IonButton
} from "@ionic/vue";

import { defineComponent } from 'vue';

import SpeakerList from "../components/SpeakerList";
import SkeletonText from "../components/SkeletonText";
import BeAdded from "../components/BeAdded";

import { mapGetters } from 'vuex';

export default defineComponent({
  name: "home",
  title: "Home",
  requiresAuth: false,
  components: {
    IonContent,
    IonPage,
    // IonButton,
    SpeakerList,
    SkeletonText,
    BeAdded
  },
  computed: {
    ...mapGetters(['speakers', 'loginToken']),
  },
  data() {
    return {
      loading: true,
    }
  },
  methods: {
    ionViewDidEnter() {
      this.fetchSpeakers();
    },
    fetchSpeakers() {
      this.$store.dispatch("getSpeakers").then(() => {
        this.loading = false;
      }).catch(error => {
          this.loading = false;
        // eslint-disable-next-line
        console.log(error);
      });
    },
    speakerReg() {
      this.$router.push("/register?src=speakerReg");
    },
    seedSpeakers() {
      const list = [
        {
          name: "Niel",
          lastname: "Zeeman",
          position: "DevOps Consultant",
          contact: "nielzeeman@hotmail.com",
          image: "https://ca.slack-edge.com/T03A23LJR-UAP4W73K6-a1e4ef265d57-512",
          social: [
            {
              link: "https://www.linkedin.com/in/nielzeeman/",
              label: "LinkedIn"
            }
          ],
          highlights: [
            {
              name: "Microsoft Ignite",
              year: "2020"
            }, 
            {
              name: "Microsoft Insiders Dev",
              year: "2019"
            }, 
            {
              name: "Global DevOps Bootcamp",
              year: "2019"
            }, 
          ],
        }
      ];

      for(let x = 0; list.length > x; x++) {
        this.$store.dispatch("createSpeaker", list[x]);
      }
    }
  },
});
</script>

<style lang="css" scoped>
.activeTip {
  color: green;
}

.heading-h2 {
  font-size: 20px;
  text-align: center;
  color: #000;
}

.content-wrapper {
  margin-top: -35px;
  ion-chip {
    color: #d6d6d6;
    border: 1px #413f3f solid;
    padding: 20px;
  }

  h2 {
    color: #d4d3d3;
    font-weight: bold;
    margin: 22px 0 -12px 0;
  }

  p {
    color: #bdbcbc;
  }
} 

.quantity-counter {
  float: right;
  background: #272731;
  border-radius: 10px;
  padding: 10px 10px 10px 20px;
  margin: -60px 35px 0 315px;
  width: 65px;
  z-index: 9999999999;

  ion-icon {
    font-size: 18px;
    background: #1d1d23;
    padding: 5px;
    color: #ffffff;
    border-radius: 50px;
    font-weight: 600;

    &.back {
      border-radius: 10px;
    }
  }

  ion-chip {
    color: #ffffff;
    background: #49455e;
    margin: 5px 0px 10px -9px;
    padding: 20px 18px;
    font-weight: bold;
  }
}

.row-col-one,
.row-col-two {
  margin: 10px 0;
  color: #9a9a9a;
  background: #0b0c13;
  padding: 12px;
  border-radius: 30px;
  border: 1px #0e0e0e solid;
  text-align: center;
}

ion-button {
  --background: #144d75;
}
</style>
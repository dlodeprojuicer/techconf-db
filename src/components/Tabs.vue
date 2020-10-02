<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
       
        made with <ion-icon :icon="logoIonic" /> + <ion-icon :icon="logoVue" /> by <a href="https://twitter.com/dlodeprojuicer">@dlodexprojuicer</a>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabs, IonIcon, IonPage } from "@ionic/vue";
import { logoIonic, logoVue } from "ionicons/icons";

export default {
  name: "Tabs",
  components: { IonTabs, IonTabBar, IonIcon, IonPage },
  setup() {
    return {
      logoIonic,
      logoVue
    };
  },
};
</script>

<style lang="scss" scoped>
ion-tab-bar {
  height: 50px;
  font-size: 14px;
  font-style: italic;
}

ion-icon, a {
  margin: 0 5px;
}
</style>

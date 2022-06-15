<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        made with <ion-icon :icon="logoIonic" /> + <ion-icon :icon="logoVue" /> & <ion-icon :icon="logoFirebase" /> by <a href="https://twitter.com/dlodeprojuicer">@dlodeprojuicer</a> 
        | <a href="https://github.com/dlodeprojuicer/techconf-db#contributors" target="_blank">Contributors</a> welcome!
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabs, IonIcon, IonPage } from "@ionic/vue";
import { logoIonic, logoVue, logoFirebase } from "ionicons/icons";

export default {
  name: "Tabs",
  components: { IonTabs, IonTabBar, IonIcon, IonPage },
  setup() {
    return {
      logoIonic,
      logoVue,
      logoFirebase
    };
  },
};
</script>

<style lang="css" scoped>
ion-tab-bar {
  height: 50px;
  font-size: 14px;
  font-style: italic;
  float: right;
}

ion-icon, a {
  margin: 0 5px;
  color: #777777;
}
</style>

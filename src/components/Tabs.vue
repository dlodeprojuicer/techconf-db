<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <div role="tab">
          made with <ion-icon :icon="logoIonic" /> + <ion-icon :icon="logoVue" /> & <ion-icon :icon="logoFirebase" /> by <a href="https://www.linkedin.com/in/simomafuxwana/" target="_blank">{{ name }}</a> 
          <!-- | <a href="https://github.com/dlodeprojuicer/techconf-db#contributors" target="_blank">Contributors</a> welcome! -->
        </div>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { IonTabBar, IonTabs, IonIcon, IonPage, IonRouterOutlet } from "@ionic/vue";
import { logoIonic, logoVue, logoFirebase } from "ionicons/icons";

export default {
  name: "Tabs",
  components: { IonTabs, IonTabBar, IonIcon, IonPage, IonRouterOutlet },
  setup() {

    const names = ["Simo", "See More", "Seymour", "Cmo", "Cee More", "Ceymour"]
    function pickRandomName(namesArray) {
        // Get a random index between 0 and the length of the array - 1
        const randomIndex = Math.floor(Math.random() * namesArray.length);
        
        // Return the name at the random index
        return namesArray[randomIndex];
      }
    return {
      logoIonic,
      logoVue,
      logoFirebase,
      name: pickRandomName(names)
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

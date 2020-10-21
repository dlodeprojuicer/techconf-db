import { createStore } from 'vuex';
import auth from "./modules/auth";
import events from "./modules/events";
import venues from "./modules/venues";
import speakers from "./modules/speakers";
// import userProfile from "./modules/userProfile";

const store = createStore({
  modules: {
    auth,
    events,
    venues,
    speakers,
    // userProfile
  },
  state: {
    httpLoader: false,
    searchString: null,
  },
  getters: {
    httpLoader({ httpLoader }) {
      return httpLoader;
    },
    searchString({ searchString }) {
      return searchString;
    },
  },
  mutations: {
    // updateSearch(state, data) {
    //   console.log("M", data);
    //   state[data.stateObject] = data;
    // }
  },
});

export default store;

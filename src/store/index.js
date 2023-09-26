import { createStore } from 'vuex';
import auth from "./modules/auth";
import events from "./modules/events";
import venues from "./modules/venues";
import speakers from "./modules/speakers";
import firebase from "../firebase";

const store = createStore({
  modules: {
    auth,
    events,
    venues,
    speakers,
  },
  state: {
    httpLoader: false,
    searchString: null,
    userProfile: JSON.parse(localStorage.getItem("tcdbUserProfile")) || {},
  },
  getters: {
    httpLoader: (state) => state.httpLoader,
    searchString: (state) => state.searchString,
    userProfile: (state) => state.userProfile,
  },
  mutations: {
    SET_USER_PROFILE(state, data) {
      state.userProfile = data;
      localStorage.setItem("tcdbUserProfile", JSON.stringify(data));
    },
  },
  actions: {
    async createUser(_, request) {
        await firebase.firestore().collection("users").doc(request.uid).set({ ...request });
    },
    async getUserProfile({ commit }, userId) {
        const doc = await firebase.firestore().collection("users").doc(userId).get();
        const userData = doc.data();
        commit("SET_USER_PROFILE", userData);
        return userData;
    },
    async getUsers() {
        const { docs } = await firebase.firestore().collection("users").get();
        return docs.map(doc => doc.data());
    },
    async updateUser({ getters }, request) {
        request.updatedBy = getters.loginToken;
        await firebase.firestore().collection("users").doc(request.uid).update(request);
    },
    async updateRefTracker({ dispatch }, request) {
        const snapshot = await firebase.database().ref("refTracker").once("value");
        let tracker = snapshot.val();
        await dispatch("updateRefTrackerValue", { [request]: ++tracker[request] });
    },
    async updateRefTrackerValue(_, request) {
        await firebase.database().ref("refTracker").update(request);
    }
  }
});

export default store;

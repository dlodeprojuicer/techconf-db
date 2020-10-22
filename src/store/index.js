import { createStore } from 'vuex';
import auth from "./modules/auth";
import events from "./modules/events";
import venues from "./modules/venues";
import speakers from "./modules/speakers";
// import userProfile from "./modules/userProfile";
import firebase from "../firebase";

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
    userProfile: {},
  },
  getters: {
    httpLoader({ httpLoader }) {
      return httpLoader;
    },
    searchString({ searchString }) {
      return searchString;
    },
    userProfile({ userProfile }) {
      return userProfile || JSON.parse(localStorage.getItem("tcdbUserProfile"));
    },
  },
  mutations: {
    userProfile(state, data) {
      state.events = data;
      localStorage.setItem("tcdbUserProfile", JSON.stringify(data));
    },
    // updateSearch(state, data) {
    //   console.log("M", data);
    //   state[data.stateObject] = data;
    // }
  },
  actions: {
    createUser(request) {
      return new Promise((resolve) => {
        firebase.firestore().collection("users")
          .doc(request.uid)
          .set({...request})
          .then(() => {
            resolve();
          });
      })
    },
    getUserProfile(context, request) {
      return new Promise((resolve, reject) => {
        firebase.firestore().collection("users")
          .doc(request)
          .get()
          .then(doc => {
            context.commit("userProfile", doc.data());
            resolve(doc.data());
          }).catch(error => {
            reject(error);
          });
      })
    },
    getUsers() {
      return new Promise((resolve) => {
        firebase.firestore().collection("users")
          .get()
          .then(({ docs }) => {
            resolve(docs.map(a => a.data()));
          });
      })
    },
    updateUser(context, request) {
      request.updatedBy = context.getters.loginToken;
      return new Promise((resolve) => {
        firebase.firestore().collection("users")
          .doc(request.uid)
          .update(request)
          .then(() => {
            resolve();
          });
      })
    } 
  }
});

export default store;

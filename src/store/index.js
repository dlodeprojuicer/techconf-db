import { createStore } from 'vuex';
import * as auth from "./modules/auth";
// import * as events from "./modules/events";
// import * as userProfile from "./modules/userProfile";
import firebase from "./../firebase";

const store = createStore({
  modules: {
    auth,
    // events,
    // userProfile,
  },
  state: {
    loginToken: null,
    httpLoader: false,
  },
  getters: {
    httpLoader({ httpLoader }) {
      return httpLoader;
    },
    loginToken({ loginToken }) {
      return loginToken || localStorage.getItem("tcdbLoginToken");
    },
  },
  mutations: {
    loginToken(state, token) {
      if(token) {
        state.loginToken = token;
        localStorage.setItem("tcdbLoginToken", token);
      } else {
        state.loginToken = null;
        localStorage.removeItem("tcdbLoginToken");
      }
    },
  },
  actions: {
    login(context, request) {
      return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(request.email, request.password)
          .then(({ user }) => {
            context.commit("loginToken", user.uid);
            resolve(user.uid);
            context.dispatch("getEvents")
          }).catch(function(error) {
          reject(error)
        });
      })
    },
    signUp(context, request) {
      return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(request.email, request.password)
          .then(({ user }) => {
            context.commit("loginToken", user.uid);
            resolve(user.uid);
          }).catch(function(error) {
          reject(error)
        });
      })
    },
    logout(context) {
      return new Promise((reject) => {
        firebase.auth().signOut()
          .then(() => {
            context.commit("loginToken", null);
          }).catch(function(error) {
          reject(error)
        });
      })
    },
    getEvents() {
      return new Promise((resolve) => {
        let dataArray = [];
        firebase.firestore().collection("events").get().then(({ docs }) => {
          docs.map(a => dataArray.push(a.data()));
          resolve(dataArray);
        });
      })
    },
  }
});

// const store = new Vuex.Store({
//   modules: {
//     auth,
//     // events,
//     // userProfile,
//   },
//   state: {
//     httpLoader: false,
//   },
//   getters: {
//     httpLoader({ httpLoader }) {
//       return httpLoader;
//     }
//   },
//   mutations: {
//   },
//   actions: {
//   }
// });

export default store;

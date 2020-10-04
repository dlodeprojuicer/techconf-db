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
    events: [],
    userProfile: {}
  },
  getters: {
    httpLoader({ httpLoader }) {
      return httpLoader;
    },
    loginToken({ loginToken }) {
      return loginToken || localStorage.getItem("tcdbLoginToken");
    },
    events({ events }) {
      return events || JSON.parse(localStorage.getItem("tcdbEvents"));
    },
    userEvents({ userEvents }) {
      return userEvents || JSON.parse(localStorage.getItem("tcdbUserEvents"));
    },
    userProfile({ userProfile }) {
      return userProfile || JSON.parse(localStorage.getItem("tcdbUserProfile"));
    }
  },
  mutations: {
    loginToken(state, token) {
      if(token) {
        state.loginToken = token;
        localStorage.setItem("tcdbLoginToken", token);
      } else {
        state.loginToken = null;
        localStorage.clear();
      }
    },
    events(state, data) {
      state.events = data;
      localStorage.setItem("tcdbEvents", JSON.stringify(data));
    },
    userEvents(state, data) {
      state.events = data;
      localStorage.setItem("tcdbUserEvents", JSON.stringify(data));
    },
    userProfile(state, data) {
      state.events = data;
      localStorage.setItem("tcdbuserProfile", JSON.stringify(data));
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
            context.dispatch("getUserProfile", context.getters.loginToken);
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
            request.uid = user.uid;
            delete request.password;
            context.dispatch("createUser", request).then(() => {
              resolve(user.uid);
            });
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
    getEvents(context) {
      return new Promise((resolve) => {
        firebase.firestore().collection("events")
          .orderBy("eventName")
          .where("verified", "==", true)
          .get()
          .then(({ docs }) => {
            const eventData = [];
            for (let x =0; docs.length > x; x++) {
              eventData.push({
                id: docs[x].id,
                ...docs[x].data()
              });
            }
            context.commit("events", eventData);
            resolve(eventData);
          });
      })
    },
    getUserEvents(context) {
      return new Promise((resolve) => {
        firebase.firestore().collection("events")
          .orderBy("eventName")
          .where("createdBy", "==", context.getters.loginToken)
          .get()
          .then(({ docs }) => {
            context.commit("userEvents", docs.map(a => a.data()));
            resolve(docs.map(a => a.data()));
          });
      })
    },
    createEvent(context, request) {
      request.createdBy = context.getters.loginToken;

      const createEventFn = r => {
        firebase.firestore().collection("events")
          .add(r)
          .then(() => {
            context.dispatch("getEvents");
        });
      }

      firebase.firestore().collection("users")
        .doc(context.getters.loginToken)
        .get()
        .then(user => {
          if (user.data().verified) {
            request.verified = true;
            createEventFn(request)
          } else {
            createEventFn(request)
          }
        });
    },
    updateEvent(context, request) {
      request.updatedBy = context.getters.loginToken;
      return new Promise((resolve) => {
        firebase.firestore().collection("events")
          .doc(request.id)
          .update(request)
          .then(() => {
            context.dispatch("getEvents");
            resolve();
          });
      })
    },
    createUser(context, request) {
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
      return new Promise((resolve) => {
        firebase.firestore().collection("users")
          .doc(request)
          .get()
          .then(doc => {
            context.commit("userProfile", doc.data());
            resolve(doc.data());
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

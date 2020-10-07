import { createStore } from 'vuex';
import * as auth from "./modules/auth";
// import * as events from "./modules/events";
// import * as userProfile from "./modules/userProfile";
import firebase from "./../firebase";
import moment from "moment";

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
    userProfile: {},
    searchString: null,
    filteredEvents: []
  },
  getters: {
    httpLoader({ httpLoader }) {
      return httpLoader;
    },
    loginToken({ loginToken }) {
      return loginToken || localStorage.getItem("tcdbLoginToken");
    },
    events({ events = [] }) {
      return events || JSON.parse(localStorage.getItem("tcdbEvents"));
    },
    userEvents({ userEvents }) {
      return userEvents || JSON.parse(localStorage.getItem("tcdbUserEvents"));
    },
    userProfile({ userProfile }) {
      return userProfile || JSON.parse(localStorage.getItem("tcdbUserProfile"));
    },
    filteredEvents({ events = [], searchString = ""}) {
      if (!searchString || searchString === "") {
        return events;
      } else {
        return events.filter(event => event.eventName.toLowerCase().includes(searchString.toLowerCase()));
      }
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
      localStorage.setItem("tcdbUserProfile", JSON.stringify(data));
    },
    updateSearchString(state, data) {
      state.searchString = data;
    }
  },
  actions: {
    login(context, request) {
      return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(request.email, request.password)
          .then(({ user }) => {
            context.dispatch("getUserProfile", user.uid).then(() => {
              context.commit("loginToken", user.uid);
              resolve(user.uid);
            });
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
      return new Promise((resolve, reject) => {
        firebase.firestore().collection("events")
          .orderBy("eventName")
          .where("verified", "==", true)
          .get()
          .then(({ docs }) => {
            const eventData = [];
            for (let x =0; docs.length > x; x++) {
              const docData = docs[x].data();
              eventData.push({
                id: docs[x].id,
                ...docData,
                start: docData.start ? moment(docData.start).format("DD/MM/YYYY") : null,
                end: docData.end ? moment(docData.end).format("DD/MM/YYYY") : null,
              });
            }
            context.commit("events", eventData);
            resolve(eventData);
          }).catch( error => {
            reject(error)
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
            const eventData = [];
            for (let x =0; docs.length > x; x++) {
              const docData = docs[x].data();
              eventData.push({
                id: docs[x].id,
                ...docData,
                start: docData.start ? moment(docData.start).format("DD/MM/YYYY") : null,
                end: docData.end ? moment(docData.end).format("DD/MM/YYYY") : null,
              });
            }
            context.commit("userEvents", eventData);
            resolve(eventData);
          });
      })
    },
    createEvent(context, request) {
      request.createdBy = context.getters.loginToken;
      return new Promise((resolve, reject) => {
        const createEventFn = r => {
          firebase.firestore().collection("events")
            .add(r)
            .then(() => {
              context.dispatch("getEvents").then(events => {
                context.commit("events", events);
                resolve(events)
              })
              .catch(error => {
                reject(error);
              });
          });
        }
  
        firebase.firestore().collection("users")
          .doc(context.getters.loginToken)
          .get()
          .then(user => {
            if (user.data().verified) {
              request.verified = true;
              createEventFn(request);
            } else {
              createEventFn(request)
            }
          });
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
    deleteEvent(context, request) {
      return new Promise(() => {
        firebase.firestore().collection("events")
          .doc(request)
          .delete();
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

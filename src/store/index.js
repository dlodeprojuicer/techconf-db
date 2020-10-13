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
    venues: [],
    userProfile: {},
    searchString: null,
    filteredEvents: [],
    filteredVenues: [],
    monthEventCount: 0,
    updateEventSearchObject: {},
    updateVenueSearchObject: {}
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
    venues({ venues = [] }) {
      return venues || JSON.parse(localStorage.getItem("tcdbVenues"));
    },
    userEvents({ userEvents }) {
      return userEvents || JSON.parse(localStorage.getItem("tcdbUserEvents"));
    },
    userProfile({ userProfile }) {
      return userProfile || JSON.parse(localStorage.getItem("tcdbUserProfile"));
    },
    searchString({ searchString }) {
      return searchString;
    },
    filteredEvents({ events = [], updateEventSearchObject }) {
      if (!updateEventSearchObject.field || updateEventSearchObject.field === "") {
        return events;
      } else {
        return events.filter(event => event[updateEventSearchObject.field].toLowerCase().includes(updateEventSearchObject.value.toLowerCase()));
      }
    },
    monthEventCount({ events = [] }) {
      const date = new Date();
      const month = date.getMonth();
      const monthPlus = month + 1;
      return events.filter(event => {
        if(event.start) {
          return event.start.split("/")[1] == monthPlus
        }
      });
    },
    filteredVenues({ venues = [], updateVenueSearchObject }) {
      if (!updateVenueSearchObject.field || updateVenueSearchObject.field === "") {
        return venues;
      } else {
        return venues.filter(venue => venue[updateVenueSearchObject.field].toLowerCase().includes(updateVenueSearchObject.value.toLowerCase()));
      }
    },
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
    venues(state, data) {
      state.venues = data;
      localStorage.setItem("tcdbVenues", JSON.stringify(data));
    },
    userEvents(state, data) {
      state.events = data;
      localStorage.setItem("tcdbUserEvents", JSON.stringify(data));
    },
    userProfile(state, data) {
      state.events = data;
      localStorage.setItem("tcdbUserProfile", JSON.stringify(data));
    },
    updateSearch(state, data) {
      state[data.stateObject] = data;
    }
  },
  actions: {
    // Auth
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

    // Events
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

    // User
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
    },

    // Venues
    createVenue(context, request) {
      request.createdBy = context.getters.loginToken;
      return new Promise((resolve, reject) => {
        const createVenueFn = r => {
          firebase.firestore().collection("venues")
            .add(r)
            .then(() => {
              context.dispatch("getVenues").then(venues => {
                context.commit("venues", venues);
                resolve(venues)
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
              createVenueFn(request);
            } else {
              createVenueFn(request)
            }
          });
      });
    },
    getVenues(context) {
      return new Promise((resolve, reject) => {
        firebase.firestore().collection("venues")
          .orderBy("venueName")
          .where("verified", "==", true)
          .get()
          .then(({ docs }) => {
            context.commit("venues", docs.map(a => a.data()));
            resolve(docs.map(a => a.data()));
          }).catch( error => {
            reject(error)
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

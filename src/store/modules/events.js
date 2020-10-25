import firebase from "../../firebase";
import moment from "moment";

// Client ID: 1031294018380-slmm46ia8pp5ccpprhb6jbflgr5cbdg5.apps.googleusercontent.com
// Client Secret: Tos2JoUe6uuz68KU0fUOz6gG
// Dev API Key: AIzaSyBj7U_7kKbdtx7_laMPm5vI_VeFoVyMiTc

const state = {
  events: [],
  filteredEvents: [],
  updateEventSearchObject: {},
  monthEventCount: 0,
}

const getters = {
  events({ events = [] }) {
    return events || JSON.parse(localStorage.getItem("tcdbEvents"));
  },
  filteredEvents({ events = [], updateEventSearchObject }) {
    if (!updateEventSearchObject.field || updateEventSearchObject.field === "") {
      return events;
    } else {
      return events.filter(event => event[updateEventSearchObject.field].toLowerCase().includes(updateEventSearchObject.value.toLowerCase()));
    }
  },
  userEvents({ userEvents }) {
    return userEvents || JSON.parse(localStorage.getItem("tcdbUserEvents"));
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
}

const mutations = {
  events(state, data) {
    state.events = data;
    localStorage.setItem("tcdbEvents", JSON.stringify(data));
  },
  userEvents(state, data) {
    state.events = data;
    localStorage.setItem("tcdbUserEvents", JSON.stringify(data));
  },
  updateSearch(state, data) {
    state[data.stateObject] = data;
  }
}

const actions = {
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

}

export default { state, getters, mutations, actions }

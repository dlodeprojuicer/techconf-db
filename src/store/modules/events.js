import firebase from "../../firebase";
import moment from "moment";

// const eventFormater = (docs) => {
//   const eventData = [];
//   for (let x =0; docs.length > x; x++) {
//     const docData = docs[x].data();
//     eventData.push({
//       id: docs[x].id,
//       ...docData,
//       startFormatted: docData.start ? moment(docData.start).format("DD/MM/YYYY") : null,
//       endFormatted: docData.end ? moment(docData.end).format("DD/MM/YYYY") : null,
//     });
//   }
//   return eventData;
// }

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
    if (!updateEventSearchObject?.field || updateEventSearchObject?.field === "") {
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
      if(event.startFormatted) {
        return event.startFormatted.split("/")[1] == monthPlus
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
          // const events = eventFormater(docs);
          const eventData = [];
          for (let x =0; docs.length > x; x++) {
            const docData = docs[x].data();
            eventData.push({
              id: docs[x].id,
              ...docData,
              startFormatted: docData.start ? moment(docData.start).format("DD/MM/YYYY") : null,
              endFormatted: docData.end ? moment(docData.end).format("DD/MM/YYYY") : null,
            });
          }

          // Ad
          // const ad = {
          //   "website": "https://example.com",
          //   "province": "",
          //   "createdBy": "JE3Bh37hpOch095fAEAcNbwrQWI3",
          //   "name": "Your Project Name",
          //   "ad": true,
          //   "desc": "Short project description of no more than twenty (20) words. Short project description of no more than twenty words."
          // };
          
          // Insert ad {ad}
          // anywhere between 0 and the number of total number of events {Math.random()}
          // without deleting items {0}
          // eventData.splice(Math.floor(Math.random() * docs.length), 0, ad);

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
          // const events = eventFormater(docs);
          const eventData = [];
          for (let x =0; docs.length > x; x++) {
            const docData = docs[x].data();
            eventData.push({
              id: docs[x].id,
              ...docData,
              startFormatted: docData.start ? moment(docData.start).format("DD/MM/YYYY") : null,
              endFormatted: docData.end ? moment(docData.end).format("DD/MM/YYYY") : null,
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
  // Will be used once I figure out why gapi is undefined when used in this module
  // gcEvent(context,request) {
  //   gapi.load("client:auth2", () => {
  //     gapi.client.init({
  //       apiKey: API_KEY,
  //       clientId: CLIENT_ID,
  //       discoveryDocs: DISCOVERY_DOCS,
  //       scope: SCOPES
  //     }).then(() => {
  //       if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
  //         context.dispatch("gcCreateEvent", request);
  //       } else {
  //         gapi.auth2.getAuthInstance().signIn().then(() => {
  //           context.dispatch("gcCreateEvent", request);
  //         })
  //         .catch(() => {
  //           alert(`You need to signin to your Google account before you can add event to your calendar`);
  //         });
  //       }
  //     })
  //     .catch(err => {
  //       alert(err.details);
  //     })
  //   })
  // },
  // gcCreateEvent(event) {
  //   const gcEvent = {
  //     "summary": event.eventName,
  //     "location": event.venue,
  //     "start": {
  //       "dateTime": moment(event.start).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
  //       "timeZone": "Africa/Johannesburg"
  //     },
  //     "end": {
  //       "dateTime": moment(event.end).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
  //       "timeZone": "Africa/Johannesburg"
  //     },
  //     "reminders": {
  //       "useDefault": false,
  //       "overrides": [
  //         {"method": "email", "minutes": 24 * 60},
  //         {"method": "popup", "minutes": 10}
  //       ]
  //     }
  //   };

  //   var request = gapi.client.calendar.events.insert({
  //     'calendarId': 'primary',
  //     'resource': gcEvent,
  //   });

  //   const rootWindow = window;

  //   request.execute(gcEvent => {
  //     rootWindow.open(gcEvent.htmlLink);
  //   })
  // }
}

export default { state, getters, mutations, actions }

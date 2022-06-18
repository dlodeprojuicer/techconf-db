import firebase from "../../firebase";
import moment from "moment";
// import redis from "redis";

// const REDIS_PORT = process.env.PORT || 6379;
// console.log(REDIS_PORT);
// const redisClient = redis.createClient(REDIS_PORT);

const state = {
  events: [],
  // filteredEvents: [],
  updateEventSearchObject: {},
  monthEventCount: 0,
}

const getters = {
  events({ events = [] }) {
    return events || JSON.parse(localStorage.getItem("tcdbEvents"));
  },
  filteredEvents({ events = [], updateEventSearchObject }) {
    let future = [
      {
        "website": "https://namecheap.pxf.io/mgBr4e",
        "province": "",
        "name": "Namecheap",
        "ad": true,
        "desc": "Powering Internet freedom through domains, hosting, security, and more — everything you need to make more online, for less."
      }
    ];
    let past = [];
    let previous = [
      {
        "website": "https://www.pixeltrue.com/?via=techconfdb",
        "province": "",
        "name": "Pixeltrue",
        "ad": true,
        "desc": "Convert your visitors to customers with high quality illustrations that will help you build breath-taking websites."
      }
    ];
 
    if (!updateEventSearchObject?.value || updateEventSearchObject?.value === "") {
      events.map(e => {
        if (e.start && moment(e.start).isSame(new Date(), 'year') && moment(e.start).isSameOrAfter(new Date(), 'month') && moment(e.start).isAfter(new Date(), 'day')) {
          future.push(e);
          return e;
        } else if (moment(e.start).isSame(moment(), 'year') && moment(e.start).isSameOrBefore(moment(), 'month') && moment(e.start).isBefore(new Date(), 'day')) {
          past.push(e)
        } else {
          previous.push(e);
        }
      })

      // ascending order
      future.sort((a, b) => moment(a).diff(b));
      future.reverse();

      return {
        future, 
        past, 
        previous 
      }
    } else {
      const filtered = events.filter(event => {
        if (!event.ad) {
          return event[updateEventSearchObject.field].toLowerCase().includes(updateEventSearchObject.value.toLowerCase())
        }
      });

      filtered.map(e => {
        if (e.start && moment(e.start).isSame(new Date(), 'year') && moment(e.start).isSameOrAfter(new Date(), 'month') && moment(e.start).isAfter(new Date(), 'day')) {
          future.push(e);
          return e;
        } else if (moment(e.start).isSame(moment(), 'year') && moment(e.start).isSameOrBefore(moment(), 'month') && moment(e.start).isBefore(new Date(), 'day')) {
          past.push(e)
        } else {
          previous.push(e);
        }
      })
      return {
        future, 
        past, 
        previous 
      };
    }
  },
  userEvents({ userEvents }) {
    return userEvents || JSON.parse(localStorage.getItem("tcdbUserEvents"));
  },
  monthEventCount({ events = [] }) {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthPlus = month + 1;
    return events.filter(event => {
      if(event.startFormatted) {
        return event.startFormatted.split("/")[1] == monthPlus && event.startFormatted.split("/")[2] == year;
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
          // redisClient.set("events", eventData);
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

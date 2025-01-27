import firebase from "../../firebase";
import moment from "moment";
// import data from "./data.json"
// import springCleaning from "../../utils/springCleaner";

// springCleaning(data);

const state = {
  events: JSON.parse(localStorage.getItem("tcdbEvents")) ?? [],
  updateEventSearchObject: {},
  monthEventCount: 0,
};

const getters = {
  events({ events }) {
    return events;
  },
  filteredEvents({ events, updateEventSearchObject }) {
    let future = [
      {
        website: "https://vue-migration-service.com/",
        province: "",
        name: "Vue Migration Service",
        ad: true,
        desc: "Vue Migration Service offers streamlined migration services from Vue 2 to Vue 3",
      },
    ];
    let past = [];
    let previous = [
      {
        website: "https://www.youtube.com/watch?v=f1Nhswi9rAc&list=PLpq570-kMchbxk1W0G_00Zdkv11_KsMQn",
        province: "",
        name: "People of Interest Podcast",
        ad: true,
        desc: "Intersection of technology and entrepreneurship, featuring insights from industry leaders",
      },
    ];

    if (
      !updateEventSearchObject?.value ||
      updateEventSearchObject?.value === ""
    ) {
      const currentYear = new Date().getFullYear();

      events.map((e) => {
        if (
          e.start &&
          (moment(e.start).isSameOrAfter(new Date(), "year") ||
            moment(e.start).year() >= currentYear) &&
          moment(e.start).isSameOrAfter(new Date(), "month") &&
          moment(e.start).isAfter(new Date(), "day")
        ) {
          future.push(e);
          return e;
        } else {
          previous.push(e);
        }
      });

      // ascending order
      future.sort((a, b) => moment(a).diff(b));
      future.reverse();

      return {
        future,
        past,
        previous,
      };
    } else {
      const filtered = events.filter((event) => {
        if (!event.ad) {
          return event[updateEventSearchObject.field]
            .toLowerCase()
            .includes(updateEventSearchObject.value.toLowerCase());
        }
      });

      filtered.map((e) => {
        if (
          e.start &&
          moment(e.start).isSame(new Date(), "year") &&
          moment(e.start).isSameOrAfter(new Date(), "month") &&
          moment(e.start).isAfter(new Date(), "day")
        ) {
          future.push(e);
          return e;
        } else if (
          moment(e.start).isSame(moment(), "year") &&
          moment(e.start).isSameOrBefore(moment(), "month") &&
          moment(e.start).isBefore(new Date(), "day")
        ) {
          past.push(e);
        } else {
          previous.push(e);
        }
      });
      return {
        future,
        past,
        previous,
      };
    }
  },
  userEvents({ userEvents }) {
    return userEvents || JSON.parse(localStorage.getItem("tcdbUserEvents"));
  },
  monthEventCount({ events }) {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthPlus = month + 1;
    return events.filter((event) => {
      if (event.startFormatted) {
        return (
          event.startFormatted.split("/")[1] == monthPlus &&
          event.startFormatted.split("/")[2] == year
        );
      }
    });
  },
};
const mutations = {
  SET_EVENTS(state, data) {
    state.events = data;
    localStorage.setItem("tcdbEvents", JSON.stringify(data));
  },
  SET_USER_EVENTS(state, data) {
    state.userEvents = data; // Fixed potential bug
    localStorage.setItem("tcdbUserEvents", JSON.stringify(data));
  },
  UPDATE_SEARCH(state, data) {
    state[data.stateObject] = data;
  },
};

const actions = {
  async getEvents({ commit }) {
    const querySnapshot = await firebase
      .firestore()
      .collection("events")
      .orderBy("eventName")
      .where("verified", "==", true)
      .get();

    const eventData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      startFormatted: doc.data().start
        ? moment(doc.data().start).format("DD/MM/YYYY")
        : null,
      endFormatted: doc.data().end
        ? moment(doc.data().end).format("DD/MM/YYYY")
        : null,
    }));

    commit("SET_EVENTS", eventData);
    return eventData;
  },
  async getUserEvents({ commit, getters }) {
    const querySnapshot = await firebase
      .firestore()
      .collection("events")
      .orderBy("eventName")
      .where("createdBy", "==", getters.loginToken)
      .get();

    const eventData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      startFormatted: doc.data().start
        ? moment(doc.data().start).format("DD/MM/YYYY")
        : null,
      endFormatted: doc.data().end
        ? moment(doc.data().end).format("DD/MM/YYYY")
        : null,
    }));

    commit("SET_USER_EVENTS", eventData);
    return eventData;
  },
  async createEvent({ commit, dispatch, getters }, request) {
    request.createdBy = getters.loginToken;
    const user = await firebase
      .firestore()
      .collection("users")
      .doc(getters.loginToken)
      .get();
    if (user.data().verified) {
      request.verified = true;
    }
    await firebase
      .firestore()
      .collection("events")
      .add(request);
    const events = await dispatch("getEvents");
    commit("SET_EVENTS", events);
    return events;
  },
  async updateEvent({ dispatch, getters }, request) {
    request.updatedBy = getters.loginToken;
    await firebase
      .firestore()
      .collection("events")
      .doc(request.id)
      .update(request);
    await dispatch("getEvents");
  },
  async deleteEvent({ dispatch }, requestId) {
    await firebase
      .firestore()
      .collection("events")
      .doc(requestId)
      .delete();
    await dispatch("getEvents");
  },
};

export default { state, getters, mutations, actions };

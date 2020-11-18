import firebase from "../../firebase";

const state = {
  venues: [],
  filteredVenues: [],
  updateVenueSearchObject: {}
}

const getters = {
  venues({ venues = [] }) {
    return venues || JSON.parse(localStorage.getItem("tcdbVenues"));
  },
  filteredVenues({ venues = [], updateVenueSearchObject }) {
    if (!updateVenueSearchObject.value || updateVenueSearchObject.value === "") {
      return venues;
    } else {
      return venues.filter(venue => venue[updateVenueSearchObject.field].toLowerCase().includes(updateVenueSearchObject.value.toLowerCase()));
    }
  },
}

const mutations = {
  venues(state, data) {
    state.venues = data;
    localStorage.setItem("tcdbVenues", JSON.stringify(data));
  },
  updateSearch(state, data) {
    state[data.stateObject] = data;
  }
}

const actions = {
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

export default { state, getters, mutations, actions }

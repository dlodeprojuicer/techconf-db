import firebase from "../../firebase";

const state = {
  venues: JSON.parse(localStorage.getItem("tcdbVenues")) || [],
  updateVenueSearchObject: {},
};

const getters = {
  venues: (state) => state.venues,
  filteredVenues: (state) => {
    const { venues, updateVenueSearchObject } = state;
    const { value, field } = updateVenueSearchObject;

    if (!value) {
      return venues;
    } else {
      return venues.filter((venue) =>
        venue[field].toLowerCase().includes(value.toLowerCase())
      );
    }
  },
};

const mutations = {
  SET_VENUES(state, venues) {
    state.venues = venues;
    localStorage.setItem("tcdbVenues", JSON.stringify(venues));
  },
  UPDATE_SEARCH(state, data) {
    state[data.stateObject] = data;
  },
};

const actions = {
  async createVenue({ getters, dispatch, commit }, request) {
    request.createdBy = getters.loginToken;

    const createVenueFn = async (r) => {
      await firebase
        .firestore()
        .collection("venues")
        .add(r);
      const venues = await dispatch("getVenues");
      commit("SET_VENUES", venues);
      return venues;
    };

    const userDoc = await firebase
      .firestore()
      .collection("users")
      .doc(getters.loginToken)
      .get();
    const userData = userDoc.data();

    if (userData && userData.verified) {
      request.verified = true;
    }

    return await createVenueFn(request);
  },
  async getVenues({ commit }) {
    const querySnapshot = await firebase
      .firestore()
      .collection("venues")
      .orderBy("venueName")
      .where("verified", "==", true)
      .get();

    const venues = querySnapshot.docs.map((doc) => doc.data());
    commit("SET_VENUES", venues);
    return venues;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};

import firebase from "../../firebase";

const state = {
  speakers: JSON.parse(localStorage.getItem("tcdbSpeakers")) || [],
};

const getters = {
  speakers: (state) => state.speakers,
};

const mutations = {
  SET_SPEAKERS(state, speakers) {
    state.speakers = speakers;
    localStorage.setItem("tcdbSpeakers", JSON.stringify(speakers));
  },
};

const actions = {
  async createSpeaker({ commit, dispatch, getters }, request) {
    request.createdBy = getters.loginToken;

    const createSpeakerFn = async (r) => {
      await firebase.firestore().collection("speakers").add(r);
      const speakers = await dispatch("getSpeakers");
      commit("SET_SPEAKERS", speakers);
      return speakers;
    };

      const userDoc = await firebase.firestore().collection("users").doc(getters.loginToken).get();
      const userData = userDoc.data();

      if (userData && userData.verified) {
        request.verified = true;
      }

      return await createSpeakerFn(request);
  },
  async getSpeakers({ commit }) {
      const querySnapshot = await firebase.firestore().collection("speakers")
        .orderBy("name")
        .where("verified", "==", true)
        .get();

      const speakers = querySnapshot.docs.map(doc => doc.data());
      commit("SET_SPEAKERS", speakers);
      return speakers;
  },
};

export default { state, getters, mutations, actions };

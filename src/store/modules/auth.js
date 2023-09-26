import firebase from "./../../firebase";

const addToSpeakers = (speaker) => {
  return {
    name: speaker.name,
    lastname: speaker.lastname,
    position: speaker.role,
    contact: speaker.contactInfoConsent ? speaker.contact : "",
    image: "",
    social: [
      { link: speaker.twitter, label: "Twitter" },
      { link: speaker.linkedin, label: "LinkedIn" },
      { link: speaker.website, label: "Website" }
    ],
    highlights: [
      { name: speaker.highlight1name, year: speaker.highlight1year },
      { name: speaker.highlight2name, year: speaker.highlight2year },
      { name: speaker.highlight3name, year: speaker.highlight3year },
    ],
  };
};

const state = {
  loginToken: localStorage.getItem("tcdbLoginToken") || false,
  authError: null,
};

const getters = {
  loginToken: (state) => state.loginToken,
  authError: (state) => state.authError,
};

const mutations = {
  SET_LOGIN_TOKEN(state, token) {
    state.loginToken = token;
    if (token) {
      localStorage.setItem("tcdbLoginToken", token);
    } else {
      localStorage.clear();
    }
  },
  SET_AUTH_ERROR(state, error) {
    state.authError = error;
  },
};

const actions = {
  async login({ dispatch, commit }, request) {
      const { user } = await firebase.auth().signInWithEmailAndPassword(request.email, request.password);
      await dispatch("getUserProfile", user.uid);
      commit("SET_LOGIN_TOKEN", user.uid);
      await dispatch("getEvents");
      return user.uid;
  },
  async signUp({ dispatch, commit }, request) {
      const { user } = await firebase.auth().createUserWithEmailAndPassword(request.email, request.password);
      commit("SET_LOGIN_TOKEN", user.uid);
      const newUser = { ...request, uid: user.uid, verified: true };
      delete newUser.password;
      await dispatch("createUser", newUser);
      if (request.isSpeaker) {
        const speaker = addToSpeakers({ ...request.speaker, name: request.name, lastname: request.lastname, contact: request.email });
        await dispatch("createSpeaker", speaker);
      }
      return user.uid;
  },
  async logout({ commit }) {
      await firebase.auth().signOut();
      commit("SET_LOGIN_TOKEN", false);
  },
  loginStatus({ commit }) {
    firebase.auth().onAuthStateChanged(user => {
      commit("SET_LOGIN_TOKEN", user ? user.uid : false);
    });
  },
  async oAuth({ dispatch, commit }, providerName) {
    let provider;
    switch(providerName) {
      case "google":
        provider = new firebase.auth.GoogleAuthProvider();
        break;
      case "github":
        provider = new firebase.auth.GithubAuthProvider();
        break;
      case "facebook":
        provider = new firebase.auth.FacebookAuthProvider();
        break;
      case "twitter":
        provider = new firebase.auth.TwitterAuthProvider();
        break;
      default:
        throw new Error("OAuth provider not found");
    }

      const { user } = await firebase.auth().signInWithPopup(provider);
      await dispatch("createUser", { uid: user.uid, name: user.displayName, email: user.email });
      await dispatch("getUserProfile", user.uid);
      commit("SET_LOGIN_TOKEN", user.uid);
      return user.uid;
  },
};

export default { state, getters, mutations, actions };

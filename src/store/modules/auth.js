import firebase from "./../../firebase";

const state = {
  loginToken: null,
}

const getters = {
  loginToken({ loginToken }) {
    return loginToken || localStorage.getItem("techconfdb");
  },
  authError(state) {
    return state.authError;
  },
}

const mutations = {
  loginToken(state, token) {
    if(token) {
      state.loginToken = token;
      localStorage.setItem("tcdbLoginToken", token);
    } else {
      state.loginToken = null;
      localStorage.clear();
    }
  },
  authError(state, data) {
    state.authError = data;
  }
}

const actions = {
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
}

export default { state, getters, mutations, actions }

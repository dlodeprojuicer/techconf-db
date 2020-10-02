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
    state.loginToken = token;
    sessionStorage.setItem("techconfdb", token);
    localStorage.setItem("techconfdb", token);
  },
  authError(state, data) {
    state.authError = data;
  }
}

const actions = {
  signUp(context, request) {
    return new Promise((resolve, reject) => {
      console.log(request.email, request.password)
      firebase.auth().createUserWithEmailAndPassword(request.email, request.password)
        .then(data => {
          resolve(data);
        }).catch(function(error) {
        reject(error)
      });
    })
  },
}

export default { state, getters, mutations, actions }

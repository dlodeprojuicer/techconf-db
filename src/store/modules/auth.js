import mailchimp from "@mailchimp/mailchimp_marketing";
import firebase from "./../../firebase";

mailchimp.setConfig({
  apiKey: "bfe135ec5d510567a5e6e2be6557849c-us2",
  server: "us2",
});

const state = {
  loginToken: null,
}

const getters = {
  loginToken({ loginToken }) {
    return loginToken || localStorage.getItem("tcdbLoginToken");
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
  subscribe(context, request) {
    return new Promise((resolve, reject) => {
      mailchimp.post(`lists/c72f027b89/members`, {
        ...request,
        status: "subscribed"
      })
      .then(() => resolve())
      .catch(err => reject(err))
    })
  },
  async mailchimpTest() {
    const response = await mailchimp.ping.get();
    console.log(response);
  }
}


actions.mailchimpTest();
export default { state, getters, mutations, actions }

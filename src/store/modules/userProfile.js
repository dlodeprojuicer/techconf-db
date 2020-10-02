// import axios from "axios";

// const state = {
//   profile: null,
// }

// const getters = {
//   profile({ profile }) {
//     return profile || JSON.parse(localStorage.getItem("RedDotMobile_profile")) || {};
//   }
// }

// const mutations = {
//   profile(state, data) {
//     state.profile = data;
//     localStorage.setItem("RedDotMobile_profile", JSON.stringify(data));
//   },
// }

// const actions = {
//   profile(context) {
//     return new Promise((resolve, reject) => {
//       axios
//         .post(`${context.getters.apiUrl}/profile_read`, {
//           token: context.getters.loginToken,
//           app_name: context.getters.app_name,
//         })
//         .then(({ data: { data } }) => {
//           context.commit("profile", data);
//           resolve();
//         })
//         .catch(error => {
//           reject(error.response);
//         });
//     });
//   },
// }

// export { state, getters, mutations, actions }

import firebase from "../../firebase";

const state = {
	userProfile: JSON.parse(localStorage.getItem("tcdbUserProfile")) || {},
};

const getters = {
	userProfile: (state) => state.userProfile,
};

const mutations = {
	SET_USER_PROFILE(state, data) {
		state.userProfile = data;
		localStorage.setItem("tcdbUserProfile", JSON.stringify(data));
	},
};

const actions = {
	async createUser(_, request) {
		try {
			await firebase.firestore().collection("users").doc(request.uid).set({ ...request });
		} catch (error) {
			throw error;
		}
	},
	async getUserProfile({ commit }, uid) {
		try {
			const doc = await firebase.firestore().collection("users").doc(uid).get();
			const userProfile = doc.data();
			commit("SET_USER_PROFILE", userProfile);
			return userProfile;
		} catch (error) {
			throw error;
		}
	},
	async getUsers() {
		try {
			const { docs } = await firebase.firestore().collection("users").get();
			return docs.map(doc => doc.data());
		} catch (error) {
			throw error;
		}
	},
	async updateUser({ getters }, request) {
		request.updatedBy = getters.loginToken;
		try {
			await firebase.firestore().collection("users").doc(request.uid).update(request);
		} catch (error) {
			throw error;
		}
	},
};

export default {
	state,
	getters,
	mutations,
	actions,
};

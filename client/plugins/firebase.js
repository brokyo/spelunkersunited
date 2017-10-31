import Vue from 'vue'
import VueFire from 'vuefire'
import Firebase from 'firebase'

Vue.use(VueFire)

var config = {
	apiKey: "AIzaSyDP67uVdKSO6IyZmsN6_mQJrwLd_umPqmk",
	authDomain: "spelunkersu.firebaseapp.com",
	databaseURL: "https://spelunkersu.firebaseio.com",
	projectId: "spelunkersu",
	storageBucket: "",
	messagingSenderId: "827731820059"
};

let firebase = Firebase.initializeApp(config)
let db = firebase.database()

export { db }
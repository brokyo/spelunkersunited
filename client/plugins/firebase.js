import Vue from 'vue'
import VueFire from 'vuefire'
import Firebase from 'firebase'

Vue.use(VueFire)

var config = {
    apiKey: "AIzaSyASLHUUo0xCpeSuxVnAYDaM6c-OIAQas-E",
    authDomain: "geocitiesspelunkers.firebaseapp.com",
    databaseURL: "https://geocitiesspelunkers.firebaseio.com",
    projectId: "geocitiesspelunkers",
    storageBucket: "geocitiesspelunkers.appspot.com",
    messagingSenderId: "177405299831"
};

let firebase = Firebase.initializeApp(config)
let db = firebase.database()

export { db }
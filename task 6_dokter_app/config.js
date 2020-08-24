var firebaseConfig = {
  apiKey: "AIzaSyDTavM99cxMScN2FnyfMvO81_xJthVHfU4",
  authDomain: "hai-dokter.firebaseapp.com",
  databaseURL: "https://hai-dokter.firebaseio.com",
  projectId: "hai-dokter",
  storageBucket: "hai-dokter.appspot.com",
  messagingSenderId: "404637264594",
  appId: "1:404637264594:web:5df66a79e9c24843925b0b",
  measurementId: "G-H559QYQ9GK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.database();  
var auth =  firebase.auth();
const el = (el) => {
  return document.getElementById(el);
};

const el = (el) => {
    return document.getElementById(el)
  }
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBYDGNqrre2oFI0xJrPqxNH0sZMIIlGfic",
    authDomain: "bcamp-81660.firebaseapp.com",
    databaseURL: "https://bcamp-81660.firebaseio.com",
    projectId: "bcamp-81660",
    storageBucket: "bcamp-81660.appspot.com",
    messagingSenderId: "835960981628",
    appId: "1:835960981628:web:efe3830147d5ecb8bbe1f9",
    measurementId: "G-081990HQ6Q",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
  var auth =  firebase.auth();
  // var provider = new firebase.auth.GoogleAuthProvider();

var email_text = el('email_text');
var password_text = el('password_text');
var login_btn = el('login');
var signUp_btn = el('signUp');
var logout_btn = el('logout');
var loginContainer = el('loginContainer');

login_btn.addEventListener('click', handleLogin);
signUp_btn.addEventListener('click', handleSignup);
logout_btn.addEventListener('click', handleLogout);

function handleSignup() {
  auth.createUserWithEmailAndPassword(email_text.value, password_text.value)
  .then(function(data){
    console.log('eaaa...sukses daftar!!');
    console.log(data)
    alert('Berhasil terdaftar!')
    // location.reload();

  })
  .catch(function(err){
    console.log(err.code)
  switch(err.code){
    case 'auth/invalid-email':
      alert('Format email salah!');
      break;
      case 'auth/weak-password':
        alert('Password terlalu lemah!');
        break;
        case 'auth/email-already-in-use':
          alert('Email sudah digunakan!');
          break;
  }
  })
}
function handleLogin() {
  auth.signInWithEmailAndPassword(email_text.value, password_text.value)
  .then(function(data){
    console.log(data)
    // location.reload();
    
  })
  .catch(function(err){
    console.log(err.code)
    switch(err.code) {
      case 'auth/user-not-found':
      alert('User tidak terdaftar!');
      break;
      case 'auth/wrong-password':
      alert('Kata sandi/password yang anda masukan salah.')
    break;
    case 'auth/invalid-email':
      alert('Format email salah!');
      break;
    }    
  })
}
function handleLogout() {
  auth.signOut().then(function(){
  }).catch(function(err){
    console.log(err.code);
  })
}
auth.onAuthStateChanged(function(user){
if(user){
//login
console.log('dah mam lum?');
// logout_btn.classList.remove('hidden')
// loginContainer.classList.add('hidden')
    location.href = 'index.html'
} else {
//logout
// console.log('jangan lupa aqua');
// logout_btn.classList.add('hidden')
// loginContainer.classList.remove('hidden')

}

})

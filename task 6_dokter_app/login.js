
var db = firebase.database();
var dbUsers = db.ref("users");
var auth =  firebase.auth();

var email_text = el('email_text');
var password_text = el('password_text');
var userName = el('userName');
var userAddress = el('userAddress');
var userDate = el('userDate');
var userPass = el('userPass');
var userContact = el('userContact');
var userEmail = el('userEmail');
var login_btn = el('login');
var signUp_btn = el('signUp');
var logout_btn = el('logout');
var loginContainer = el('loginContainer');


login_btn.addEventListener('click', handleLogin);
signUp_btn.addEventListener('click', handleSignup);
logout_btn.addEventListener('click', handleLogout);

function handleSignup() {  

  auth.createUserWithEmailAndPassword(userEmail.value, userPass.value)
  .then(function(data){
  console.log('berhasil daftar')
db.ref("users/klien/" + data.user.uid).set({     
  nama: userName.value,
  tanggal_lahir: userDate.value,
  alamat: userAddress.value,
  email: userEmail.value,
  kontak: userContact.value,
}) 
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
  // .then(function(data){
  //   // console.log(data)
  //   // location.reload();
  // })
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
location.reload()

  }).catch(function(err){
    console.log(err.code);
  })
}

auth.onAuthStateChanged(user => {
if(user){
//login
console.log("you're sign in");
// console.log(user.uid);
db.ref('users/dokter/' + user.uid).once('value').then(data => {
if(data.val() === null){
  db.ref('users/admin/' + user.uid).once('value').then(data => {
    console.log(data.val());
      if(data.val() === null){
        location.href = '/pages/klien/'
      } else {
        location.href = '/pages/admin/'
      }
  })

}else {
  location.href = '/pages/dokter/'
}


})


} else {
//logout
console.log("you're logout");


$('#loginForm').modal('show')
  
}
})


// db.ref('users/dokter/' + 123).once('value').then(data => {
//   console.log(data.val())
// })
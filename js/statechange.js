
var logout_btn = document.getElementById('logout');

logout_btn.addEventListener('click', handleLogout);

function handleLogout() {
    auth.signOut()
  }

auth.onAuthStateChanged(user => {
    if(user){
    //user sign in
   console.log('hai user'); 
    
    } else {
    //logout
    location.href = '../../index.html'    
      
    }
    
    })
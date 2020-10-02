import app from 'firebase/app'
import 'firebase/auth'
const config = {
    apiKey: process.env.REACT_APP_FIREBASE_APP_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    AppId: process.env.REACT_APP_FIREBASE_APP_ID,
};

  class Firebase {
      constructor(){
          app.initializeApp(config)
          this.auth = app.auth()
      }
      registerFirebaseUser = (email, password) => {
          return this.auth.createUserWithEmailAndPassword(email, password)
      }
  }

  export default Firebase
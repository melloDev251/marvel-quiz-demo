import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBMBT_YWStte0faRuAUsllEFQWihjMekco",
    authDomain: "marvel-quiz-demo-437da.firebaseapp.com",
    projectId: "marvel-quiz-demo-437da",
    storageBucket: "marvel-quiz-demo-437da.appspot.com",
    messagingSenderId: "616234188926",
    appId: "1:616234188926:web:46cab2e4e688c49e14182f"
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
    }

    // inscription
    signUpUser = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);


    // connexion
    loginUser = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    // deconnexion
    signOutUser = () => this.auth.signOut()

    // récupération mot de passe
    passwordReset = (email) => this.auth.sendPasswordResetEmail(email);

    // bla
    user = (uid) => this.db.doc(`users/${uid}`);  // ``pour combiner une chaîne de caractère et un variable

}

export default Firebase;


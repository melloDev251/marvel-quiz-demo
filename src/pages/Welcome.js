import React, { useState, Fragment, useContext, useEffect } from "react";
import LogOut from "./LogOut";
import Quiz from "./Quiz";
import { FirebaseContext } from "../firebase";


const Welcome = (props) => {

  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState({})

  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged(user => {      // verification de l'utilisateur s'il est connecter ou pas
      user ? setUserSession(user) : props.history.push("/login"); // redirection automatique vers la page welcome
    })

    if (userSession !== null) {

      firebase.user(userSession.uid)
        .get()
        .then((doc) => {
          if (doc && doc.exists) {
            const myData = doc.data();
            setUserData(myData);
          }

        })
        .catch((error) => {
          console.log(error);

        })
    }


    return () => {
      listener()
    }
  }, [userSession])

  return userSession === null ? (
    <Fragment>
      <div className="loader"></div>
      <p className="loaderText">Please Wait...</p>
    </Fragment>
  ) : (
    <div className="quiz-bg">
      <div className="container">
        <LogOut />
        <Quiz userData={userData} />
      </div>
    </div>
  );
};

export default Welcome;

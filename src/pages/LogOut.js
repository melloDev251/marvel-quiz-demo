import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../firebase";


const LogOut = () => {

  const [checked, setChecked] = useState(false);
  const firebase = useContext(FirebaseContext);

  console.log(checked);
  
  useEffect(()=>{
    if(checked) {
        firebase.signOutUser();
        console.log("déconnexion");
    }
  }, [checked])

  const handleChange = (e) => {
    setChecked(e.target.checked);
  }

  return (
    <div className="logoutContainer">
      <label className="switch">
        <input onChange={handleChange} type="checkbox" checked={checked} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default LogOut;

import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../firebase";
import ReactTooltip from 'react-tooltip';


const LogOut = () => {

  const [checked, setChecked] = useState(false);
  const firebase = useContext(FirebaseContext);

  console.log(checked);

  useEffect(() => {
    if (checked) {
      firebase.signOutUser();
      console.log("déconnexion");
    }
  }, [checked, firebase])

  const handleChange = (e) => {
    setChecked(e.target.checked);
  }

  return (
    <div className="logoutContainer">
      <label className="switch">
        <input onChange={handleChange} type="checkbox" checked={checked} />
        <span data-tip="DECONNEXION" className="slider round"></span>
      </label>
      <ReactTooltip place="left" type="dark" effect="solid" />
    </div>
  );
};

export default LogOut;

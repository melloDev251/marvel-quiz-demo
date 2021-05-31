import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../firebase";

const ForgetPass = (props) => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const firebase = useContext(FirebaseContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .passwordReset(email)
      .then(() => {
        setError(null);
        setSuccess(
          `Consultez votre boite mail ${email} pour changer le mot de passe !`
        );
        setTimeout(() => {
          props.history.push("/login"); // redirection automatique vers la page login
        }, 5000);
      })
      .catch((error) => {
        setError(error);
        setEmail("");
      });
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const disabled = email === "";

  return (
    <div class="signUpLoginBox">
      <div class="slContainer">
        <div className="formBoxLeftForget"></div>
        <div className="formBoxRight">
          <div className="formContent">

            {success && (
              <span
                style={{
                  border: "1px solid green",
                  background: "green",
                  color: "#ffffff",
                }}
              >
              </span>
            )}

            {error && <span> {error.message} </span>}

            <h2>Mot de passe oublié ?</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  onChange={handleEmail}
                  value={email}
                  type="email"
                  id="email"
                  required
                  autoComplete="off"
                />
                <label htmlFor="email">Email</label>
              </div>

              <button disabled={disabled}>Récupérer</button>
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/signup">
                Nouveau sur Marvel Quiz ? Inscrivez-vous maintenant.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;

import React from "react";
import batman from '../images/batman.png'

const h2 = {
  textAlign: 'center',
  marginTop: '50px',
  marginBottom: '30px',
}
const img = {
  display: 'block',
  margin: '60px auto',
}

const ErrorPage = () => {
  return (
    <div className="quiz-bg">
      <div className="container">
        <h2 style={h2}>Page Not Found. Fuck You  👉👌</h2>
        <img src={batman} alt="error page" style={img} />
      </div>
    </div>
  );
};

export default ErrorPage;

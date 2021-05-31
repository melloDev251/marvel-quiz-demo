import React from "react";

const a = {
  fontSize: '100px',
}

const Header = () => {
  return (
    <header>
      <div className="banner-container">
        <h1>
          <a href="/" style={a}>Marvel Quiz</a>
        </h1>
      </div>
    </header>
  );
};

export default Header;

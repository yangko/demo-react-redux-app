import React from 'react';

import logo from '../logo.svg'; // ./logo192.png public dir
import '../App.css'; // src dir

const HeaderComponent = () => 
  	<header className="App-header">
	    <img src={logo} className="App-logo" alt="logo" />
	    <h1 className="App-title">React-Redux App </h1>
	</header>

export default HeaderComponent;
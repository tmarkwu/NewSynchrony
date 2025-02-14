import React, { Component } from 'react';
import logo from './images/logo_navbar.png';
import './css/Navigation.css';
import Search from './Search';

class Navigation extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark ">
      <img src={logo}  width="210px" height="30px" className="img-responsive" alt="logo"></img>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav mr-auto ml-4 mt-2 mt-lg-0">
          <li className="nav-item active">
            <a className="nav-link" href="https://master.d3bckmtwgrwfut.amplifyapp.com/">Home<span className="sr-only">(current)</span></a>
          </li>
          {/*<li className="nav-item">
            <a className="nav-link" href="#">About</a>
          </li>*/}
          <li className="nav-item">
            <a className="nav-link" href="https://master.d3bckmtwgrwfut.amplifyapp.com/#change-log">{"What's New"}</a>
          </li>
          {/*<li className="nav-item">
            <a className="nav-link" href="#">Contact</a>
          </li>
          <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-user"></i> Profile </a>
              <div className="dropdown-menu dropdown-menu-right dropdown-cyan" aria-labelledby="navbarDropdownMenuLink-4">
                  <a className="dropdown-item" href="#">My account</a>
                  <a className="dropdown-item" href="#">Log out</a>
              </div>
          </li>*/}
        </ul>
      </div>
      <span className="nav_search">
      <Search/>
      </span>
    </nav>


  );
  }

}

export default Navigation;

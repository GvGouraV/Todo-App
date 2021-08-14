import React, { Component } from "react";
import { Link } from "react-router-dom";
class Nav extends Component {
  
  render() {
    
    return (
      
        <nav className="navbar  navbar-dark bg-danger">
          <Link to="/users" className="navbar-brand text-light mx-4 fw-bold">
            Home
          </Link> 
          <Link to="/users/add" className="navbar-brand text-light mx-4 fw-bold">
            New Todo
          </Link>
        </nav>
      
    );
  }
}

export default Nav;

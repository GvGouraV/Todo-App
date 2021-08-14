import React, { Component } from "react";
import http from "./http.Script";
class Delete extends Component{

    async componentDidMount(){
        const { id } = this.props.match.params;
     let response = http.deleteApi(`/users/${id}`)
     console.log("hy")
     this.props.history.push("/users");
    }  

  render(){
      return""
  }

}
export default Delete;
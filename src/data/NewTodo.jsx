import React, { Component } from "react";
import queryString from "query-string";
import http from "./http.Script";
import { Link } from "react-router-dom";
class NewTodo extends Component {
    state={
        data: {id:'',avatar:'',first_name:'',last_name:'',email:''}
    }
    
    async componentDidMount() {
        this.fetchData();
      }
      async componentDidUpdate(prevProps,prevState){
          if(prevProps!==this.props) this.fetchData();
      }
    
      async fetchData() {
        const { id } = this.props.match.params;
      console.log(id)
        if (id) {
          let response = await http.get(`/users/${id}`);
          let { data } = response.data;
          
          this.setState({ data: data, edit: true });
        } else {
          let data= {id:'',avatar:'',first_name:'',last_name:'',email:''}
          this.setState({ data: data, edit: false });
        }
      }
    
      async postData(url, obj) {
        let {id} = obj
        let response = await http.post(url, obj);
        
        alert(id+"  Data is Submit")
        this.props.history.push("/users");
      }
      async putData(url, obj) {
        let {id} = obj

        let response = await http.put(url, obj);
        alert(id+"  Data is updated")
        this.props.history.push("/users");
      }
      submitData = (e) => {
        e.preventDefault()
        let { data, edit } = this.state;
        edit
          ? this.putData(`/users/${data.id}`, data)
          : this.postData("/users", data);
      };
      handleChange = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };
        s1.data[input.name] = input.value;
        this.setState(s1);
      };

    showTextFields = (label, name, val) => {
        let{edit} = this.state
      return (
        <div className="container">
          <div className="form-group">
            <label>{label}</label>
            <input
              className="form-control"
              type="text"
              disabled={name=='id'&&edit==true ? true : false}
              name={name}
              value={val}
              onChange={this.handleChange}
            />
          </div>
        </div>
      );
    };
  

  render() {
    let  {id,avatar,first_name,last_name,email} = this.state.data

    return (
      <div className="container">
          {this.showTextFields("Avatar", "avatar", avatar)}<br/>
          {this.showTextFields("First Name", "first_name", first_name)}<br/>
          {this.showTextFields("Last Name", "last_name", last_name)}<br/>
          {this.showTextFields("Email", "email", email)}<br/>
          <div className=" text-center">
          <button className="btn btn-primary " onClick={this.submitData}>Submit</button>
          </div>
          
      </div>
    );
  }
}
export default NewTodo;

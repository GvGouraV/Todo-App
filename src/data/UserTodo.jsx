import React, { Component } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";
import {icon} from 'react-bootstrap-icons';
import http from "./http.Script";

class UserTodo extends Component {
  
    state ={
        TodoData :[]
    }

  
    async fetchData(){
      let queryParams = queryString.parse(this.props.location.search);
      let searchStr =this.makeSearchString(queryParams)
      console.log(searchStr)
      let response = null;
       if(searchStr)
       response = await http.get(`/users?${searchStr}`);
       else
       response = await http.get("/users");
     
      let { data } = response;
      
      this.setState({ TodoData: data });
    }
  
    componentDidMount() {
      this.fetchData();
    }
  
    componentDidUpdate(prevProps, prevState) {
      if (prevProps !== this.props) this.fetchData();
    }
    callURl = (url, options) => {
      let searchString = this.makeSearchString(options);
      this.props.history.push({
        pathname: url,
        search: searchString,
      });
    };
    makeSearchString = (options) => {
      let { page} = options;
      let searchStr = "";
      searchStr = this.addToQueryString(searchStr, "page", page);
      return searchStr;
    };
    addToQueryString = (str, parmName, paramValue) =>
      paramValue
        ? str
          ? `${str}&${parmName}=${paramValue}`
          : `${parmName}=${paramValue}`
        : str;
  
    handleChange = (e) =>{
      let {currentTarget:input} = e;
      let queryParams = queryString.parse(this.props.location.search);
      queryParams[input.name]=input.value 
      this.callURl("/cars",queryParams)
    }

    showTextFields = (label, name, val) => {

      return (
        <div className="container">
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name={name}
              value={val}
              placeholder={label}
              onChange={this.handleChange}
            />
          </div>
        </div>
      );
    };

    showRadio = (arr,label,name,val) =>{
        return(<div className="container border">
            <h4>{label}</h4>
             {arr.map((sts)=>(
          <React.Fragment>
              <div className="form-check ">
              <input
              className="form-check-input"
              type="radio"
              name={name}
              value={sts}
              checked={val===sts}
              onChange={this.handleChange}
              />
              <label className="form-check-label">{sts}</label></div><br/>
          </React.Fragment>
            ))}
        </div>)
    }

    addPage = (val) =>{
        let queryParams = queryString.parse(this.props.location.search);
        val=val+1
        queryParams.page=val
        this.callURl('/users',queryParams)

    }
    subPage = (val) =>{
        let queryParams = queryString.parse(this.props.location.search);
        val=val-1
        queryParams.page=val
        this.callURl('/users',queryParams)

    }

  render() {
    let { data=[] , page , per_page,total,total_pages} = this.state.TodoData
    return (
    <div className="container text-center">
        <h6>Page No : {page}     No of Person : {per_page}     Total Pages : {total_pages} </h6>
       <div className="row">
           {data.map(op=>(
               <div className="col-4 border ">
                   <div><img src={op.avatar}></img></div>
                   <div>First Name : {op.first_name}</div>
                   <div>Last Name : {op.last_name}</div>
                   <div>Email : <Link>{op.email}</Link></div>
                   <div className="row">
                   <div className="col bg-light"><Link to={`users/${op.id}/edit`}><i className="text-warning">edit</i></Link></div>
                   <div className="col bg-light"><Link to={`users/${op.id}/delete`}><i className="text-danger">delete</i></Link></div>
                   </div>
               </div>
           ))}
       </div><br/>
       
       <div className="row">
           <div className="col-2">{page<=1?'':<button className="btn btn-primary" onClick={()=>this.subPage(page)}> prev</button>}</div>
           <div className="col-8"></div>
           <div className="col-2">{page>=total_pages?"":<button className="btn btn-primary" onClick={()=>this.addPage(page)}> next</button>}</div>
       </div>
    </div>)
    }
         
}
export default UserTodo;

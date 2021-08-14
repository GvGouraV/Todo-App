import React,{Component} from "react";
import {Route,Redirect,Switch} from "react-router-dom";
import UserTodo from "./UserTodo";
import NewTodo from "./NewTodo";
import Nav from "./Nav";
import Delete from "./delete";
class MainTodo extends Component{

    render(){
       return(
        <div className="container ">
             <Nav/>
              <Switch>
                  
              <Route path="/users/add" component={NewTodo} />
              <Route path="/users/:id/edit" component={NewTodo} />
              <Route path="/users/:id/delete" component={Delete} />
              <Route path="/users" component={UserTodo} />
              
  
              <Redirect from="/" to="/user"/>
              </Switch>  
       </div>)
    }
}
export default MainTodo;
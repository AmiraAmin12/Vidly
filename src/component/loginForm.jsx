import React, { Component } from 'react';
class LoginForm extends Component {
  userName = React.createRef()
handleSubmit = e => {
    e.preventDefault();
    //call the server
   const  userName = this.userName.current.value
}

    state = {  }
    render() { 
        return ( <div>
            <h1>Login</h1> 
           <form onSubmit={this.handleSubmit} >
               <div className="form-group">
                   <label htmlFor="Username">Username</label>
                   <input  ref ={this.userName} id="Username" type="text" className="form-control"/>
              </div>
               <div className="form-group">
                   <label htmlFor="password">Password</label>
                   <input id="password"  type="text" className="form-control"/>
                </div>
                <button className="btn btn-primary">Submit</button>
           </form>
        </div>);
    }
}
 
export default LoginForm;
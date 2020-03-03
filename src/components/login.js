import React from 'react';
import fire from "../fire";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signUp = this.signUp.bind(this);
        this.state={
            email:'',
            password:''
        }
    }

    login(e){
        //this prevent default will prevent reloading page if login event is clicked because it is a form
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
        }).catch((error) => {
            console.log(error);
        });
    }

    signUp(e){
        //this prevent default will prevent reloading page if login event is clicked because it is a form
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
        .catch((error) => {
            console.log(error);
        });
    }


    handleChange(e){
        this.setState({[e.target.name] : e.target.value});
    }

    render(){
        return (
            <div className="col-md-6">
                <form>
                    <div class="form-group">
                       <label for="exampleInputEmail"> Email Address </label>
                       <input value={this.state.email} onChange={ this.handleChange }  type="email" name ="email"
                              class="form-control" id="exampleInputEmail" aria-describedby="emailHelp"
                              placeholder="Enter email" />
                       <small id="emailHelp" class="form-text text-muted">請輸入您的帳號</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input value={this.state.password} onChange={this.handleChange} type="password"
                               name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <button type="submit" onClick={this.login} class="btn btn-primary"> Login </button>
                    <button onClick={this.signUp} style = {{marginLeft:'25px'}} className="btn btn-success">Sign Up</button>
                </form>
            </div>
        );
    }
}
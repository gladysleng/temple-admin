import React from 'react';
import fire from "../fire";
import { NavLink } from 'react-router-dom';
import './login.scss';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signUp = this.signUp.bind(this);
        this.state = {
            email: '',
            password: '',
            errorMessage:''
        }
    }

    login(e) {
        //this prevent default will prevent reloading page if login event is clicked because it is a form
        e.preventDefault();
      fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        this.props.history.push("/home");
        }).catch((error) => {
            this.setState({errorMessage:error.message});
            console.log(error);
        });
    }

    signUp(e) {
        //this prevent default will prevent reloading page if login event is clicked because it is a form
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .catch((error) => {
                console.log(error);
            });
    }


    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div class="container-fluid h-100 bg-light text-dark">
                <div className="row justify-content-center align-items-center">
                    <h1 className="header">登入帳戶</h1>
                </div>
                <hr/>
                <div className="d-flex justify-content-center align-items-center container ">
                    <div className="col-md-8">
                        <form>
                            <div class="form-group">
                                <label for="exampleInputEmail" > 郵件  Email</label>
                                <input value={this.state.email} onChange={this.handleChange} type="email" name="email"
                                       class="form-control" id="exampleInputEmail" aria-describedby="emailHelp"
                                       placeholder="請輸入郵件"/>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1" > 密碼 Password </label>
                                <input value={this.state.password} onChange={this.handleChange} type="password"
                                       name="password" class="form-control" id="exampleInputPassword1"
                                       placeholder="請輸入密碼"/>
                                <small className="warning"> 密碼最少六位數</small>
                            </div>
                            <div>
                                {this.state.errorMessage && <h3 className="error"> { this.state.errorMessage } </h3>}
                            </div>
                            <button type="submit" style={{marginLeft: '90px'}} onClick={this.login} class="btn btn-primary"> 登入 Login</button>
                            <button onClick={this.signUp} style={{marginLeft: '40px'}} className="btn btn-primary">註冊 Sign Up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
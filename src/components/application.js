import './application.scss';
import React from 'react';
import Profile from './profile.js';
import fire from "../fire";
import Login from "./login";
import Home from "./home";

export default class Application extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
        }
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        fire.auth().onAuthStateChanged((user) => {

            if(user){
                this.setState({user});
            } else {
                this.setState({user:null});
            }
        });
    }

    render() {
        return (
            <div className="Temple-admin">
                {this.state.user ? (<Home/>) : (<Login/>)}
            </div>
        );
    }
}
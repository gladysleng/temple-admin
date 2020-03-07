import React from 'react';
import fire from "../fire";
import { NavLink } from 'react-router-dom';
export default class Home extends React.Component {

    constructor(props) {
      super(props);
      
      this.state = {
        text: ""
      }
    }

    logout = () => {
        fire.auth().signOut();
    }

    handlerSubmit = (e) => {
        let messageRef = fire.database().ref('messages').orderByKey().limitToLast(100);
        console.log(messageRef);
        fire.database().ref('messages').push(this.state.text);
        this.setState({
            text: ""
        })
    }

    render() {
        return (
            <div className="h-100 d-flex flex-column justify-content-center align-items-center mobile-scale">
                <div style={{display: "inline-block"}}>
                  <h1>Home Page</h1>
                  <input
                    type="text"
                    onChange={
                      (e) => this.setState({ text: e.target.value })
                    }
                    id="inputText"
                  />
                  <button onClick={this.handlerSubmit}> Save</button>
                  <button onClick={this.logout}> Logout </button>
                </div>
                <NavLink exact to={'people-table'}> Main Table </NavLink>
            </div>
        );
    }
}
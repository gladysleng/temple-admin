import React from 'react';
import fire from "../fire";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
        this.handlerText = this.handlerText.bind(this);
    }

    state = {
        text: ""
    }

    logout(){
        fire.auth().signOut();

    }

    handlerText = e => {
        this.setState({
            text: e.target.value
        })
    }

    handlerSubmit = e => {
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
                    <input type="text" onChange={this.handlerText} id="inputText"/>
                    <button onClick={this.handlerSubmit}> Save</button>
                    <button onClick={this.logout}> Logout </button>
                </div>
            </div>
        );
    }
}
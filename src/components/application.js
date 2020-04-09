import './application.scss';
import React from 'react';
import Profile from './profile.js';
import fire from "../fire";
import Login from "./login";
import Home from "./home";
import AddNewPerson from "./addNewPerson";
import SelectAttendees from "./selectAttendees";
import PeopleTable from './peopleTable';
import ViewAllEvents from './viewAllEvents';
import {ViewEvent} from './viewEvent';
import {
  Switch,
  Route
} from "react-router-dom";

export default class Application extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
        };
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
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/people-table" component={PeopleTable} />
              <Route exact path="/add-new-person" component={AddNewPerson} />
              <Route exact path="/profile/:id" render={ (props) => <Profile {...props} /> } />
              <Route exact path="/select-attendees" component={SelectAttendees} />
              <Route exact path="/view-all-events" component={ViewAllEvents} />
              <Route exact path="/view-event/:event_id" children={<ViewEvent />} />
            </Switch>
          </div>
        );
    }
}
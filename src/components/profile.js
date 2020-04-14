import React from 'react';
import fire from "../fire";
import _ from 'lodash';
import './profile.scss';
import {NavLink} from "react-router-dom";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: false,
    };
  }

  componentDidMount() {
    const user_id = this.props.match.params.id;
    fire.database().ref(`/Users/${user_id}`).once('value').then((user_snapshot) => {
      fire.database().ref(`/Events/`).once('value').then((events_snapshot) => {
        const user_data = user_snapshot.val();
        this.setState({
          data: user_data,
          list_of_events: _.pickBy( events_snapshot.val(),
            event => !_.isUndefined(event.attendees[user_data.gender][user_id]) ),
        });
      });
    });
  }
  
  render() {
    const { data, list_of_events } = this.state;
    console.log(list_of_events);
    return (
      <div className="column-container">
        <NavLink style={{marginLeft: 30, marginTop: 30}} exact to={'/people-table'}>
          ← Back to user search
        </NavLink>
        <span className="header"> 個人資料 </span>
        <div className="row-container">
          <span className="left"> 名字: </span>
          <span className="right"> {data.name} </span>
        </div>
        <div className="row-container">
          <span className="left"> 性别: </span>
          <span className="right"> {data.gender} </span>
        </div>
        <div className="row-container">
          <span className="left"> 求道年齡: </span>
          <span className="right"> {data.getTaoAge} </span>
        </div>
        <div className="row-container">
          <span className="left"> 地區: </span>
          <span className="right"> {data.getTaoPlace} </span>
        </div>
        <div className="row-container">
          <span className="left"> 引师: </span>
          <span className="right"> {data.yinShi} </span>
        </div>
        <div className="row-container">
          <span className="left"> 保师: </span>
          <span className="right"> {data.baoShi} </span>
        </div>
        <div className="row-container">
          <span className="left"> 地址: </span>
          <span className="right"> {data.unit ?
              `${data.streetAddress} ${data.unit}, ${data.cityAddress}, ${data.province} ${data.postalCode}` :
              `${data.streetAddress}, ${data.cityAddress}, ${data.province} ${data.postalCode}`} </span>
        </div>
        <div className="row-container">
          <span className="left"> 三天法会: </span>
          <span className="right"> {data.attendedThreeDaysFaHui ? data.threeDaysFaHuiDate : "X"} </span>
        </div>
        <div className="row-container">
          <span className="left"> 点传师: </span>
          <span className="right"> {data.dianChuanShi} </span>
        </div>
        <div className="row-container">
          <span className="left"> 了愿: </span>
          <span className="right"> {data.donation} </span>
        </div>
        <div className="row-container">
          <span className="left"> List of events: </span>
          <span className="right">
            <ul>
              { _.map(list_of_events, event => <li> {event.event_name} </li>) }
            </ul>
          </span>
        </div>
      </div>
    );
  }
}
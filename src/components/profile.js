import React from 'react';
import fire from "../fire";
import './profile.scss';
import {NavLink} from "react-router-dom";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading:false,
      event:{},
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    fire.database().ref(`/Users/${id}`).once('value').then((snapshot) => {
      this.setState({ data: snapshot.val()});
    });
  }
  
  render() {
    const { data } = this.state;
    return (
      <div className="column-container">
        <span className="header"> 個人資料 </span>
        <NavLink style={{marginLeft: 30}} exact to={'/people-table'}>
          Back to user search
        </NavLink>
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
      </div>
    );
  }
}
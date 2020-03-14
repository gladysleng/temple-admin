import React from 'react';
import fire from "../fire";
import _ from 'lodash';
import './profile.scss';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    fire.database().ref(`/Users/${id}`).once('value').then((snapshot) => {
      this.setState({ data: snapshot.val() });
    })
  }
  
  render() {
    const { data } = this.state;
    return (
      <div className="column-container">
        <span className="header"> 個人資料 </span>
        <div className="row-container">
          <span className="left"> 名字: </span>
          <span className="right"> {data.name} </span>
        </div>
        <div className="row-container">
          <span className="left"> 求道年齡: </span>
          <span className="right"> {data.gender} </span>
        </div>
        <div className="row-container">
          <span className="left"> 地區: </span>
          <span className="right"> {data.getTaoAge} </span>
        </div>
        <div className="row-container">
          <span className="left"> 願力: </span>
          <div className="right column-container">
            <label>
              <input type="checkbox" />
              { "重聖輕凡" }
            </label>
            <label>
              <input type="checkbox" />
              { "重聖輕凡" }
            </label>
          </div>
        </div>
        <div className="row-container">
          <span className="left"> 法會: </span>
          <span className="right"> INSERT TABLE </span>
        </div>
        <div className="row-container">
          <span className="left"> 新民班: </span>
          <span className="right"> {data.dianChuanShi} </span>
        </div>
        <div className="row-container">
          <span className="left"> 至善班: </span>
          <span className="right"> {data.donation} </span>
        </div>
      </div>
    );
  }
}
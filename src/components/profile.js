import React from 'react';
import './profile.scss';

export default class Profile extends React.Component {
  render() {
    return (
      <div className="column-container">
        <span className="header"> 個人資料 </span>
        <div className="row-container">
          <span className="left"> 名字: </span>
          <span className="right"> 寧小平 </span>
        </div>
        <div className="row-container">
          <span className="left"> 求道年齡: </span>
          <span className="right"> 2018 </span>
        </div>
        <div className="row-container">
          <span className="left"> 地區: </span>
          <span className="right"> 多倫多 </span>
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
          <span className="right"> 第10屆 </span>
        </div>
        <div className="row-container">
          <span className="left"> 至善班: </span>
          <span className="right"> 第 4屆 </span>
        </div>

      </div>
    );
  }
}
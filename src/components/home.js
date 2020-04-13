import React from 'react';
import fire from "../fire";
import './home.scss';
import {NavLink} from 'react-router-dom';
import searchUser from '../image/searchUser.svg';
import addUser from '../image/addUser.svg';
import logout from '../image/logout.svg';
import printing from '../image/printing.svg';
import event from '../image/calendar.svg';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ""
    };
  }

  logout = () => {
    fire.auth().signOut();
  }

  render() {
    const TrinityItem = ({img_url, title,chinese_title, href}) => (
      <a href={href} className="TrinityItem">
        <div className="TrinityItem__Title">
          {title}
        </div>
        <div className="TrinityItem__ChineseTitle">
          {chinese_title}
        </div>
        <div className="TrinityItem__Img">
          <img aria-hidden="true" src={img_url}/>
        </div>
      </a>
    );

    return (
      <div>
        <div style={{display: "inline-block"}}>
          <div class="row">
            <div class="column">
              <TrinityItem
                img_url={searchUser}
                title={"Search User "}
                chinese_title={"搜索"}
                href={"/people-table"}
              />
              <TrinityItem
                img_url={addUser}
                title={"Add User "}
                chinese_title={"添加道親"}
                href={"/add-new-person"}
              />
            </div>
            <div className="column">
              <TrinityItem
                img_url={event}
                title={"Create Event"}
                chinese_title={"创新活动"}
                href={"/select-attendees"}
              />
              <TrinityItem
                img_url={printing}
                title={"View / Print Event"}
                chinese_title={"打印活动资料"}
                href={"/view-all-events"}
              />
            </div>
            <div className="column">
              <TrinityItem
                img_url={logout}
                title={"Log Out "}
                chinese_title={"登出"}
                onClick={this.logout}
                href={"/"}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
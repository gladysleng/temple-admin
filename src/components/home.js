import React from 'react';
import fire from "../fire";
import './home.scss';
import {NavLink} from 'react-router-dom';
import searchUser from '../image/searchUser.svg';
import addUser from '../image/addUser.svg';
import logout from '../image/logout.svg';
import printing from '../image/printing.svg';

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

  render() {
    const TrinityItem = ({img_url, title, href}) => (
      <a href={href} className="TrinityItem">
        <div className="TrinityItem__Title">
          {title}
        </div>
        <div className="TrinityItem__Img">
          <img aria-hidden="true" src={img_url}/>
        </div>
      </a>
    );

    return (
      <div>
        <h1 className="header"> Home Page 主頁 </h1>
        <div style={{display: "inline-block"}}>
          <div class="row">
            <div class="column">
              <TrinityItem
                img_url={searchUser}
                title={"Search User 搜索"}
                href={"/people-table"}
              />
              <TrinityItem
                img_url={addUser}
                title={"Add User 加道親"}
                href={"/add-new-person"}
              />
            </div>
            <div className="column">
              <TrinityItem
                img_url={printing}
                title={"Print Form 打印"}
              />
              <TrinityItem
                img_url={logout}
                title={"Log Out 登出"}
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
import './printForm.scss';
import React from 'react';
import fire from "../fire";
import _ from 'lodash';
import {NavLink} from 'react-router-dom';
import home from '../image/home.svg';
import ReactToPrint from "react-to-print";
import PrintTable from "./printTable";


export default class PrintForm extends React.Component {
  constructor(props) {
    super(props);
  }

  backToHomePage = () => {
    fire.auth().signOut();
  }

  render() {
    return (
      <div className="container">
        <h1 className="header"> 道親資料 </h1>
        <div>
          <NavLink className="home-page-link" exact to={'home'}>
            <img className="image" src={home} alt="home"/>
            Back to home page
          </NavLink>
        </div>
        <div>
          <ReactToPrint
            content={() => this.componentRef}
            trigger={() => <button className="print-button" href="#">Print this out!</button>}
          />
        </div>
        <PrintTable clasName = "table" ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}
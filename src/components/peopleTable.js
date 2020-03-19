import './peopleTable.scss';
import React from 'react';
import fire from "../fire";
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
import home from '../image/home.svg';

export default class PeopleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      query: "",
      data: [],
    }
  }
  componentDidMount() {
    this.setState({ loading: true });
    fire.database().ref('/Users/').once('value').then((snapshot) => {
      const data = _.chain(snapshot.val())
        .map((row, id) => ([
          id, {
            name: row.name,
            gender: row.gender,
            getTaoAge: row.getTaoAge,
            getTaoPlace: row.getTaoPlace,
            yinShi: row.yinShi,
            baoShi: row.baoShi,
            address: row.unit ?
              `${row.streetAddress} ${row.unit}, ${row.cityAddress}, ${row.province} ${row.postalCode}` :
              `${row.streetAddress}, ${row.cityAddress}, ${row.province} ${row.postalCode}`,
            attendedThreeDaysFaHui: row.attendedThreeDaysFaHui,
            threeDaysFaHuiDate: row.threeDaysFaHuiDate,
            dianChuanShi: row.dianChuanShi,
            donation: row.donation,
          }]))
        .fromPairs()
        .value();
      this.setState({ loading: false, data: data });
    })
  }

  backToHomePage = () => {
    fire.auth().signOut();
  }

  render() {
    const {
      loading,
      data,
      query
    } = this.state;

    const headers = ["姓名", "性別", "求道日期", "佛堂", "引師", "保師", "地址",
      "三天法會", "三天法會日期", "點傳師", "了願",]
    const filtered_data = !loading && _.chain(data)
      .pickBy((row) => _.includes(row.name, query))
      .value();
    
    return !loading &&
      <div className="people-table-container">
        <h1 className="header"> 道親資料 </h1>
        <div>
          <label style={{ fontWeight: "bold" ,paddingTop:'30px'}}> Search by Name : </label>
          <input
            className="input-box"
            type="text"
            placeholder="Search by Name"
            onChange={ (evt) => this.setState({ query: evt.target.value }) }
          />
          <NavLink className="home-page-link" exact to={'home'}>
            <img className="image" src={home} alt="home" />
            Back to home page
          </NavLink>
        </div>
        <table>
        <tbody>
          <tr>
            {_.map(headers, (header) => 
              <td className="tbl-header" key={header}>
                {header}
              </td>
            )}
          </tr>
          {_.map(filtered_data, (row, id) => 
            <tr key={id}>
              {_.map(row, (field, key) =>
                <td key={key}>
                  {
                    key==="name" ? <NavLink exact to={{pathname: `/profile/${id}`}}> {field} </NavLink> : field
                  }
                </td>
              )}
            </tr>
            )}
        </tbody>
        </table>
      </div>;

  }
}
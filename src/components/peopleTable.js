import './peopleTable.scss';
import React from 'react';
import fire from "../fire";
import _ from 'lodash';
import { NavLink } from 'react-router-dom';

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
  render() {
    const {
      loading,
      data,
      query
    } = this.state;

    const headers = ["Name", "Gender", "Get Tao Age", "Get Tao Place", "YinShi", "BaoShi", "Address",
      "Attended 3Days FaHui", "3Days FaHui Date", "DianChuanShi", "Donation",]
    const filtered_data = !loading && _.chain(data)
      .pickBy((row) => _.includes(row.name, query))
      .value();
    
    return !loading &&
      <div className="container">
        <label style={{ fontWeight: "bold" }}> Search by Name: </label>
        <input
          type="text"
          placeholder="Search by Name"
          onChange={ (evt) => this.setState({ query: evt.target.value }) }
        />
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
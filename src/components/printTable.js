import React from 'react';
import PrintForm from "./printForm";
import ReactToPrint from "react-to-print";
import fire from "../fire";
import _ from "lodash";
import {NavLink} from "react-router-dom";
import home from "../image/home.svg";


class PrintTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      query: "",
      data: [],
    }
  }

  componentDidMount() {
    this.setState({loading: true});
    fire.database().ref('/Users/').once('value').then((snapshot) => {
      const data = _.chain(snapshot.val())
        .map((row, id) => ([
          id, {
            name: row.name,
            getTaoAge: row.getTaoAge,
            getTaoPlace: row.getTaoPlace,
            yinShi: row.yinShi,
            address: row.unit ?
              `${row.streetAddress} ${row.unit}, ${row.cityAddress}, ${row.province} ${row.postalCode}` :
              `${row.streetAddress}, ${row.cityAddress}, ${row.province} ${row.postalCode}`,
            dianChuanShi: row.dianChuanShi
          }]))
        .fromPairs()
        .value();
      this.setState({loading: false, data: data});
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

    const headers = ["姓名", "求道日期", "佛堂", "引師", "地址",
      "點傳師"]
    const filtered_data = !loading && _.chain(data)
      .pickBy((row) => _.includes(row.name, query))
      .value();


    return !loading &&
      <div className="people-table-container">
        <page className="page" style={{ size: "A4" ,color:'red',  layout:"landscape"}}>
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
                    key === "name" ? <NavLink exact to={{pathname: `/profile/${id}`}}> {field} </NavLink> : field
                  }
                </td>
              )}
            </tr>
          )}
          </tbody>
        </table>
        </page>
      </div>
  }

}

export default PrintTable;
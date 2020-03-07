import './peopleTable.scss';
import React from 'react';
import fire from "../fire";
import _ from 'lodash';

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
      const data = _.map(snapshot.val());
      this.setState({ loading: false, data: data });
    })
  }
  render() {
    const { loading, data, query } = this.state;
    const filtered_data = _.filter(data, (row) => _.includes(row.name, query))
    return !loading &&
      <div>
        <label style={{ fontWeight: "bold" }}> Search by Name: </label>
        <input
          type="text"
          placeholder="Search"
          onChange={ (evt) => this.setState({ query: evt.target.value }) }
        />
        <table>
        <tbody>
          <tr>
            {_.map(_.keys(filtered_data[0]), (header) => 
              <td>
                {header}
              </td>
            )}
          </tr>
          {_.map(filtered_data, (row) => 
            <tr>
              {_.map(row, (field) =>
                <td>
                  {field}
                </td>
              )}
            </tr>
            )}
        </tbody>
        </table>
      </div>;
  }
}
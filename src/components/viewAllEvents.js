import "./selectAttendees.scss";
import { Link } from 'react-router-dom';
import React from 'react';
import fire from "../fire";
import _ from 'lodash';

export default class ViewAllEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      query: "",
      data: [],
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    fire.database().ref('/Events/').once('value').then((evt_snapshot) => {
      const evt_data = _.mapValues(evt_snapshot.val(), evt => evt.event_name);
      this.setState({ loading: false, data: evt_data });
    });
  }
  render() {
    const { loading, data } = this.state;
    return !loading &&
      <div style={{margin: 20, display: "flex", flexDirection: "column", justifyContent: "center"}}>
        <h1 style={{margin: 10}} className="header"> Print attendees </h1>
        <span style={{margin: "auto", fontWeight: 700}}> Click on an event to print event attendees </span>
        <table style={{marginLeft: "auto", marginRight: "auto", marginTop: "40px", width: "50%"}}>
        <tbody>
          <tr>
            {_.map(["Event name"], (header) => 
              <td className="tbl-header" key={header}>
                {header}
              </td>
            )}
          </tr>
          {_.map(data, (row, id) => 
            <tr key={_.uniqueId()}>
              <td className="table-hover">
                <Link exact to={`/view-event/${id}`}>
                  {row}
                </Link>
              </td>
            </tr>
          )}
        </tbody>
        </table>
      </div>;
  }
}
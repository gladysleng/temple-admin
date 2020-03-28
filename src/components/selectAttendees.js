import "./selectAttendees.scss";
import _ from 'lodash';
import React from 'react';
import fire from "../fire";
import plus from "../image/plus.svg";
import minus from "../image/minus.svg";

class InteractiveTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {selected: null};
  }
  render(){
    const {
      rows,
      row_handler,
      isPlus,
      include_row_ctr,
      gender,
    } = this.props;
    
    const filtered_rows = gender ? _.pickBy(rows, (row) => row.gender===gender) : rows;
    return <div>
      { gender && <span> {`List of ${gender} attendees ONLY`} </span> }
      <table>
      <thead>
        <tr>
          {include_row_ctr && <td></td>}
          <td style={{fontWeight: 700}}>
            { gender ? `Name (${gender})` : `Name` }
          </td>
        </tr>
      </thead>
      <tbody>
        { _.map(filtered_rows, (row, id) => 
        <tr
          onClick={() => row_handler({[id]: row})}
          className={"table-hover"}
          key={id} >
          { include_row_ctr && <td> {_.findIndex(_.keys(filtered_rows), row_id => row_id===id)} </td> }
          <td key={id}>
            <div style={{display: "flex", justifyContent: "flex-end"}}>
              <span style={{marginLeft: "auto"}}> {row.name} </span>
              <img style={{width: 20, height: 20, marginLeft: "auto"}} alt={isPlus ? "plus" : "minus"} aria-hidden="true" src={isPlus ? plus : minus}/>
            </div>
          </td>
        </tr>
        )}
      </tbody>
    </table>
    </div>;
  }
}

export default class SelectAttendees extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      query: "",
      event_name: "",
      selected_data: {},
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    fire.database().ref('/Users/').once('value').then((snapshot) => {
      const data = _.chain(snapshot.val())
        .map((row, id) => ([
          [id], {
            name: row.name,
            gender: row.gender
          }
        ]))
        .fromPairs()
        .value();
      this.setState({ loading: false, data: data });
    });
  }

  render(){
    const {
      query,
      loading,
      data,
      selected_data,
      event_name,
    } = this.state;

    const filtered_data = !loading && _.chain(data)
      .keys()
      .pickBy(key => _.includes(data[key].name, query))
      .map(key => [[key], data[key]])
      .fromPairs()
      .value();

    return <div>
        <h1 className="header"> Add attendees </h1>
        <div style={{display: "flex", flexDirection: "column"}}>
          <label style={{ fontWeight: "bold" ,paddingTop:'30px'}}> Event Name : </label>
          <input
                className="input-box"
                type="text"
                placeholder="Name of the event for the attendees"
                onChange={ (evt) => this.setState({ event_name: evt.target.value }) }
              />
          <label style={{ fontWeight: "bold" ,paddingTop:'30px'}}> Search by Name : </label>
              <input
                className="input-box"
                type="text"
                placeholder="Search by Name"
                onChange={ (evt) => this.setState({ query: evt.target.value }) }
              />
        </div>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
      { !loading && <InteractiveTable
          isPlus={true}
          row_handler={ row => this.setState({
            selected_data: _.assignIn(selected_data, row)
          }) }
          rows={filtered_data}
        /> }
      { !loading && <InteractiveTable
          include_row_ctr={!_.isEmpty(selected_data)}
          gender={"乾"}
          row_handler={ row => this.setState({
            selected_data: _.omit(selected_data, _.keys(row))
          }) }
          rows={selected_data}
        /> }
      { !loading && <InteractiveTable
          include_row_ctr={!_.isEmpty(selected_data)}
          row_handler={ row => this.setState({
            selected_data: _.omit(selected_data, _.keys(row))
          }) }
          rows={selected_data}
          gender={"坤"}
        /> }
      </div>
      <div>
        <button onClick={() => {
          let mf = fire.database().ref('Events');
          mf.push({
              event_name: event_name,
              attendees: {
                乾: _.pickBy(selected_data, (row) => row.gender==="乾"),
                坤: _.pickBy(selected_data, (row) => row.gender==="坤")
              }
          });
        }}>
          SUBMIT
        </button>
      </div>
    </div>;
  }
}
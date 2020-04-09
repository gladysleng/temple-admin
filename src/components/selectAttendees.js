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
    return <div id={`${gender}_div`}>
      { gender && <span> {`List of ${gender} attendees ONLY`} </span> }
      <table>
      <thead>
        <tr>
          {include_row_ctr && <td></td>}
          <td style={{fontWeight: 700}}>
            { gender ? `Name (${gender})` : `Name` }
          </td>
          { include_row_ctr && 
          <td style={{fontWeight: 700}}>
            Donation ($)
          </td> }
          <td></td>
        </tr>
      </thead>
      <tbody>
        { _.map(filtered_rows, (row, id) => 
        <tr
          key={id} >
          { include_row_ctr && <td> {_.findIndex(_.keys(filtered_rows), row_id => row_id===id)} </td> }
          <td key={`name_${id}`}>
            <div style={{display: "flex", justifyContent: "flex-end"}}>
              <span style={{marginLeft: "auto"}}> {row.name} </span>
            </div>
          </td>
          { !isPlus && 
          <td key={`donation_${id}`}>
            <input id={id} type={"text"}/>
          </td> }
          <td
            title={isPlus ? "Click to add to attendees" : "Click to remove the attendee"}
            onClick={() => row_handler({[id]: row})}
            className={"table-hover"}
            key={`delete_row_${id}`}
          >
            <img style={{width: 20, height: 20, marginLeft: "auto"}} alt={isPlus ? "plus" : "minus"} aria-hidden="true" src={isPlus ? plus : minus}/>
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

    return <div style={{margin: 10}}>
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
          var success = true;
          if(event_name.length===0) {
            success = false;
          }
          var 乾_data = _.chain(selected_data)
            .pickBy(row => row.gender==="乾")
            .value();
          _.forEach(document.getElementById("乾_div").getElementsByTagName("INPUT"), input => {
            if(input.value.length===0 || isNaN(input.value)) {
              success = false;
            }
            乾_data[input.id] = {
              ...乾_data[input.id],
              donation: _.toNumber(input.value),
            };
          });
          var 坤_data = _.chain(selected_data)
            .pickBy(row => row.gender==="坤")
            .value();
          _.forEach(document.getElementById("坤_div").getElementsByTagName("INPUT"), input => {
            if(input.value.length===0 || isNaN(input.value)) {
              success = false;
            }
            坤_data[input.id] = {
              ...坤_data[input.id],
              donation: _.toNumber(input.value),
            };
          });
          if(!success) {
            alert("You need an event name and valid input for all donations");
            return;
          }
          let mf = fire.database().ref('Events');
          mf.push({
              event_name: event_name,
              attendees: {
                乾: 乾_data,
                坤: 坤_data
              }
          });
        }}>
          SUBMIT
        </button>
      </div>
    </div>;
  }
}
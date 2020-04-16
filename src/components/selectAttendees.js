import "./selectAttendees.scss";
import _ from 'lodash';
import React from 'react';
import fire from "../fire";
import plus from "../image/plus.svg";
import minus from "../image/minus.svg";
import home from "../image/home.svg";
import {NavLink} from "react-router-dom";
import Button from "react-bootstrap/Button";

class InteractiveTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      added_list: {
        乾: {},
        坤: {}
      },
    };
  }

  render() {
    const {
      rows,
      row_handler,
      isPlus,
      include_row_ctr,
      gender,
    } = this.props;

    const filtered_rows = gender ? _.pickBy(rows, (row) => row.gender === gender) : rows;
    let genderMap = {
      乾: 'Male Attendees',
      坤: 'Female Attendees',
    };
    return <div id={`${gender}_div`}>
      {gender && <span style={{fontWeight: "bold"}}> {`${gender}道班员 ${genderMap[gender]} `} </span>}
      <table>
        <thead>
        <tr style={{backgroundColor: '#597293', color: '#EDF2F4'}}>
          {include_row_ctr && <td></td>}
          <td style={{fontWeight: 700}}>
            {gender ? `Name 姓名(${gender})` : `Name 姓名`}
          </td>
          {include_row_ctr &&
          <td style={{fontWeight: 700}}>
            Donation 了愿 ($)
          </td>}
          <td></td>
        </tr>
        </thead>
        <tbody>
        {_.map(filtered_rows, (row, id) =>
          <tr
            key={id}>
            {include_row_ctr && <td> {_.findIndex(_.keys(filtered_rows), row_id => row_id === id) + 1} </td>}
            <td key={`name_${id}`}>
              <div style={{display: "flex", justifyContent: "center"}}>
                <span> {row.name} </span>
              </div>
            </td>
            {!isPlus &&
            <td key={`donation_${id}`}>
              <input id={id} type={"text"}/>
            </td>}
            <td
              title={isPlus ? "Click to add to attendees" : "Click to remove the attendee"}
              onClick={() => {
                const new_list = _.clone(this.state.added_list);
                new_list[row.gender][id] = row;
                this.setState({added_list: new_list});
                return row_handler({
                  user: {
                    [id]: {
                    ...row,
                    order_num: _.keys(this.state.added_list[row.gender]).length
                  }
                },
                });
            }}
              className={"table-hover"}
              key={`delete_row_${id}`}
            >
              <img style={{width: 20, height: 20, marginLeft: "auto"}} alt={isPlus ? "plus" : "minus"}
                   aria-hidden="true" src={isPlus ? plus : minus}/>
            </td>
          </tr>
        )}
        </tbody>
      </table>
    </div>;
  }
}

export default class SelectAttendees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      query: "",
      event_name: "",
      selected_data: {},
      dataPosted: false,
      donationsNotEntered: false,
    };
  }

  componentDidMount() {
    this.setState({loading: true});
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
      this.setState({loading: false, data: data});
    });
  }

  render() {
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
      <h1 style={{fontSize:30,textAlign:'center'}}> 添加班员 <br/> Add Attendees To The Events </h1>
      <div style={{display: "flex", justifyContent: "space-evenly", paddingBottom: '30px'}}>
        <div style={{display: "flex", flexDirection: "column"}}>
          <label style={{fontWeight: "bold", paddingTop: '20px'}}>  活动名字 Event Name : </label>
          <input
            className="input-box-attendees"
            type="text"
            placeholder="请输入活动的名字"
            onChange={(evt) => this.setState({event_name: evt.target.value})}
          />

        </div>
      </div>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
        <div>
          <label style={{fontWeight: "bold"}}> 搜索班员 Search Name : </label>
          <br/>
          <input
            className="input-box-attendees"
            type="text"
            placeholder="请输入班员的姓名"
            onChange={(evt) => this.setState({query: evt.target.value})}
          />
          {!loading && <InteractiveTable
            isPlus={true}
            row_handler={row => {
              this.setState({
                selected_data: _.assignIn(selected_data, row.user)
              });
            }}
            rows={filtered_data}
          />}
        </div>

        {!loading && <InteractiveTable
          include_row_ctr={!_.isEmpty(selected_data)}
          gender={"乾"}
          row_handler={row => this.setState({
            selected_data: _.omit(selected_data, _.keys(row))
          })}
          rows={selected_data}
        />}
        {!loading && <InteractiveTable
          include_row_ctr={!_.isEmpty(selected_data)}
          row_handler={row => this.setState({
            selected_data: _.omit(selected_data, _.keys(row))
          })}
          rows={selected_data}
          gender={"坤"}
        />}
      </div>
      <div style={{textAlign: 'center', paddingTop: '30px'}}>
        {this.state.dataPosted
        && !this.state.donationsNotEntered
        && <span style={{color: 'green', paddingBottom: '10px'}}> Event Created! 创好文件 ✓ </span>}
        {this.state.donationsNotEntered
        && !this.state.dataPosted
        && <span style={{fontWeight: "bold", color: 'red', marginBottom: '20px'}}>
          ** 请输入了班员愿资料  Please enter donations column** </span>}
        <br/><br/>
        <Button variant="primary" type="submit" onClick={() => {
          var success = true;
          if (event_name.length === 0) {
            success = false;
          }
          var 乾_data = _.chain(selected_data)
            .pickBy(row => row.gender === "乾")
            .value();
          _.forEach(document.getElementById("乾_div").getElementsByTagName("INPUT"), input => {
            if (input.value.length === 0 || isNaN(input.value)) {
              success = false;
            }
            乾_data[input.id] = {
              ...乾_data[input.id],
              donation: _.toNumber(input.value),
            };
          });
          var 坤_data = _.chain(selected_data)
            .pickBy(row => row.gender === "坤")
            .value();
          _.forEach(document.getElementById("坤_div").getElementsByTagName("INPUT"), input => {
            if (input.value.length === 0 || isNaN(input.value)) {
              success = false;
            }
            坤_data[input.id] = {
              ...坤_data[input.id],
              donation: _.toNumber(input.value),
            };
          });
          if (!success) {
            this.setState({
              dataPosted: false,
              donationsNotEntered: true,
            });
            return;
          }
          let mf = fire.database().ref('Events');
          console.log(乾_data);
          mf.push({
            event_name: event_name,
            attendees: {
              乾: 乾_data,
              坤: 坤_data
            }
          });
          this.setState({dataPosted: true, donationsNotEntered: false});
        }}>
           完成
        </Button>
      </div>
    </div>;
  }
}
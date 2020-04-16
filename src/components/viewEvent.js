import "./viewEvent.scss";
import React from 'react';
import ReactToPrint from 'react-to-print';
import { useParams } from 'react-router-dom';
import fire from "../fire";
import _ from 'lodash';
import Button from 'react-bootstrap/Button';

export function ViewEvent() {
  const { event_id } = useParams();
  return <ReactViewEvent event_id={event_id}/>;
}

class TableToPrint extends React.Component {
  render() {
    const {
      selected_gender,
      data,
      headers,
    } = this.props;

    return <div style={{margin: 20,textAlign:'center'}}>

      <span style={{ fontWeight:'Bold',fontSize:20}} dangerouslySetInnerHTML={{
            __html: `<b>${data.event_name}</b>`
          }} />
      <table style={{width: "100%"}}>
        <thead style={{fontWeight:'bold'}}>
          <tr>
            {_.map(headers, header => (
              <td> {header} </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {_.map(data[selected_gender], evt_attendee => (
            <tr>
              {_.map(evt_attendee, field => (
                <td> {field} </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>;
  }
}

class ReactViewEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_gender: "坤",
      loading: false,
      data: [],
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    const { event_id } = this.props;

    fire.database().ref('/Events/').once('value').then((evt_snapshot) => {
      fire.database().ref('/Users/').once('value').then((usrs_snapshot) => {
        const user_data = usrs_snapshot.val();
        const target_evt = evt_snapshot.val()[event_id];
        const evt_data = _.chain(target_evt.attendees)
          .map((row, gender) => {
            return [gender, 
              _.map(row,
              (user, id) => {
                return user_data[id] && ({
                order_num: user.order_num,
                name: user_data[id].name,
                donation: user_data[id].donation,
                getTaoAge: user_data[id].getTaoAge,
                getTaoPlace: user_data[id].getTaoPlace,
                yinShi: user_data[id].yinShi,
                address: user_data[id].unit ?
                  `${user_data[id].streetAddress} ${user_data[id].unit}, ${user_data[id].cityAddress}, ${user_data[id].province} ${user_data[id].postalCode}` :
                  `${user_data[id].streetAddress}, ${user_data[id].cityAddress}, ${user_data[id].province} ${user_data[id].postalCode}`,
                });}
              )];})
          .fromPairs()
          .value();
      evt_data.event_name = target_evt.event_name;
      this.setState({ loading: false, data: evt_data });
      });
    });
  }
  render() {
    const { loading, data, selected_gender } = this.state;
    return <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
      <h1 style={{margin: 10,fontSize:30,textAlign:'center'}}>  班员资料 <br/> Attendees' Information </h1>
      <div style={{display: "flex", flexDirection: "row", textAlign:"center", justifyContent: "center",marginTop:30}}>
        <span style={{fontWeight: 700, paddingRight: 10, lineHeight: 2.3}}> 坤 </span>
        <label class="switch">
          <input type="checkbox" onClick={(e) => this.setState({selected_gender: e.target.checked ? "乾" : "坤"})}/>
          <span class="slider round"></span>
        </label>
        <span style={{fontWeight: 700, paddingLeft: 10, lineHeight: 2.3}}> 乾 </span>
      </div>
      {!loading &&
      <TableToPrint
        ref={el => (this.componentRef = el)}
        headers={["编号", `姓名(${selected_gender})` , "了愿", "求道年龄", "佛堂", "引师", "地址"]}
        data={data}
        selected_gender={selected_gender}
      />
      }
      <ReactToPrint
        trigger={() => <Button style={{margin: "auto"}} className="col-md-3">Print table 打印表格 </Button>}
        content={() => this.componentRef}
      />
    </div>;
  }
}

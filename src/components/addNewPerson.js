import React from 'react';
import './addNewPerson.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import fire from "../fire";
import home from "../image/home.svg";
import {NavLink} from "react-router-dom";
import _ from 'lodash';

export default class AddNewPerson extends React.Component {
    constructor(props) {
        super(props);
        this.handleAttendThreeDaysFaHui = this.handleAttendThreeDaysFaHui.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            dataIsEmpty: false,
            name: '',
            gender: '乾',
            getTaoAge: '',
            getTaoPlace: '',
            yinShi: '',
            baoShi: '',
            streetAddress: '',
            unit: '',
            cityAddress: '',
            province: 'ON',
            postalCode: '',
            attendedThreeDaysFaHui: false,
            threeDaysFaHuiDate: '',
            dianChuanShi: '',
            donation: '',
            dataPosted:false,
        };
    }

    componentDidMount() {
        const rootRef = fire.database().ref().child('User');
    }

    handleAttendThreeDaysFaHui(e) {
        this.setState({attendedThreeDaysFaHui: !this.state.attendedThreeDaysFaHui});
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
        console.log(e.target.value);
    }

    handlerSubmit = e => {
        e.preventDefault();
        const dataIsEmpty = (this.state.name === '' || this.state.getTaoAge === '' || this.state.getTaoPlace === '' || this.state.yinShi === '' ||
        this.state.baoShi === '' || this.state.streetAddress === '' || this.state.unit === '' || this.state.cityAddress === '' ||
        this.state.postalCode === '' || this.state.dianChuanShi === '' || this.state.donation === ''
        );
        if(dataIsEmpty){
            this.setState({dataIsEmpty: dataIsEmpty, dataPosted: false});
        } else{
            console.log("Submit");
            let mf = fire.database().ref('Users');
            let messageRef = mf.push({
                name: this.state.name,
                gender: this.state.gender,
                getTaoAge: this.state.getTaoAge,
                getTaoPlace: this.state.getTaoPlace,
                yinShi: this.state.yinShi,
                baoShi: this.state.baoShi,
                streetAddress: this.state.streetAddress,
                unit: this.state.unit,
                cityAddress: this.state.cityAddress,
                province: this.state.province,
                postalCode: this.state.postalCode,
                attendedThreeDaysFaHui: this.state.attendedThreeDaysFaHui,
                threeDaysFaHuiDate: this.state.threeDaysFaHuiDate,
                dianChuanShi: this.state.dianChuanShi,
                donation: this.state.donation,
            });
            if(messageRef != null){
                this.setState({dataPosted:true, dataIsEmpty: dataIsEmpty});
            }
            console.log("posted:" + messageRef);
            this.setState({
                name: '',
                gender: '乾',
                getTaoAge: '',
                getTaoPlace: '',
                yinShi: '',
                baoShi: '',
                streetAddress: '',
                unit: '',
                cityAddress: '',
                province: '',
                postalCode: '',
                attendedThreeDaysFaHui: false,
                threeDaysFaHuiDate: '',
                dianChuanShi: '',
                donation: '',
            });
        }
    }

    logout() {
        fire.auth().signOut();

    }

    render() {
        return (
            <div className="container-fluid h-100 bg-light text-dark">
                <div className="d-flex flex-column align-items-center" style={{paddingTop: 20}}>
                <h1 style={{textAlign: "center", fontSize:30}}> 登記新求道人 <br/>Register New Participant</h1>
                </div>
                <hr/>
                <div className="d-flex justify-content-center align-items-center container ">
                    <div className="col-md-10">
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>姓名</Form.Label>
                                    <Form.Control name="name" type="text" placeholder="請輸入姓名" value={this.state.name}
                                                  onChange={this.handleChange}/>
                                </Form.Group>
                                <Form.Group controlId="Form.ControlSelectGender">
                                    <Form.Label>性別</Form.Label>
                                    <Form.Control as="select" name="gender" onChange={this.handleChange}
                                                  defaultValue={this.state.gender}>
                                        <option value="乾">乾</option>
                                        <option value="坤">坤</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formYear">
                                    <Form.Label>求道年份</Form.Label>
                                    <Form.Control name="getTaoAge" type="number" placeholder="請輸入求道年份" value={this.state.getTaoAge}
                                                  onChange={this.handleChange}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formTemple">
                                    <Form.Label>佛堂</Form.Label>
                                    <Form.Control name="getTaoPlace" type="text" placeholder="請輸入求道佛堂" value={this.state.getTaoPlace}
                                                  onChange={this.handleChange}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formDanation">
                                    <Form.Label>求道功德費</Form.Label>
                                    <Form.Control name="donation" type="number" placeholder="請輸入求道功德費" value={this.state.donation}
                                                  onChange={this.handleChange}/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formYinShiName">
                                    <Form.Label>引師</Form.Label>
                                    <Form.Control name="yinShi" type="text" placeholder="引師姓名" value={this.state.yinShi}
                                                  onChange={this.handleChange}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formBaoShiName">
                                    <Form.Label>保師</Form.Label>
                                    <Form.Control name="baoShi" type="text" placeholder="保師姓名" value={this.state.baoShi}
                                                  onChange={this.handleChange}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formDianChuanShiName">
                                    <Form.Label>點傳師</Form.Label>
                                    <Form.Control name="dianChuanShi" type="text" placeholder="點傳師姓名" value={this.state.dianChuanShi}
                                                  onChange={this.handleChange}/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="formGridAddress1">
                                <Form.Label>街名/道路</Form.Label>
                                <Form.Control name="streetAddress" placeholder="1234 Main St" value={this.state.streetAddress}
                                              onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group controlId="formGridAddress2">
                                <Form.Label>單元/樓號/室</Form.Label>
                                <Form.Control name="unit" placeholder="Apartment, studio, or floor" value={this.state.unit}
                                              onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>城市</Form.Label>
                                    <Form.Control name="cityAddress" placeholder="Toronto" value={this.state.cityAddress}
                                                  onChange={this.handleChange}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>省份</Form.Label>
                                    <Form.Control name="province" as="select" onChange={this.handleChange}>
                                        <option value="NL">NL</option>
                                        <option value="PE">PE</option>
                                        <option value="NS">NS</option>
                                        <option value="NB">NB</option>
                                        <option value="QC">QC</option>
                                        <option value="ON">ON</option>
                                        <option value="MB">MB</option>
                                        <option value="SK">SK</option>
                                        <option value="AB">AB</option>
                                        <option value="BC">BC</option>
                                        <option value="YT">YT</option>
                                        <option value="NT">NT</option>
                                        <option value="NU">NU</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>地區郵政</Form.Label>
                                    <Form.Control name="postalCode" placeholder="K2R 5B6" onChange={this.handleChange}/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Group id="formGridCheckbox">
                                <Form.Check type="checkbox" label="有參與過三天法會" checked={this.state.attendedThreeDaysFaHui}
                                            onChange={this.handleAttendThreeDaysFaHui}/>
                            </Form.Group>
                            {this.state.attendedThreeDaysFaHui &&
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Control name="threeDaysFaHuiDate" type="text" placeholder="請輸入參加三天法會的日期如 ： 30-6-2023"
                                              onChange={this.handleChange}/>
                            </Form.Group>
                            }
                            { this.state.dataIsEmpty && !this.state.dataPosted &&
                              <span  style={{ fontWeight: "bold" ,color:'red'}}> **请输入所有资料** </span>
                            }
                            <div className="text-center">
                                {this.state.dataPosted && !this.state.dataIsEmpty && <span style={{color:'green'}}>Data posted! 创好新人资料 ✓ </span>}
                                <br/>
                                <Button variant="primary" type="submit" onClick={this.handlerSubmit}>
                                    完成
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }


}
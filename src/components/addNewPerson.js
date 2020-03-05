import React from 'react';
import './addNewPerson.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default class AddNewPerson extends React.Component {
    constructor(props) {
        super(props);
        this.handleAttendThreeDaysFaHui = this.handleAttendThreeDaysFaHui.bind(this);
    }

    state = {
        name: '',
        gender: '',
        getTaoAge: '',
        getTaoPlace: '',
        yinShi: '',
        baoShi: '',
        address: '',
        attendedThreeDaysFaHui: false,
        threeDaysFaHuiDate: '',
        dianChuanShi: '',
        donation: '',

    }

    handleAttendThreeDaysFaHui(e) {
        this.setState({attendedThreeDaysFaHui: !this.state.attendedThreeDaysFaHui});
    }

    render() {
        return (
            <div className="container-fluid h-100 bg-light text-dark">
                <div className="row justify-content-center align-items-center">
                    <h1 className="header">登記新求道人</h1>
                </div>
                <hr/>
                <div className="d-flex justify-content-center align-items-center container ">
                    <div className="col-md-10">
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>姓名</Form.Label>
                                    <Form.Control type="text" placeholder="請輸入姓名"/>
                                </Form.Group>
                                <Form.Group controlId="Form.ControlSelectGender">
                                    <Form.Label>性別</Form.Label>
                                    <Form.Control as="select">
                                        <option>乾</option>
                                        <option>坤</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formYear">
                                    <Form.Label>求道年份</Form.Label>
                                    <Form.Control type="number" placeholder="請輸入求道年份"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formTemple">
                                    <Form.Label>佛堂</Form.Label>
                                    <Form.Control type="text" placeholder="請輸入求道佛堂"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formDanation">
                                    <Form.Label>求道功德費</Form.Label>
                                    <Form.Control type="number" placeholder="請輸入求道功德費"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formYinShiName">
                                    <Form.Label>引師</Form.Label>
                                    <Form.Control type="text" placeholder="引師姓名"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formBaoShiName">
                                    <Form.Label>保師</Form.Label>
                                    <Form.Control type="text" placeholder="保師姓名"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formDianChuanShiName">
                                    <Form.Label>點傳師</Form.Label>
                                    <Form.Control type="text" placeholder="點傳師姓名"/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="formGridAddress1">
                                <Form.Label>街名/道路</Form.Label>
                                <Form.Control placeholder="1234 Main St"/>
                            </Form.Group>

                            <Form.Group controlId="formGridAddress2">
                                <Form.Label>單元/樓號/室</Form.Label>
                                <Form.Control placeholder="Apartment, studio, or floor"/>
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>城市</Form.Label>
                                    <Form.Control/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>省份</Form.Label>
                                    <Form.Control as="select">
                                        <option>NL</option>
                                        <option>PE</option>
                                        <option>NS</option>
                                        <option>NB</option>
                                        <option>QC</option>
                                        <option>ON</option>
                                        <option>MB</option>
                                        <option>SK</option>
                                        <option>AB</option>
                                        <option>BC</option>
                                        <option>YT</option>
                                        <option>NT</option>
                                        <option>NU</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>地區郵政</Form.Label>
                                    <Form.Control/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Group id="formGridCheckbox">
                                <Form.Check type="checkbox" label="有參與過三天法會"
                                            onChange={this.handleAttendThreeDaysFaHui}/>
                            </Form.Group>
                            {this.state.attendedThreeDaysFaHui &&
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Control type="text" placeholder="請輸入參加三天法會的日期"/>
                            </Form.Group>
                            }

                            <Button variant="primary" type="submit">
                                完成
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }


}
import React from 'react';

export default class Application extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        name: '',
        gender:'',
        taoAge:'',
        place:'',
        taoPlace:'',
        yuanLi:'',
        threeDaysFaHui:'',
        threeDaysFaHuiDate:'',
        xingMingBan:'',
        zhiShanBan:'',
        jingJinBan:''
    }

    render() {
        return (
            <div className="col-md-6">
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail"> Email Address </label>
                        <input value={this.state.email} onChange={this.handleChange} type="email" name="email"
                               className="form-control" id="exampleInputEmail" aria-describedby="emailHelp"
                               placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">請輸入您的帳戶</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input value={this.state.password} onChange={this.handleChange} type="password"
                               name="password" className="form-control" id="exampleInputPassword1"
                               placeholder="Password"/>
                    </div>
                    <button type="submit" onClick={this.login} className="btn btn-primary"> Login</button>
                    <button onClick={this.signUp} style={{marginLeft: '25px'}} className="btn btn-success">Sign Up
                    </button>
                </form>
            </div>
        );
    }


}
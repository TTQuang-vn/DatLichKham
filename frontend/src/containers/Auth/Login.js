import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';

import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
        }
    }
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value,

        })
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value,

        })
    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })

        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errcode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errcode === 0) {
                this.props.userLoginSuccess(data.userInfo)
                // console.log('Login success')
            }
        } catch (error) {
            if (error.respose) {
                if (error.respose.data) {
                    this.setState({
                        errMessage: error.respose.data.message
                    })
                }
            }
        }
    }
    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleLogin();
        }
    }

    render() {


        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content'>
                        <div className='col-12 text-login'>Đăng nhập</div>
                        <div className='col-12 form-group login-input'>
                            <label>Email</label>
                            <input type='text' className='form-control' placeholder='Email của bạn' value={this.state.username} onChange={(event) => this.handleOnChangeUsername(event)}></input>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Mật khẩu</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword ? 'text' : 'password'} className='form-control' placeholder='Mật khẩu của bạn' onChange={(event) => { this.handleOnChangePassword(event) }} onKeyDown={(event) => this.handleKeyDown(event)}></input>
                                <span onClick={() => { this.handleShowHidePassword() }}><i className={this.state.isShowPassword ? "fas fa-eye" : "fas fa-eye-slash"} ></i></span>
                            </div>

                        </div>
                        <div className='col-12 mt-2'>
                            <span className='forgot-password'>Quên mật khẩu</span>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => { this.handleLogin() }}>Đăng nhập</button>
                        </div>

                        <div className='col-12 text-center mt-3'>
                            <span className='text-other-login'>Đăng nhập với</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className='fab fa-google google'></i>
                            <i className='fab fa-facebook-f facebook'></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
        // userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

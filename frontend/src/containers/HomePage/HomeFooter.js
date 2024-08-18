import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeFooter.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";



class HomeFooter extends Component {
    changeLanguage = (language) => {
    }
    render() {

        return (
            // <div className='home-footer'>
            //     <p>&copy; 2024 Trần Thanh Quang. Thông tin chi tiết: </p>
            //     <a target='blank' href='https://www.facebook.com/profile.php?id=100080783997880'>
            //         &#8594; Tại đây &#8592;
            //     </a>
            // </div>
            <React.Fragment>
                <div className='footer-container'>
                    <div className='footer-content'>
                        <div className='first-content'>
                            <div className='title-1'>

                                <b>Anh Đức</b>
                            </div>
                            <div className='title-2'>
                                <div className='home-title'>
                                    <div className='box-icon'>
                                        <i className="fas fa-home fa-lg"></i>
                                    </div>
                                    <div className='box-title'>
                                        <p>108 Cộng Hòa, Phường 4, Q.Tân Bình, TPHCM</p>
                                    </div>
                                </div>
                                <div className='phone-title'>
                                    <div className='box-icon'>
                                        <i className="fas fa-phone fa-lg"></i>
                                    </div>
                                    <div className='box-title'>
                                        <p>0707911780</p>
                                    </div>
                                </div>
                                <div className='email-title'>
                                    <div className='box-icon'>
                                        <i className="fas fa-envelope fa-lg"></i>
                                    </div>
                                    <div className='box-title'>
                                        <p>1924801030243@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='second-content'>
                            <div className='title1-second-content'>
                                <b>Chính Sách</b>
                            </div>
                            <div className='title2-second-content'>
                                <div className='box-title'>
                                    <p>Chính sách bảo hành</p>
                                </div>
                                <div className='box-title'>
                                    <p>Bảo hành - đổi trả</p>
                                </div>
                                <div className='box-title'>
                                    <p>Thỏa thuận người dùng</p>
                                </div>

                            </div>
                        </div>
                        <div className='third-content'>
                            <div className='title-third-content'>
                                <b>Chấp nhận thanh toán</b>
                            </div>
                            <div className='bg-pay'></div>
                        </div>
                        <div className='fourth-content'>
                            <div className='title-fourth-content'>
                                <b>fanpage</b>
                            </div>
                            <i className="fab fa-facebook-square"></i>
                            <i className="fab fa-youtube"></i>

                        </div>
                    </div>
                    <div className='footer-footer'>
                        <div className='title-footer1'>
                            <p>@2023. Phòng khám Anh Đức</p>

                        </div>
                        <div className='title-footer2'>
                            <p>Chịu trách nhiệm nội dung: Trần Thanh Quang</p>
                        </div>
                    </div>
                </div>



            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);

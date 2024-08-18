import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";



class About extends Component {
    changeLanguage = (language) => {
    }
    render() {
        
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                    <iframe width="100%" height="400px" src="https://www.youtube.com/embed/wHCbUx3InBw" title="Phó Giám đốc Sở Y tế TPHCM: Sẽ ban hành cẩm nang phòng, chống Covid-19 trong trường học | VTC Now" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                    <div className='content-right'>
                        <p>VTC Now | Tối 26/11, tại chương trình Dân hỏi - Thành phố trả lời, ông Nguyễn Hữu Hưng, Phó giám đốc Sở Y tế TPHCM, cho biết thành phố sẽ ban hành cẩm nang hướng dẫn cho giáo viên và học sinh khi dạy học trực tiếp. </p>
                    </div>
                </div>
            </div>
        
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
